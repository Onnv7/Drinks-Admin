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

const App: React.FC = () => {
  return (
    <div className="app">
      <SideBar />
      <div className="appContainer">
        <TopBar />
        <Routes>
          <Route path="/">
            <Route index element={<Dashboard />} />
            <Route path="product">
              <Route index element={<Product />} />
              <Route path="new" element={<AddProduct />} />
            </Route>
            <Route path="category" element={<Category />} />
            <Route path="employee" element={<Employee />} />
            <Route path="test" element={<Outlet />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
