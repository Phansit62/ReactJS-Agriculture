import React,{useState} from "react";
import categoryData from "../../helpers/json/categoryJson.json";
import unitData from "../../helpers/json/unitJson.json";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../../services/Products.service";
import Swal from "sweetalert2";

export default function Showdata({ data ,fetchData}) {
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
        const res = await deleteProduct(id);
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
            <th className="py-2 px-4">รูปภาพ</th>
            <th className="py-2 px-4">ชื่อสินค้า</th>
            <th className="py-2 px-4">ประเภท</th>
            <th className="py-2 px-4">จำนวนสินค้าในคลัง</th>
            <th className="py-2 px-4">หน่วย / ราคา</th>
            {/* <th className="py-2 px-4">จำนวนสินค้าในคลัง</th> */}
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
                <td className="py-3 px-4 border-b">{item.name}</td>
                <td className="py-3 px-4 border-b">{item.category && categoryData.find((val) => val.id === item.category)?.title}</td>
                <td className="py-3 px-4 border-b">{item.stock}</td>
                <td className="py-3 px-4 border-b">
                  {item.unit && unitData.find((val) => val.id === item.unit)?.title} / {item.price}
                </td>
                {/* <td className="py-3 px-4 border-b">{item.stock ?? 0}</td> */}
                <td className="py-3 px-4 border-b text-center">
                  <i className="fas fa-edit text-orange-400 mr-2 cursor-pointer text-lg" onClick={() => navigate("/products/create", { state: item.id })}></i>
                  <i className="fas fa-trash-alt text-red-500 cursor-pointer text-lg" onClick={() => Delete(item.id)}></i>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
