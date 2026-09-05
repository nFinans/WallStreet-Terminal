from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import iyzipay

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# İyzico Konfigürasyonu (Environment'tan alır)
def get_iyzipay_options():
    options = iyzipay.Options()
    options.api_key = os.environ.get('IYZICO_API_KEY', 'sandbox-key')
    options.secret_key = os.environ.get('IYZICO_SECRET_KEY', 'sandbox-secret')
    options.base_url = os.environ.get('IYZICO_BASE_URL', 'https://sandbox-api.iyzipay.com')
    return options

# Modeller
class PaymentInitRequest(BaseModel):
    planId: str
    planName: str
    price: str
    name: str
    surname: str
    email: str
    gsmNumber: str
    identityNumber: str
    address: str
    district: str
    city: str
    username: str
    password: str

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

@api_router.get("/")
async def root():
    return {"message": "WallStreet Terminal API Online"}

@api_router.post("/payment/initialize")
async def initialize_payment(data: PaymentInitRequest):
    try:
        # MongoDB'ye sipariş / kullanıcı adayını kaydedelim
        order_doc = data.model_dump()
        order_doc["created_at"] = datetime.now(timezone.utc).isoformat()
        order_doc["status"] = "PENDING_PAYMENT"
        await db.orders.insert_one(order_doc)

        request = {
            'locale': iyzipay.Locale.TR.value,
            'conversation_id': str(uuid.uuid4()),
            'price': data.price,
            'paid_price': data.price,
            'currency': iyzipay.Currency.TL.value,
            'basket_id': f"WS-{uuid.uuid4().hex[:8]}",
            'payment_group': iyzipay.PaymentGroup.SUBSCRIPTION.value,
            'callback_url': os.environ.get('IYZICO_CALLBACK_URL', 'https://wallstreet.privyalgo.com/api/payment/callback'),
            'buyer': {
                'id': f"BY_{uuid.uuid4().hex[:6]}",
                'name': data.name,
                'surname': data.surname,
                'gsm_number': data.gsmNumber,
                'email': data.email,
                'identity_number': data.identityNumber,
                'last_login_date': datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S'),
                'registration_date': datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S'),
                'registration_address': data.address,
                'ip': '85.100.0.1',
                'city': data.city,
                'country': 'Turkey',
                'zip_code': '34000'
            },
            'shipping_address': {
                'contact_name': f"{data.name} {data.surname}",
                'city': data.city,
                'country': 'Turkey',
                'address': data.address,
                'zip_code': '34000'
            },
            'billing_address': {
                'contact_name': f"{data.name} {data.surname}",
                'city': data.city,
                'country': 'Turkey',
                'address': data.address,
                'zip_code': '34000'
            },
            'basket_items': [
                {
                    'id': data.planId,
                    'name': data.planName,
                    'category1': 'Software Subscription',
                    'item_type': iyzipay.BasketItemType.VIRTUAL.value,
                    'price': data.price
                }
            ]
        }

        payment_initialize = iyzipay.PaymentInitialize().create(request, get_iyzipay_options())
        result = payment_initialize.read().decode('utf-8')
        import json
        res_json = json.loads(result)

        if res_json.get("status") == "success":
            return {
                "status": "success",
                "paymentPageUrl": res_json.get("paymentPageUrl")
            }
        else:
            raise HTTPException(status_code=400, detail=res_json.get("errorMessage", "İyzico ödeme başlatılamadı."))

    except Exception as e:
        logger.error(f"Payment Init Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
