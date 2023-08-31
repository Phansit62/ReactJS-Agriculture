import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCoupon } from "../../services/Coupons.service";
import Swal from "sweetalert2";
import formatDate from "../../helpers/formatDate";

export default function Showdata({ data, fetchData }) {
  const navigate = useNavigate();

  async function Delete(id){
    Swal.fire({
      title: 'คุณต้องการจะลบข้อมูลนี้ใช่หรือไม่?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ตกลง',
      cancelButtonText:"ยกเลิก"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteCoupon(id);
        if(res){
          if(res.statusCode === 200 && res.taskStatus){
            Swal.fire(
              'ลบข้อมูลสำเร็จ!',
              '',
              'success'
            );
            fetchData();
          }
        }
      }
    })
  
  }
  return (
    <div className="w-full">
      <table className="w-full h-full bg-transparent">
        <thead className="border-b border-black text-left">
          <tr>
            <th className="py-2 px-4">#</th>
            <th className="py-2 px-4">คูปอง</th>
            <th className="py-2 px-4">จำนวนคะแนน</th>
            <th className="py-2 px-4">จำนวนจำกัด</th>
            <th className="py-2 px-4">ส่วนลดจำนวน</th>
            <th className="py-2 px-4">วันหมดอายุคูปอง</th>
            <th className="py-2 px-4">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => (
              <tr className="border-b-2 border-black" key={index}>
                <td className="py-3 px-4 border-b">{index + 1}</td>
                <td className="py-3 px-4 border-b">{item.name}</td>
                <td className="py-3 px-4 border-b">{item.points}</td>
                <td className="py-3 px-4 border-b">{item.limit}</td>
                <td className="py-3 px-4 border-b">{item.discount}</td>
                <td className="py-3 px-4 border-b">{formatDate(item.expiredAt)}</td>
                <td className="py-3 px-4 border-b text-center">
                  <i className="fas fa-edit text-orange-400 mr-2 cursor-pointer text-lg" onClick={() => navigate("/coupons/form", { state: item.id })}></i>
                  <i className="fas fa-trash-alt text-red-500 cursor-pointer text-lg" onClick={() => Delete(item.id)}></i>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
