import "@/index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "@/pages/Landing";
import Purchase from "@/pages/Purchase";

function App() {
  return (
    <div className="App bg-black text-white min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/satinal" element={<Purchase />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
