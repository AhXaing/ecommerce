import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./component/frontend/Layout";
import LayoutDashboard from "./component/backend/LayoutDashboard";
import Home from "./frontend/Home/Home";
import About from "./frontend/About/About";
import Product from "./frontend/Product/Product";
import Customer from "./frontend/Customer/Customer";
import Category from "./frontend/Category/Category";
import Login from "./frontend/User/User";
// import backend
import HomeBackend from "./backend/Home/Home";
import AboutBackend from "./backend/About/About";
import ProductBackend from "./backend/Product/Product";
import CategoryBackend from "./backend/Category/Category";
import CustomerBackend from "./backend/Customer/Customer";
import LoginBackend from "./backend/User/User";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* frontend */}
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Product />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/category" element={<Category />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* backend */}
        <Route path="/dashboard" element={<LayoutDashboard />}>
          <Route path="" element={<HomeBackend />} />
          <Route path="about" element={<AboutBackend />} />
          <Route path="product" element={<ProductBackend />} />
          <Route path="customer" element={<CustomerBackend />} />
          <Route path="category" element={<CategoryBackend />} />
          <Route path="login" element={<LoginBackend />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
