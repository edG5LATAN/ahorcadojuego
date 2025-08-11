import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./componets/home/Home";
import Header from "./componets/header/Header";
import Footer from "./componets/footer/Footer";
import Contacto from "./componets/contacto/Contacto";
import Mas from "./componets/mas/Mas";

function App() {
  const [palabra, setPalabra] = useState("");

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/mas" element={<Mas />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
