"use client";
import { Card } from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [sendData, setSendData] = useState({
    data_1: "",
    data_2: "",
    data_3: 0,
    data_4: "",
    data_5: "",
    data_6: "",
    data_7: "",
    data_8: "",
    data_9: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSendData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        data_1: sendData.data_1,
        data_2: sendData.data_2,
        data_3: Number(sendData.data_3),
        count: sendData.count,
        data_4: sendData.data_4,
        data_5: sendData.data_5,
        data_6: sendData.data_6,
        data_7: sendData.data_7,
      };

      const res = await axios.post(
        "https://app-send-line-api.vercel.app/api/send",
        data
      );
      console.log(res.data);

      if (res.status === 200) {
        setSendData({});
        toast.success("ส่งข้อมูลสำเร็จ");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log(sendData)



  return (
    <Card className=" h-screen bg-gray-200 ">
      <ToastContainer autoClose={3000} theme="colored" />
      <div className="p-4">
        <h1 className="text-center text-3xl ">ข้อมูลการคืนผลิตภัณฑ์ </h1>
      </div>

      <form onSubmit={handleSubmit} >
        <div className=" bg-white mx-10 mt-5 px-5 py-10 rounded-lg shadow-lg mb-10 overflow-auto ">
          <div className="flex flex-col lg:flex-row gap-5 ">
            <div className="w-full flex flex-col">
              <small>DO Number / CRM Number</small>
              <input
                type="text"
                placeholder="DO Number / CRM Number"
                name="data_1"
                onChange={(e) => handleChange(e)}
                value={sendData.data_1 || ""}
                className="bg-gray-200 border border-gray-300 p-1 rounded-lg mt-2"
              />
            </div>

            <div className=" w-full flex flex-col">
              <small>รายการสินค้า</small>
              <input
                type="text"
                placeholder="รายการสินค้า"
                name="data_2"
                value={sendData.data_2 || ""}
                onChange={(e) => handleChange(e)}
                className="bg-gray-200 border border-gray-300 p-1 rounded-lg mt-2"
              />
            </div>

            <div className="w-full flex flex-col">
              <small>จำนวนสินค้าที่คืน</small>
              <input
                type="number"
                placeholder="จำนวนสินค้าที่คืน"
                name="data_3"
                value={sendData.data_3 || ""}
                onChange={(e) => handleChange(e)}
                className="bg-gray-200 border border-gray-300 p-1 rounded-lg mt-2"
              />
            </div>
            <div className="w-full flex flex-col">
              <small>หน่วยนับ</small>
              <input
                type="text"
                placeholder="หน่วยนับ"
                name="count"
                value={sendData.count || ""}
                onChange={(e) => handleChange(e)}
                className="bg-gray-200 border border-gray-300 p-1 rounded-lg mt-2"
              />
            </div>

          </div>
          <div className="flex flex-col lg:flex-row gap-5 mt-5 ">
            <div className="w-full flex flex-col ">
              <small>ปัญหาของการแจ้งคืน</small>
              <input
                type="text"
                placeholder="ปัญหาของการแจ้งคืน"
                name="data_4"
                value={sendData.data_4 || ""}
                onChange={(e) => handleChange(e)}
                className="bg-gray-200 border border-gray-300 p-1 rounded-lg mt-2"
              />
            </div>
            <div className="w-full  flex flex-col">
              <small>Remark</small>
              <input
                type="text"
                placeholder="Remark"
                name="data_5"
                value={sendData.data_5 || ""}
                onChange={(e) => handleChange(e)}
                className="bg-gray-200 border border-gray-300 p-1 rounded-lg mt-2"
              />
            </div>

            <div className="w-full flex flex-col">
              <small>ชื่อผู้แจ้ง</small>
              <input
                type="text"
                placeholder="ชื่อผู้แจ้ง"
                name="data_6"
                value={sendData.data_6 || ""}
                onChange={(e) => handleChange(e)}
                className="bg-gray-200 border border-gray-300 p-1 rounded-lg mt-2"
              />
            </div>

            <div className="w-full flex flex-col">
              <small>วันที่ส่งข้อมูล</small>
              <input
                type="date"
                placeholder="date"
                name="data_7"
                onChange={(e) => handleChange(e)}
                className="bg-gray-200 border border-gray-300 p-1 rounded-lg mt-2"
              />
            </div>

            <div className="w-full  flex flex-col">
              <div className="flex justify-start gap-2 mt-5 lg:mt-8">
                <button
                  className="bg-purple-800 w-[100px] text-white px-5 py-1 rounded-full"
                  type="submit"
                >
                  ส่ง
                </button>
                <button
                  type="reset"
                  onClick={() => setSendData({})}
                  className="bg-gray-800 text-white px-5 py-1 rounded-full"
                >
                  ล้างข้อมูล
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default Home;
