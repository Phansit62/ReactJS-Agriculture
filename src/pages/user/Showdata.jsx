import React, { useState } from "react";
import Swal from "sweetalert2";
import prefixJson from "../../helpers/json/prefixJson.json";

export default function Showdata({ data, fetchData }) {
  return (
    <div className="w-full">
      <table className="w-full h-full bg-transparent">
        <thead className="border-b border-black text-left">
          <tr>
            <th className="py-2 px-4">#</th>
            <th className="py-2 px-4">ชื่อ-นามสกุล</th>
            <th className="py-2 px-4">อีเมล</th>
            <th className="py-2 px-4">เบอร์โทรศัพท์</th>
            <th className="py-2 px-4">คะแนนสะสม</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => (
              <tr className="border-b-2 border-black" key={index}>
                <td className="py-3 px-4 border-b">{index + 1}</td>
                <td className="py-3 px-4 border-b">{prefixJson.find((val) => val.id === item.prefix).title + item.firstName + " " + item.lastName}</td>
                <td className="py-3 px-4 border-b">{item.email}</td>
                <td className="py-3 px-4 border-b">{item.phone}</td>
                <td className="py-3 px-4 border-b">{item.points}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
