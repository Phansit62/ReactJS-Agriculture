import React, { Fragment, useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { updateCoupon , createCoupon , getCouponDetail} from "../../../services/Coupons.service";
import Swal from "sweetalert2";

function FormCoupon() {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState();

  async function SaveOrUpdate(data) {
    let res = data.id === 0 ? await createCoupon(data) : await updateCoupon(data) ;
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        Swal.fire(
          'บันทึกข้อมูลสำเร็จ!',
          '',
          'success'
        );
        navigate(-1)
      }
    }
  }

  async function fetchDetail(id) {
    let res = await getCouponDetail(id);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        setData(res.data);
      }
    }
  }

  useEffect(() => {
    if (location.state) {
      fetchDetail(location.state);
    }
  }, [location.state]);

  console.log(data);

  return (
    <Fragment>
      <h2 className="text-2xl my-3 font-medium">{location.state ? "แก้ไขข้อมูล" : "เพิ่มข้อมูล"}</h2>
      <div className="flex justify-end">
        <button className="px-4 py-1.5 bg-green-500 text-white rounded-lg my-2" onClick={() => navigate(-1)}>
          <i className="fas fa-chevron-circle-left"></i> กลับ
        </button>
      </div>

      <div className="w-full flex  justify-center">
        <Formik
          enableReinitialize={true}
          initialValues={{
            id: data ? data.id : 0,
            name: data ? data.name : "",
            discount: data ? data.discount : 0,
            points: data ? data.points : 0,
            expiredAt: data ? data.expiredAt : new Date(),
            limit: data ? data.limit : 0,
          }}
          onSubmit={(value) => {
            SaveOrUpdate(value);
            // console.log(value);
          }}
        >
          {({ setFieldValue, errors, touched, values }) => (
            <Form>
              <div className="w-[600px]">
                <div className="grid grid-cols-4 gap-2">
                  <div className="col-span-4">
                    <p>ชื่อคูปอง</p>
                    <input name="name" value={values.name} className="input-class" onChange={(e) => setFieldValue("name", e.target.value)} />
                  </div>
                  <div className="col-span-2">
                    <p>ส่วนลด(บาท)</p>
                    <input type="number" name="discount" value={values.discount} className="input-class" onChange={(e) => setFieldValue("discount", e.target.value)} />
                  </div>
                  <div className="col-span-2">
                    <p>จำนวนคะแนน</p>
                    <input name="points" className="input-class" value={values.points} onChange={(e) => setFieldValue("points",e.target.value)} />
                  </div>
                  <div className="col-span-2">
                    <p>จำกัดจำนวน(ผู้ใช้งาน)</p>
                    <input name="limit" className="input-class" value={values.limit} onChange={(e) => setFieldValue("limit",e.target.value)} />
                  </div>
                  <div className="col-span-2">
                    <p>วันหมดอายุ</p>
                    <input type="date" name="expiredAt" value={values.expiredAt} className="border-black border-2 py-[4.5px] px-2 w-full rounded-md opacity-60"  onChange={(e) => setFieldValue("expiredAt" , e.target.value)}/>
                  </div>
                  
                </div>
              </div>
              <div className="flex flex-row justify-center mt-3">
                <button type="submit" className="text-white bg-blue-400 py-2 px-4 rounded-md">
                  <i className="fas fa-save"></i> บันทึก
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Fragment>
  );
}

export default FormCoupon;
