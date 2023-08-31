import React from "react";
import formatDate from "../../helpers/formatDate";
export default function PDFOrders({data}) {
  console.log(data);
  return (
    <div className="w-full">
      <div className="flex justify-center">
        <p className="text-xl">รายงานยอดสั่งซื้อสินค้า</p>
      </div>
      <table  className="w-full mt-5">
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>วันที่สั่งซื้อ</th>
            <th>ผู้สั่งซื้อ</th>
            <th>สินค้า(รายการ)</th>
            <th>ช่องทางการชำระเงิน</th>
            <th>ราคารวม(บาท)</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((item,index) => (
            <tr  className="border-b-2 border-black" key={index}>
                <td className="py-3 px-4 border-b text-center">{index + 1}</td>
                <td className="py-3 px-4 border-b text-center">{formatDate(item.orderDate)}</td>
                <td className="py-3 px-4 border-b text-center">{item.user}</td>
                <td className="py-3 px-4 border-b text-center">{item.orderDetail}</td>
                <td className="py-3 px-4 border-b text-center">{item.payment?.paymentMethod === 1 ? "ชำระเงินผ่านธนาคาร" : "ชำระเงินปลายทาง"}</td>
                <td className="py-3 px-4 border-b text-center">{item.payment?.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
