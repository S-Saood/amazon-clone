import React, {useState} from "react";
import Footer from "./components/Footer/Footer.jsx";
import Header from "./components/Header/Header.jsx";
import Product from "./components/Products/Product.jsx";
import Detail from "./components/DetailPage/Detail.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Login from "./components/Login/Login.jsx";
import Buynow from "./components/Buynow/Buynow.jsx";
import { Routes, Route } from "react-router-dom";
import Registered from './components/Registered/Registered.jsx'
import Hero from './components/Hero/Hero.jsx'
import Admin from './components/Admin/Admin.jsx'
import Payment from './components/Payment/Payment.jsx'
import PaymentSuccess from './components/PaymentSuccess/PaymentSuccess.jsx'



function App() {
  const [query, setQuery] = useState("");//lefting up the state for taking input fro search functionality 
  const [cartCount, setCartCount] = useState(0)//lefting up the state for count


  return (
    <div>
      <Header cartCount={cartCount} setQuery={setQuery}/>
      <Routes>
        <Route path="/" element={<Product query={query} />}  />
        <Route path="/product/:id" element={<Detail setCartCount={setCartCount} />} />
        <Route path="/cart" element={<Cart cartCount={cartCount} setCartCount={setCartCount} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/buynow/:id" element={<Buynow />} />
        <Route path="/payment" element={<Payment/>} />
        <Route path="/regestered" element={<Registered />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/paymentSuccess" element={<PaymentSuccess />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
