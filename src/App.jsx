import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [sendData, setSendData] = useState({
    data_1: "",
    data_2: "",
    data_3: 0,
    data_4: "",
    data_5: "",
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
      // const formData = new FormData();
      // formData.append("data_1", sendData.data_1);
      // formData.append("data_2", sendData.data_2);
      // formData.append("data_3", sendData.data_3);
      // formData.append("data_4", sendData.data_4);
      // formData.append("data_5", sendData.data_5);
      const data = {
        data_1 : sendData.data_1,
        data_2 : sendData.data_2,
        data_3 : sendData.data_3,
        data_4 : sendData.data_4,
        data_5 : sendData.data_5
      }


      const res = await axios.post("http://localhost:8081/api/send", data);
      console.log(res.data);

      if (res.status === 200) {
        setSendData({});
        toast.success('ส่งข้อมูลสำเร็จ')
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-black h-screen">
      <h1 className="text-white text-center text-3xl pt-5">
        ข้อมูการคืนผลิตภัณฑ์{" "}
      </h1>

      <ToastContainer autoClose={3000} theme="colored" />

      <form onSubmit={handleSubmit}>
        <div className=" bg-gray-100 mx-10 mt-5 px-5 py-10 rounded-lg shadow-lg ">
          <div className="flex flex-col lg:flex-row gap-5 ">
            <div className="w-full flex flex-col">
              <small>DO Number / CRM Number</small>
              <input
                type="text"
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
                name="data_3"
                value={sendData.data_3 || ""}
                onChange={(e) => handleChange(e)}
                className="bg-gray-200 border border-gray-300 p-1 rounded-lg mt-2"
              />
            </div>

            <div className="w-full flex flex-col">
              <small>ปัญหาของการแจ้งคืน</small>
              <input
                type="text"
                name="data_4"
                value={sendData.data_4 || ""}
                onChange={(e) => handleChange(e)}
                className="bg-gray-200 border border-gray-300 p-1 rounded-lg mt-2"
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-5 mt-3 ">
            <div className="w-full md:w-2/3 flex flex-col">
              <small>Remake</small>
              <input
                type="text"
                name="data_5"
                value={sendData.data_5 || ""}
                onChange={(e) => handleChange(e)}
                className="bg-gray-200 border border-gray-300 p-1 rounded-lg mt-2"
              />
            </div>

            <div className="w-full md:w-1/3 flex flex-col">
              <div className="flex justify-start gap-2 mt-5">
                <button
                  className="bg-purple-800 text-white px-5 py-1 rounded-full"
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
    </div>
  );
};

export default Home;
