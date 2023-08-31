import React, { Fragment, useState } from "react";
import Swal from "sweetalert2";
import { changeStatus } from "../../services/Orders.service";
import { createShipping } from "../../services/Shipping.service";
import formatDate from "../../helpers/formatDate";

export default function Showdata({ data, fetchData, statusData, setIsOpen, setOrderDetail, setPayment, setIsCreate, setOrderId }) {
  const buttonStatus = (id, status) => {
    let tag = "";
    console.log(status);
    switch (status) {
      case 1:
        tag = <i className="fas fa-check-circle text-green-500 text-xl mr-1 cursor-pointer" onClick={() => ChangeStatus(id, status + 1)}></i>;
        break;
      case 2:
        tag = (
          <i
            className="fas fa-truck text-blue-600 text-xl mr-1 cursor-pointer"
            onClick={() => {
              setOrderId(id);
              setIsCreate(true);
            }}
          ></i>
        );
        break;
      // default: tag = <i className="fas fa-check-circle text-green-500 text-xl mr-1 cursor-pointer" onClick={() => ChangeStatus(id,status+ 1)}></i>
    }
    return tag;
  };

  async function ChangeStatus(id, status) {
    const res = await changeStatus(id, status);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        Swal.fire("ปรับสถานะสำเร็จ!", "", "success");
        fetchData();
      }
    }
  }

  async function Create(data) {
    const res = await createShipping(data);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        Swal.fire("บันทึกข้อมูลสำเร็จ!", "", "success");
        fetchData();
      }
    }
  }

  return (
    <Fragment>
      <div className="w-full">
        <table className="w-full h-full bg-transparent">
          <thead className="border-b border-black text-left">
            <tr>
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">ผู้สั่งซื้อ</th>
              <th className="py-2 px-4">สินค้าจำนวน</th>
              <th className="py-2 px-4">วันที่สั่งซื้อ</th>
              <th className="py-2 px-4">ช่องทางการชำระเงิน</th>
              <th className="py-2 px-4">สถานะคำสั่งซื้อ</th>
              <th className="py-2 px-4 text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => (
                <tr className="border-b-2 border-black" key={index}>
                  <td className="py-3 px-4 border-b">{index + 1}</td>
                  <td className="py-3 px-4 border-b">{item.user.firstName}</td>
                  <td className="py-3 px-4 border-b">
                    <span>{item.orderDetail.length} รายการ</span>
                    {" "}<i
                      className="fas fa-info-circle text-sky-500 text-lg cursor-pointer"
                      onClick={() => {
                        setOrderDetail(item.orderDetail);
                        setIsOpen(true);
                      }}
                    ></i>
                  </td>
                  <td className="py-3 px-4 border-b">{formatDate(item.orderDate)}</td>
                  <td className="py-3 px-4 border-b">
                    <span>{item.payment?.paymentMethod === 1 ? "ชำระเงินผ่านธนาคาร" : "ชำระเงินปลายทาง"}</span>{" "}
                    <i
                      className="fas fa-info-circle text-sky-500 text-lg cursor-pointer"
                      onClick={() => {
                        setPayment(item.payment);
                        setIsOpen(true);
                      }}
                    ></i>
                  </td>
                  <td className="py-3 px-4 border-b">{statusData.find((val) => val.id === item.orderStatus)?.title}</td>
                  <td className="py-3 px-4 border-b text-center">
                    {buttonStatus(item.id, item.orderStatus)}
                    {item.orderStatus === 1 && <i className="fas fa-ban text-red-500 text-xl cursor-pointer" onClick={() => ChangeStatus(id, 5)}></i>}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}
