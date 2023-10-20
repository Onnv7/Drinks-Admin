import React from "react";
import TopBar from "./components/shared/topbar/TopBar";
import SideBar from "./components/shared/sidebar/SideBar";
import { Routes, Route, Outlet } from "react-router-dom";
import "./app.scss";
import Dashboard from "./pages/dashboard/Dashboard";
import Product from "./pages/product/Product";
import Category from "./pages/category/Category";
import Employee from "./pages/employee/Employee";
import AddProduct from "./pages/addProduct/AddProduct";
import RequireAuth from "./components/shared/requireAuth/RequireAuth";
import Login from "./pages/login/Login";
import RootLayout from "./layouts/RootLayout";

const App: React.FC = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/">
          <Route element={<RequireAuth />}>
            <Route element={<RootLayout />}>
              <Route index element={<Dashboard />} />

              <Route path="product">
                <Route index element={<Product />} />
                <Route path="new" element={<AddProduct />} />
              </Route>

              <Route path="category" element={<Category />} />

              <Route path="employee" element={<Employee />} />
            </Route>
          </Route>
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="test" element={<Outlet />} />
      </Routes>
    </div>
  );
};

export default App;
