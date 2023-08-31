import { Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/dashboard";
import MainProducts from "../pages/products/MainProducts";
import FormProduct from "../pages/products/form/FormProduct";
import MainUser from "../pages/user/MainUser";
import MainOrders from "../pages/orders/MainOrders";
import MainPayment from "../pages/payments/MainPayment";
import MainCoupons from "../pages/coupons/MainCoupons";
import FormCoupon from "../pages/coupons/form/FormCoupon";
import MainNews from "../pages/news/MainNews";
import FormNews from "../pages/news/form/FormNews";

export const routes = [
  {
    layout: <MainLayout />,
    children: [
      {
        path: "/",
        name: "",
        element: <Navigate to={"/dashboard"} />,
      },
      {
        path: "*",
        name: "",
        element: <Navigate to={"/dashboard"} />,
      },
      {
        path: "/dashboard",
        name: "แดชบอร์ด",
        element: <Dashboard />,
      },
      {
        path: "/products",
        name: "ข้อมูลสินค้าเกษตร",
        element: <MainProducts />,
      },
      {
        path: "/products/create",
        name: "เพิ่มสินค้าเกษตร",
        element: <FormProduct />,
      },
      {
        path: "/users",
        name: "ข้อมูลผู้ใช้บริการ",
        element: <MainUser />,
      },
      {
        path: "/orders",
        name: "ข้อมูลคำสั่งซื้อ",
        element: <MainOrders />,
      },
      {
        path: "/payment",
        name: "ข้อมูลการชำระเงิน",
        element: <MainPayment />,
      },
      {
        path: "/coupons",
        name: "ข้อมูลคูปองส่วนลด",
        element: <MainCoupons />,
      },
      {
        path: "/coupons/form",
        name: "ฟอร์มคูปองส่วนลด",
        element: <FormCoupon />,
      },
      {
        path: "/news",
        name: "ข่าวประชาสัมพันธ์",
        element: <MainNews />,
      },
      {
        path: "/news/form",
        name: "ฟอร์มข่าวประชาสัมพันธ์",
        element: <FormNews />,
      },
    ],
  },
];
