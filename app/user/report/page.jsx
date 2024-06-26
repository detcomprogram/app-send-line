"use client";
import {
  Button,
  Card,
  CardFooter,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";

import moment from "moment/min/moment-with-locales";

// import { parse, addYears } from "date-fns";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Report = () => {
  const [listData, setListData] = useState([]);
  const [sumData, setSumData] = useState('');

  //----- จัดการแสดงข้อมูล / หน้า -------------- //
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 14;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = Array.isArray(listData)
    ? listData.slice(startIndex, endIndex)
    : [];

  const totalPages = Math.ceil(listData?.length / itemsPerPage);

  const [sendData, setSendData] = useState({
    data_1: "" ,
    data_2: "" ,
    data_3: "" ,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSendData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const data = {
        date_start: sendData.data_1 || '',
        date_end: sendData.data_2 || '',
        do_number: sendData.data_3 || '',
      };
      console.log(process.env.NEXT_PUBLIC_API)
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/report`,
        data
      );
      console.log(res.data);
      setListData(res.data.data);
      setSumData(res.data.sum)
      // toast.success("ส่งข้อมูลสำเร็จ");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const downloadExcelFile = async () => {
    try {
      const data = {
        date_start: sendData.data_1 || "",
        date_end: sendData.data_2 || "",
        do_number: sendData.data_3 || '',
      };
3
      console.log(data);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/report/excel`,
        data,
        { responseType: "blob" }
      );

      // สร้าง URL สําหรับ Blob object ของไฟล์ Excel
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // สร้าง element <a> เพื่อดาวน์โหลดไฟล์ Excel
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "return_product.xlsx");
      document.body.appendChild(link);

      // คลิกลิงก์เพื่อดาวน์โหลดไฟล์ Excel
      link.click();

      // ลบ URL ที่สร้างขึ้น
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("เกิดข้อผิดพลาดในการดาวน์โหลดไฟล์ Excel");
    }
  };

  useEffect(() => {
    handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendData]);

  console.log(listData);

  return (
    <Card className="  bg-gray-200 p-4 h-screen">
      <ToastContainer autoClose={3000} theme="colored" />
      <div className="">
        <h1 className="text-center text-3xl ">รายงานการคืนผลิตภัณฑ์ </h1>
      </div>
      <Card className=" mt-5 p-4">
        <div className=" flex flex-col lg:flex-row  items-center gap-5 ">
          <div className="w-full flex flex-col lg:w-[300px]">
            <small>วันที่ส่งข้อมูล</small>
            <input
              type="date"
              placeholder="date"
              name="data_1"
              value={sendData.data_1 || ""}
              onChange={(e) => handleChange(e)}
              className="bg-gray-200 border border-gray-300 p-1 rounded-lg mt-2"
            />
          </div>
          <div className="w-full flex flex-col lg:w-[300px]">
            <small>วันที่สิ้นสุด</small>
            <input
              type="date"
              placeholder="date"
              name="data_2"
              value={sendData.data_2 || ""}
              onChange={(e) => handleChange(e)}
              className="bg-gray-200 border border-gray-300 p-1 rounded-lg mt-2"
            />
          </div>
          <div className="w-full flex flex-col lg:w-[200px] ">
            <small>DO Number / CRM Number</small>
            <input
              type="text"
              placeholder="DO Number / CRM Number"
              name="data_3"
              value={sendData.data_3 || ""}
              onChange={(e) => handleChange(e)}
              className="bg-gray-200 border border-gray-300 p-1 rounded-lg mt-2"
            />
          </div>
          <div className="w-full  lg:w-[100px] flex flex-col">
            <small>จำนวน</small>
            <Typography className="bg-gray-200 border border-gray-300 p-1 rounded-lg mt-2">
              {Number(sumData).toLocaleString()}
            </Typography>
          </div>
          <div className="flex justify-center items-center  lg:justify-start  flex-row mb-5 lg:pt-12 gap-3 ">
            <div >
              <button
                onClick={() => setSendData({})}
                className="bg-gray-800 text-white px-5 py-1 rounded-full w-[100px]"
              >
                ล้าง
              </button>
            </div>
            <div>
              <button
                onClick={downloadExcelFile}
                className="bg-purple-800 text-white px-5 py-1 rounded-full w-[100px]"
              >
                EXCEL
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="mt-2 h-[350px] w-full overflow-auto lg:mt-0 ">
            <table className="w-full min-w-max ">
              <thead>
                <tr>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold leading-none opacity-70"
                    >
                      DO Number
                    </Typography>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold leading-none opacity-70"
                    >
                      วันที่แจ้ง
                    </Typography>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold leading-none opacity-70"
                    >
                      รายการสินค้า
                    </Typography>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold leading-none opacity-70"
                    >
                      จำนวนสินค้าที่คืน
                    </Typography>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 ">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold leading-none opacity-70"
                    >
                      หน่วยนับ
                    </Typography>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold leading-none opacity-70"
                    >
                      ปัญหาที่คืน
                    </Typography>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold leading-none opacity-70"
                    >
                      หมายเหตุ
                    </Typography>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold leading-none opacity-70"
                    >
                      ชื่อผู้แจ้ง
                    </Typography>
                  </th>
                  <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold leading-none opacity-70"
                    >
                      สถานะ
                    </Typography>
                  </th>
                </tr>
              </thead>
              {listData?.length == 0 ? (
                <tbody>
                  <tr>
                    <td colSpan={8}>
                      <Typography className="mt-5 text-center">
                        ...ไม่พบข้อมูล...
                      </Typography>
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {displayedData?.map((data, index) => {
                    const isLast = index === displayedData?.length;
                    const classes = isLast
                      ? "  "
                      : ` border-b border-blue-gray-50 py-1 `;
                    return (
                      <tr key={index}>
                        <td className={classes}>
                          <div className="flex items-center justify-center">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {data.do_number || ""}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex items-center justify-center">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {/* {data.date || ""} */}
                              {moment(data?.date).add(543, "years").format("DD-MM-YYYY")}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex items-center justify-center">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className=" "
                            >
                              {data?.code}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex items-center justify-center">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal "
                            >
                              {data?.qty || ""}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex items-center justify-center">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal "
                            >
                              {data?.count || ""}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex items-center justify-center">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal "
                            >
                              {data?.note || ""}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex items-center justify-center">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal "
                            >
                              {data?.remake || ""}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex items-center justify-center">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal "
                            >
                              {data?.sign || ""}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex items-center justify-center">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className={` font-normal ${data?.status == 1 ?  ' bg-green-400 text-green-500 ps-2 px-2 bg-opacity-30 rounded-md ': ' bg-red-400 bg-opacity-30 rounded-md ps-2 px-2 text-red-500'}` }
                            >
                              {data?.status == 1 ? moment(data?.date_status).add(543, "years").format('DD-MM-YYYY') : `${data?.count_day} วัน` || ""}
                            </Typography>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              )}
            </table>
          </div>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Button
              variant="outlined"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              ก่อนหน้า
            </Button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <IconButton
                  key={i}
                  variant="outlined"
                  size="sm"
                  onClick={() => setCurrentPage(i + 1)}
                  className={
                    currentPage === i + 1 ? "bg-purple-400 text-white" : ""
                  }
                >
                  {i + 1}
                </IconButton>
              ))}
            </div>
            <Button
              variant="outlined"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              ถัดไป
            </Button>
          </CardFooter>
        </div>
      </Card>
    </Card>
  );
};

export default Report;
