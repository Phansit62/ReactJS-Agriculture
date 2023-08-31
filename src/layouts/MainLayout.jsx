import Sidebar from "./Sidebar";
import Header from "./Header";
import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [active,setActive] = useState(0);
  const path = [
    { id: 1, name: "แดชบอร์ด", icon: "", path: "/dashboard" },
    { id: 2, name: "ข้อมูลสินค้าเกษตร", icon: "", path: "/products" },
    { id: 3, name: "ข้อมูลผู้ใช้บริการ", icon: "", path: "/users" },
    { id: 4, name: "ข้อมูลคำสั่งซื้อ", icon: "", path: "/orders" },
    { id: 5, name: "ข้อมูลข่าวประชาสัมพันธ์", icon: "", path: "/news" },
    { id: 6, name: "ข้อมูลคูปองส่วนลด", icon: "", path: "/coupons" },
  ];
  return (
    <div className="w-full overflow-hidden">
      <Header />
      <div className="flex flex-row">
        <Sidebar>
          {path.map((item, index) => (
            <div className={`h-12 ${active === item.id ? "bg-green-600" : "bg-gray-700"} transition-all duration-200  flex items-center justify-center cursor-pointer m-1`} key={index} onClick={() => {
              navigate(item.path)
              setActive(item.id);
            }}>
              <span className="text-white text-lg">{item.name}</span>
            </div>
          ))}
        </Sidebar>
        <div className="w-full p-5">
          { path.find((item) => location.pathname === item.path) && <h2 className="text-2xl my-3 font-medium">{path.find((item) => location.pathname === item.path).name}</h2>}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
