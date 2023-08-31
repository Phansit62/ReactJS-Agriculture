import React, { Fragment, useEffect, useState, useRef } from "react";
import Showdata from "./Showdata";
import ReactPaginate from "react-paginate";
import { Field, Form, Formik } from "formik";
import { getOrders } from "../../services/Orders.service";
import TextSelect from "../../components/TextSelect";
import Modal from "../../components/Modal";
import unitData from "../../helpers/json/unitJson.json";
import { createShipping } from "../../services/Shipping.service";
import Swal from "sweetalert2";
import PDFOrders from "./PDFOrders";
import { useReactToPrint } from "react-to-print";
import { reportOrders } from "../../services/Reports.service";

export default function MainOrders() {
  const [data, setData] = useState([]);
  const [report, setReport] = useState(null);
  const [orderDetail, setOrderDetail] = useState(null);
  const [payment, setPayment] = useState(null);
  const [IsOpen, setIsOpen] = useState(false);
  const [IsCreate, setIsCreate] = useState(false);
  const [orderId, setOrderId] = useState(0);
  const componentRef = useRef(null);

  const [pagin, setPagin] = useState({
    currentpage: 1,
    pagesize: 10,
    totalrows: 0,
    totalpages: 1,
  });

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => setReport(null),
    pageStyle: () => {
      const style = document.createElement("style");
      style.innerHTML = `@page  {
        size:A4;
        margin:10mm;
        padding:10mm;
      }`;
      document.head.appendChild(style);
    },
  });

  const statusData = [
    { id: 1, title: "รอยืนยันการชำระเงิน" },
    { id: 2, title: "ยืนยันการชำระเงิน" },
    { id: 3, title: "กำลังจัดส่งสินค้า" },
    { id: 4, title: "สินค้าถูกจัดส่งเรียบร้อยแล้ว" },
    { id: 5, title: "ยกเลิกคำสั่งซื้อ" },
  ];

  const ShippingData = [
    { id: 1, title: "จัดส่งโดยเจ้าของ" },
    { id: 2, title: "จัดส่งโดยผู้ให้บริการขนส่ง" },
  ];

  async function fetchData(pagesize = 10, currentpage = 1, status = 0, startDate = "", endDate = "") {
    const res = await getOrders(pagesize, currentpage, status, startDate, endDate);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        setData(res.data);
        setPagin(res.pagin);
      }
    }
  }

  async function fetchDataReport(status, startDate, endDate) {
    const res = await reportOrders(status, startDate, endDate);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        setReport(res.data);
      }
    }
  }

  async function CreateShipping(data) {
    const res = await createShipping(data);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        Swal.fire("บันทึกข้อมูลสำเร็จ!", "", "success");
        setIsCreate(false);
        setOrderId(0);
        fetchData(10, 1, 0,"","");
      }
    }
  }

  useEffect(() => {
    fetchData(10, 1, 0, "", "");
  }, []);

  useEffect(() => {
    if (!IsOpen) {
      setOrderDetail(null);
      setPayment(null);
    }
  }, [IsOpen]);

  useEffect(() => {
    if (report) {
      handlePrint();
    }
  },[report])

  return (
    <div className="w-full">
      <Formik
        enableReinitialize={true}
        initialValues={{
          status: 0,
          startDate: "",
          endDate: "",
        }}
        onSubmit={(value) => {
          fetchData(10, 1, value.status, value.startDate, value.endDate);
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <div className="flex justify-end">
              <button
                type="button"
                className="p-2 bg-green-700 text-white rounded-lg my-2"
                onClick={() => {
                  fetchDataReport(values.status, values.startDate, values.endDate);
                
                }}
              >
                <i className="fas fa-file"></i> พิมพ์รายงาน
              </button>
            </div>
            <div className="grid grid-cols-6 items-center gap-x-2">
              <div className="col-span-2">
                <p>สถานะ</p>
                <TextSelect
                  name="status"
                  value={statusData.filter((item) => item.id === values.status)}
                  options={statusData}
                  getOptionLabel={(a) => a.title}
                  getOptionValue={(a) => a.id}
                  onChange={(e) => {
                    setFieldValue("status", e.id);
                  }}
                />
              </div>
              <div className="col-span-1">
                <p>วันที่เริ่มต้น</p>
                <input
                  type="date"
                  name="startDate"
                  value={values.startDate}
                  className="input-class"
                  onChange={(e) => {
                    setFieldValue("startDate", e.target.value);
                  }}
                />
              </div>
              <div className="col-span-1">
                <p>วันที่สิ้นสุด</p>
                <input
                  type="date"
                  name="endDate"
                  value={values.endDate}
                  onChange={(e) => {
                    setFieldValue("endDate", e.target.value);
                  }}
                  className="input-class"
                />
              </div>
              <div className="col-span-2 h-10">
                <div className="flex  space-x-1  w-full">
                  <button type="submit" className="btn-search">
                    <i className="fas fa-search"></i> ค้นหา
                  </button>
                  <button
                    type="reset"
                    className="bth-reset"
                    onClick={() => {
                      fetchData(10, 1, 0, "", "");
                    }}
                  >
                    <i className="fas fa-redo-alt"></i> ล้างค่า
                  </button>
                </div>
              </div>
            </div>
            <div className="shadow-md bg-slate-200 h-[600px] w-full rounded-lg mt-5">
              <Showdata
                fetchData={() => {
                  fetchData(10, 1, 0, "", "");
                }}
                data={data}
                statusData={statusData}
                IsOpen={IsOpen}
                setIsOpen={setIsOpen}
                setOrderDetail={setOrderDetail}
                setPayment={setPayment}
                IsCreate={IsCreate}
                setIsCreate={setIsCreate}
                setOrderId={setOrderId}
              />
            </div>
            <div className={`hidden`}>
              <div ref={componentRef}>{report && <PDFOrders data={report} />}</div>
            </div>
            <div className="flex justify-start">
              <ReactPaginate
                previousLabel={"ย้อนกลับ"}
                nextLabel={"ถัดไป"}
                breakLabel={"..."}
                pageCount={Math.ceil(pagin.totalpages)}
                marginPagesDisplayed={1}
                pageRangeDisplayed={5}
                onPageChange={(page) => {
                  fetchData(10, page.selected + 1, values.search);
                }}
                containerClassName={"pagination"}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                activeClassName="active"
                breakClassName="break"
                breakLinkClassName="break-link"
                disabledClassName="disabled"
              />
            </div>
          </Form>
        )}
      </Formik>

      <Modal IsOpen={IsOpen} setIsOpen={setIsOpen} title={orderDetail ? "รายการสินค้า" : "ข้อมูลการชำระเงิน"} wdith="w-96">
        {orderDetail && (
          <div className="w-full h-96">
            <table className="w-full bg-transparent">
              <thead className="border-b border-black text-left">
                <tr>
                  <th className="py-2 px-4">ลำดับ</th>
                  <th className="py-2 px-4">ชื่อสินค้า</th>
                  <th className="py-2 px-4">จำนวน</th>
                  <th className="py-2 px-4">ราคารวม</th>
                </tr>
              </thead>
              <tbody>
                {orderDetail &&
                  orderDetail.map((item, index) => (
                    <tr className="border-b-2 border-black" key={index}>
                      <td className="py-1 border-b text-center">{index + 1}</td>
                      <td className="py-1 border-b text-center">{item.name}</td>
                      <td className="py-1 border-b text-center">
                        {item.quantity} {unitData.find((val) => val.id === item.unit)?.title}
                      </td>
                      <td className="py-1 border-b text-center">{item.totalPrice.toFixed(2)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
        {payment && (
          <div className="w-full h-auto mt-2">
            {payment.paymentMethod === 1 && (
              <div className="flex justify-center my-2">
                <img src={payment.image} className="w-[270px]" />
              </div>
            )}
            <div>
              <span className="font-bold">เลขคำสั่งซื้อ: </span>
              <span>{payment.ordersId}</span>
            </div>
            <div>
              <span className="font-bold">ช่องทางการชำระเงิน: </span>
              <span>{payment.paymentMethod === 1 ? "ชำระเงินผ่านธนาคาร" : "ชำระเงินปลายทาง"}</span>
            </div>
            <div>
              <span className="font-bold">จำนวนเงิน: </span>
              <span>{payment.amount.toFixed(2)}</span>
            </div>
          </div>
        )}
      </Modal>
      <Modal IsOpen={IsCreate} setIsOpen={setIsCreate} title={"ข้อมูลการขนส่งสินค้า"} wdith="w-[500px]">
        <div className="w-full h-44 mt-2">
          <Formik
            enableReinitialize={true}
            initialValues={{
              id: 0,
              ordersId: orderId,
              shoppingType: 0,
              trackingNumber: "",
            }}
            onSubmit={(value) => {
              CreateShipping(value);
            }}
          >
            {({ setFieldValue, values }) => (
              <Form>
                <div className="gird grid-cols-4">
                  <div className="col-span-4 mb-2">
                    <p>ประเภทการขนส่ง</p>
                    <TextSelect
                      name="shoppingType"
                      value={ShippingData.filter((item) => item.id === values.shoppingType)}
                      options={ShippingData}
                      getOptionLabel={(a) => a.title}
                      getOptionValue={(a) => a.id}
                      onChange={(e) => {
                        setFieldValue("shoppingType", e.id);
                      }}
                    />
                  </div>
                  {values.shoppingType === 2 && (
                    <div className="col-span-4">
                      <p>เลขพัสดุ</p>
                      <input value={values.trackingNumber} className="input-class" onChange={(e) => setFieldValue("trackingNumber", e.target.value)} />
                    </div>
                  )}
                </div>
                <div className="flex justify-center mt-2">
                  <button className="btn-save" type="submit">
                    {" "}
                    <i className="fas fa-save"></i> บันทึก
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </div>
  );
}
