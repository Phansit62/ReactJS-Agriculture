import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCoupon } from "../../services/Coupons.service";
import Swal from "sweetalert2";
import {Delete} from "../../services/News.service";

export default function Showdata({ data, fetchData }) {
  const navigate = useNavigate();

  async function onDelete(id){
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
        const res = await Delete(id);
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
            <th className="py-2 px-4">แบนด์เนอร์</th>
            <th className="py-2 px-4">หัวเรื่อง</th>
            <th className="py-2 px-4">รายละเอียด</th>
            <th className="py-2 px-4 text-center">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => (
              <tr className="border-b-2 border-black" key={index}>
                <td className="py-3 px-4 border-b">{index + 1}</td>
                <td className="py-3 px-4 border-b">
                  <img src={item.image} width={80} height={60} className="rounded-full" />
                </td>
                <td className="py-3 px-4 border-b">{item.title}</td>
                <td className="py-3 px-4 border-b">{item.description}</td>
                <td className="py-3 px-4 border-b text-center">
                  <i className="fas fa-edit text-orange-400 mr-2 cursor-pointer text-lg" onClick={() => navigate("/news/form", { state: item.id })}></i>
                  <i className="fas fa-trash-alt text-red-500 cursor-pointer text-lg" onClick={() => onDelete(item.id)}></i>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
