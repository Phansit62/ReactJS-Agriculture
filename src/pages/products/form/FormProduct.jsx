import React, { Fragment, useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { createProducts, getProductsDetail, updateProducts } from "../../../services/Products.service";
import ImagePreview from "../../../components/ImagePreview";
import categoryData from "../../../helpers/json/categoryJson.json";
import unitData from "../../../helpers/json/unitJson.json";
import Swal from "sweetalert2";

function FormProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState();
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      padding: "2px",
      border: "2px solid black",
      opacity: 0.6,
      borderRadius: "6px",
    }),
  };

  async function SaveOrUpdate(data) {
    let res = data.id === 0 ? await createProducts(data) : await updateProducts(data) ;
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        Swal.fire(
          'บันทึกข้อมูลสำเร็จ!',
          '',
          'success'
        );
        navigate(-1);
      }
    }
  }

  async function fetchDetail(id) {
    let res = await getProductsDetail(id);
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
            name: data ? data.name : "",
            description: data ? data.description : "",
            price: data ? data.price : 0,
            category: data ? data.category : 0,
            unit: data ? data.unit : 0,
            stock:data ? data.stock : 0,
            upload: [],
            remove: [],
          }}
          onSubmit={(value) => {
            SaveOrUpdate(value);
          }}
        >
          {({ setFieldValue, errors, touched, values }) => (
            <Form>
              <div className="w-[500px]">
                <div className="grid grid-cols-4 gap-2">
                  <div className="col-span-3">
                    <p>ชื่อสินค้า</p>
                    <input name="name" value={values.name} className="border-black border-2 py-2 px-2 w-full rounded-md opacity-60" onChange={(e) => setFieldValue("name", e.target.value)} />
                  </div>
                  <div className="col-span-1">
                    <p>ราคา</p>
                    <input type="number" name="price" value={values.price} className="border-black border-2 py-2 px-2 w-full rounded-md opacity-60" onChange={(e) => setFieldValue("price", e.target.value)} />
                  </div>

                  <div className="col-span-2">
                    <p>ประเภท</p>
                    {/* <input name="category" className="border-black border-2 py-2 px-2 w-full rounded-md opacity-60" /> */}
                    <Select
                      name="category"
                      value={categoryData.filter((item) => item.id === values.category)}
                      options={categoryData}
                      styles={customStyles}
                      getOptionLabel={(a) => a.title}
                      getOptionValue={(a) => a.id}
                      onChange={(e) => {
                        setFieldValue("category", e.id);
                        setFieldValue("unit", e.unit);
                      }}
                    />
                  </div>
                  <div className="col-span-1">
                    <p>จำนวนสินค้า</p>
                    <input type="number" name="stock" value={values.stock} className="border-black border-2 py-2 px-2 w-full rounded-md opacity-60" onChange={(e) => setFieldValue("stock", e.target.value)} />
                  </div>
                  <div className="col-span-1">
                    <p>หน่วย</p>
                    <input name="unit" value={unitData.find((item) => item.id === values.unit)?.title} className="border-black border-2 py-2 px-2 w-full rounded-md opacity-60 bg-gray-300" readOnly />
                  </div>
                  <div className="col-span-4">
                    <p>รายละเอียด</p>
                    <textarea name="description" value={values.description} className="border-black border-2 py-2 px-2 w-full rounded-md opacity-60" onChange={(e) => setFieldValue("description", e.target.value)} />
                  </div>
                  <div className="col-span-2">
                    <p>อัพโหลดรูปภาพ</p>
                    {/* <input type="file" name="file" multiple /> */}
                    <ImagePreview
                      image={values.upload}
                      onChange={(e) => setFieldValue("upload", e)}
                      values={data && data.image}
                      onDelete={(e) => {
                        let arr = [...values.remove];
                        arr.push(e);
                        setFieldValue("remove", arr);
                      }}
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
  );
}

export default FormProduct;
