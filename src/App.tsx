import React, { useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import "./app.scss";
import Dashboard from "./pages/dashboard/Dashboard";
import Product from "./pages/product/Product";
import Category from "./pages/category/Category";
import Employee from "./pages/employee/Employee";
import CreateProduct from "./pages/product/createProduct/CreateProduct";
import RequireAuth from "./components/shared/requireAuth/RequireAuth";
import Login from "./pages/login/Login";
import RootLayout from "./layouts/RootLayout";
import ViewProduct from "./pages/product/viewProduct/ViewProduct";
import { useSelector } from "react-redux";
import { clearStatusProduct } from "./services/redux/slices/product.slice";
import {
  categorySelector,
  employeeSelector,
  productSelector,
  profileSelector,
  revenueSelector,
} from "./services/redux/selecters/selector";
import { toaster } from "./helper/toaster";
import { NotificationConstant } from "./interfaces/model/notification";
import { useAppDispatch } from "./services/redux/useTypedSelector";
import { clearStatusCategory } from "./services/redux/slices/category.slice";
import Loading from "./components/shared/loading/Loading";
import CreateEmployee from "./pages/employee/createEmployee/CreateEmployee";
import ViewEmployee from "./pages/employee/viewEmployee/ViewEmployee";
import { clearStatusEmployee } from "./services/redux/slices/employee.slice";
import ChangePasswordEmployeeModal from "./components/employee/viewEmployee/changePassword/ChangePasswordEmployeeModal";
import { clearStatusProfile } from "./services/redux/slices/profile.slice";
import Profile from "./pages/profile/Profile";
import { Action } from "@reduxjs/toolkit";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const productPayload = useSelector(productSelector);
  const categoryPayload = useSelector(categorySelector);
  const employeePayload = useSelector(employeeSelector);
  const revenuePayload = useSelector(revenueSelector);
  const profilePayload = useSelector(profileSelector);

  useEffect(() => {
    const handle = () => {
      if (productPayload.notification) {
        const { type, message } = productPayload.notification;
        console.log("=>>> product noti", productPayload);
        if (type === NotificationConstant.SUCCESS) {
          toaster.success({ text: message });
        } else if (type === NotificationConstant.ERROR) {
          toaster.error({ text: message });
        }
        dispatch(clearStatusProduct());
      }
      if (categoryPayload.notification) {
        console.log("=>>> categoryPayload noti", categoryPayload);
        const { type, message } = categoryPayload.notification;
        if (type === NotificationConstant.SUCCESS) {
          toaster.success({ text: message });
        } else if (type === NotificationConstant.ERROR) {
          toaster.error({ text: message });
        }
        dispatch(clearStatusCategory());
      }
      if (employeePayload.notification) {
        const { type, message } = employeePayload.notification;
        if (type === NotificationConstant.SUCCESS) {
          toaster.success({ text: message });
        } else if (type === NotificationConstant.ERROR) {
          toaster.error({ text: message });
        }
        dispatch(clearStatusEmployee());
      }
      if (revenuePayload.notification) {
        const { type, message } = revenuePayload.notification;
        if (type === NotificationConstant.SUCCESS) {
          toaster.success({ text: message });
        } else if (type === NotificationConstant.ERROR) {
          toaster.error({ text: message });
        }
        dispatch(clearStatusEmployee());
      }
      if (profilePayload.notification) {
        const { type, message } = profilePayload.notification;
        if (type === NotificationConstant.SUCCESS) {
          toaster.success({ text: message });
        } else if (type === NotificationConstant.ERROR) {
          toaster.error({ text: message });
        }
        dispatch(clearStatusProfile());
      }
    };
    handle();
  }, [
    categoryPayload,
    categoryPayload.notification,
    dispatch,
    employeePayload.notification,
    productPayload,
    productPayload.notification,
    profilePayload.notification,
    revenuePayload.notification,
  ]);

  return (
    <div className="app">
      {(productPayload.loading ||
        categoryPayload.loading ||
        employeePayload.loading ||
        revenuePayload.loading ||
        profilePayload.loading) && <Loading />}
      <Routes>
        <Route path="/">
          <Route element={<RequireAuth />}>
            <Route element={<RootLayout />}>
              <Route index element={<Dashboard />} />

              <Route path="product">
                <Route index element={<Product />} />
                <Route path="new" element={<CreateProduct />} />
                <Route path="view/:id" element={<ViewProduct />} />
              </Route>

              <Route path="category" element={<Category />} />

              <Route path="employee">
                <Route index element={<Employee />} />
                <Route path="new" element={<CreateEmployee />} />
                <Route path="view/:id" element={<ViewEmployee />} />
              </Route>
              <Route path="profile">
                <Route index element={<Profile />} />
              </Route>
            </Route>
          </Route>
        </Route>
        <Route path="login" element={<Login />} />
        <Route
          path="test"
          element={<ChangePasswordEmployeeModal onClose={() => {}} />}
        />
      </Routes>
    </div>
  );
};

export default App;
