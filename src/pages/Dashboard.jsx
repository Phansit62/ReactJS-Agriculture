import React, { useEffect, useState } from "react";
import { dashboardMobile } from "../services/Reports.service";
import TextSelect from "../components/TextSelect";
import Chart from "react-apexcharts";

export default function Dashboard() {
  const [data, setData] = useState();
  const [type, setType] = useState(1);
  const [year, setYear] = useState(2023);

  const yearData = [
    {
      id: 2023,
      title: "ปี 2566",
    },
    { id: 2022, title: "ปี 2565" },
    { id: 2021, title: "ปี 2564" },
    { id: 2020, title: "ปี 2563" },
  ];

  async function fetchData(type, year) {
    let res = await dashboardMobile(type, year);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        setData(res.data);
      }
    }
  }

  useEffect(() => {
    fetchData(type, year);
  }, [year, type]);

  const chartData = {
    options: {
      colors: ["#27A65D"],
      xaxis: {
        categories: data && data.charts.map((val) => val.label),
      },
    },
    series: [
      {
        name: "Sales",
        data: data && data.charts.map((val) => val.value),
      },
    ],
  };

  return (
    <div className="w-full">
      <div className="flex justify-end w-full mb-5">
        <TextSelect
          name="year"
          value={yearData.filter((item) => item.id === year)}
          options={yearData}
          getOptionLabel={(a) => a.title}
          getOptionValue={(a) => a.id}
          onChange={(e) => {
            setYear(e.id);
          }}
        />
      </div>
      <div className="flex flex-row justify-around">
        <div className={`${type === 1 && "scale-110"} transition-all duration-300 cursor-pointer w-72 h-40 bg-[#27A65D] flex flex-col justify-center items-center rounded-md`} onClick={() => setType(1)}>
          <i className="fas fa-users text-2xl text-white"></i>
          <p className="text-2xl text-white">ผู้ใช้งาน</p>
          <p className="text-2xl text-white">{data && data.users}</p>
        </div>
        <div className={`${type === 2 && "scale-110"} transition-all duration-300 cursor-pointer w-72 h-40 bg-[#27A65D] flex flex-col justify-center items-center rounded-md`} onClick={() => setType(2)}>
          <i className="fas fa-users text-2xl text-white"></i>
          <p className="text-2xl text-white">คำสั่งซื้อ</p>
          <p className="text-2xl text-white">{data && data.orders}</p>
        </div>
        <div className={`${type === 4 && "scale-110"} transition-all duration-300 cursor-pointer w-72 h-40 bg-[#27A65D] flex flex-col justify-center items-center rounded-md`} onClick={() => setType(4)}>
          <i className="fas fa-users text-2xl text-white"></i>
          <p className="text-2xl text-white">ยกเลิกคำสั่งซื้อ</p>
          <p className="text-2xl text-white">{data && data.ordersCancel}</p>
        </div>
        <div className={`${type === 3 && "scale-110"} transition-all duration-300 cursor-pointer w-72 h-40 bg-[#27A65D] flex flex-col justify-center items-center rounded-md`} onClick={() => setType(3)}>
          <i className="fas fa-users text-2xl text-white"></i>
          <p className="text-2xl text-white">รายได้ (บาท)</p>
          <p className="text-2xl text-white">{data && data.payments.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex justify-center mt-16 w-full">
        <Chart options={chartData.options} series={chartData.series} type="bar" width={1200} height={450} />
      </div>
    </div>
  );
}
