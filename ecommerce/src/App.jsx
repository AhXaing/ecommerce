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
import LayoutDashboardLogin from "./component/backend/LayoutDashboardLogin";
import LoginDashboard from "./backend/Login/LoginDashboard";
import Register from "./backend/Register/Register";
import Employee from "./backend/Employee/Employee";
import Order from "./backend/order/order";
import TopSale from "./backend/Report/TopSale";
import SoleByCustomer from "./backend/Report/SoldByCustomer";
import SoleByProduct from "./backend/Report/SoldByProduct";
import Role from "./backend/System/Role";
import UserRole from "./backend/System/UserRole";
import Permission from "./backend/System/Permission";
import Province from "./backend/System/Province";
import Menu from "./backend/System/Menu";
import OrderStatus from "./backend/System/OrderStatus";
import OrderPayment from "./backend/System/OrderPayment";

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
          <Route path="product/product-list" element={<ProductBackend />} />
          <Route path="product/category" element={<CategoryBackend />} />
          <Route path="employee" element={<Employee />} />
          <Route path="customer" element={<CustomerBackend />} />
          <Route path="order" element={<Order />} />
          {/* Report */}
          <Route path="report/top-sale" element={<TopSale />} />
          <Route path="report/sold-by-customer" element={<SoleByCustomer />} />
          <Route path="report/sold-by-product" element={<SoleByProduct />} />
          {/* System */}
          <Route path="system/role" element={<Role />} />
          <Route path="system/user-role" element={<UserRole />} />
          <Route path="system/order-payment" element={<OrderPayment />} />
          <Route path="system/order-status" element={<OrderStatus />} />
          <Route path="system/permission" element={<Permission />} />
          <Route path="system/province" element={<Province />} />
          <Route path="system/menu" element={<Menu />} />

          {/* about */}
          <Route path="about" element={<AboutBackend />} />
        </Route>

        <Route path="/dashboard" element={<LayoutDashboardLogin />}>
          <Route path="login" element={<LoginDashboard />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
