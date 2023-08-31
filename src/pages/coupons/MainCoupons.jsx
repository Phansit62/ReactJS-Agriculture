import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Showdata from "./Showdata";
import ReactPaginate from "react-paginate";
import { Form, Formik } from "formik";
import { getCouponList } from "../../services/Coupons.service";

export default function MainCoupons() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [pagin, setPagin] = useState({
    currentpage: 1,
    pagesize: 10,
    totalrows: 0,
    totalpages: 1,
  });

  async function fetchData(pagesize = 10, currentpage = 1, search) {
    const res = await getCouponList(pagesize, currentpage, search);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        setData(res.data);
        setPagin(res.pagin);
      }
    }
  }

  useEffect(() => {
    fetchData(10, 1, "");
  }, []);

  return (
    <div className="w-full">
      <Formik
        enableReinitialize={true}
        initialValues={{
          search: "",
        }}
        onSubmit={(value) => {
          fetchData(10, 1, value.search);
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <div className="flex justify-end">
              <button type="button" className="p-2 bg-green-700 text-white rounded-lg my-2" onClick={() => navigate("/coupons/form")}>
                <i className="fas fa-plus-circle"></i> เพิ่มข้อมูล
              </button>
            </div>
            <div className="grid grid-cols-6 items-center gap-x-2">
              <div className="col-span-2">
                <input value={values.search} type="text" className="input-class" placeholder="ค้นหา" onChange={(e) => setFieldValue("search", e.target.value)} />
              </div>
              <div className="col-span-2">
                <div className="flex flex-row space-x-1">
                  <button type="submit" className="btn-search">
                    <i className="fas fa-search"></i> ค้นหา
                  </button>
                  <button type="reset" className="bth-reset">
                    <i className="fas fa-redo-alt"></i> ล้างค่า
                  </button>
                </div>
              </div>
            </div>
            <div className="shadow-md bg-slate-200 h-[600px] w-full rounded-lg">
              <Showdata
                data={data}
                fetchData={() => {
                  fetchData(10, 1, "");
                }}
              />
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
                  fetchData(10, page.selected, values.search);
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
    </div>
  );
}
