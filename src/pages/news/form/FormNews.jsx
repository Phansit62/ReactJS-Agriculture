import React, { Fragment, useEffect, useState } from 'react'
import { Field, Form, Formik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import {createNews , updateNews ,getNewsDetail} from "../../../services/News.service";
import Swal from "sweetalert2";
import ImagePreview from '../../../components/ImagePreview';

export default function FormNews() {
    const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState();

  async function SaveOrUpdate(data) {
    let res = data.id === 0 ? await createNews(data) : await updateNews(data) ;
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
    let res = await getNewsDetail(id);
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
            title: data ? data.title : "",
            description: data ? data.description : "",
            upload:[]
          }}
          onSubmit={(value) => {
            SaveOrUpdate(value);
          }}
        >
          {({ setFieldValue, errors, touched, values }) => (
            <Form>
              <div className="w-[600px]">
                <div className="grid grid-cols-4 gap-2">
                  <div className="col-span-4">
                    <p>หัวเรื่อง</p>
                    <input name="title" value={values.title} className="input-class" onChange={(e) => setFieldValue("title", e.target.value)} />
                  </div>
                  <div className="col-span-4">
                    <p>รายละเอียด</p>
                    <textarea rows={5} name="description" value={values.description} className="input-textarea" onChange={(e) => setFieldValue("description", e.target.value)} />
                  </div>
                  <div className="col-span-2">
                    <p>อัพโหลดรูปภาพ</p>
                    <ImagePreview
                      image={values.upload}
                      onChange={(e) => setFieldValue("upload", e)}
                      values={data && data.image.split()}
                      mode={"single"}
                    />
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
  )
}

