"use client";
import {
  Button,
  Card,
  CardFooter,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";

import { MdDelete, MdEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";

import moment from "moment/min/moment-with-locales";
// import { parse, addYears } from "date-fns";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminHome = () => {
  const [listData, setListData] = useState([]);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState([]);

  //----- จัดการแสดงข้อมูล / หน้า -------------- //
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = Array.isArray(listData)
    ? listData.slice(startIndex, endIndex)
    : [];

  const totalPages = Math.ceil(listData?.length / itemsPerPage);

  const [sendId, setSendId] = useState("");

  const handleData = async () => {
    try {

      const res = await axios.get(
        `https://app-send-line-api.vercel.app/api/product/${sendId}`
      );
      console.log(res.data);
      // setSendData({});
      setListData(res.data);
      // toast.success("ส่งข้อมูลสำเร็จ");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    handleData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendId]);

  const handleModalEdit = (data) => {
    setOpenModalEdit(!openModalEdit);
    setDataEdit(data);
  };

  const handleSubmit = async (e) => {
    try {
      const data = {
        id: dataEdit?.id,
        data_1: dataEdit?.do_number,
        data_2: dataEdit?.code,
        data_3: Number(dataEdit?.qty),
        count: dataEdit?.count,
        data_4: dataEdit?.note,
        data_5: dataEdit?.remake,
        data_6: dataEdit?.sign,
        data_7: dataEdit?.date,
      };

      const res = await axios.post(
        "https://app-send-line-api.vercel.app/api/product",
        data
      );
      console.log(res.data);

      if (res.status === 200) {
        setDataEdit([]);
        handleData();
        setOpenModalEdit(!openModalEdit);
        toast.success("ส่งข้อมูลสำเร็จ");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (e) => {
    try {
      const res = await axios.delete(
        `https://app-send-line-api.vercel.app/api/product/${dataEdit.id}`
      );
      console.log(res);

      if (res.status === 200) {
        toast.success("ลบข้อมูลสำเร็จ");
        setDataEdit([]);
        handleData();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <ToastContainer autoClose={3000} theme="colored" />
      <div className="">
        <h1 className="text-center text-3xl text-gray-700 ">
          รายงานการคืนผลิตภัณฑ์{" "}
        </h1>
      </div>
      <Card className=" mt-5 p-4">
        <div className=" flex flex-col lg:flex-row  items-center gap-5 ">
          {/* <div className="w-full flex flex-col lg:w-[300px]">
            <small>วันที่ส่งข้อมูล</small>
            <input
              type="date"
              placeholder="date"
              name="data_1"
              value={sendData.data_1 || ""}
              onChange={(e) => handleChange(e)}
              className="bg-gray-200 border border-gray-300 p-1 rounded-lg mt-2"
            />
          </div> */}
          <div className="w-full flex flex-col lg:w-[300px] ">
            <small>ค้นหา ID</small>
            <input
              type="text"
              placeholder="ค้นหาด้วย  ID"
              name="data_1"
              value={sendId || ""}
              onChange={(e) => setSendId(e.target.value)}
              className="bg-gray-200 border border-gray-300 p-1 rounded-lg mt-2"
            />
          </div>
          <div className="w-full  lg:w-[200px] flex flex-col">
            <small>จำนวน</small>
            <Typography className="bg-gray-200 border border-gray-300 p-1 rounded-lg mt-2">
              {listData?.length}
            </Typography>
          </div>
          <div className="flex justify-center lg:justify-start  flex-col lg:flex-row  mt-6 gap-3 ">
            <div>
              <button
                onClick={() => setSendId("")}
                className="bg-gray-800 text-white px-5 py-1 rounded-full"
              >
                ล้าง
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="mt-0 h-[350px] w-full overflow-auto lg:mt-5 ">
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
                      วันที่
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

                  <th className="border-y border-blue-gray-100  bg-blue-gray-50/50 p-2 ">
                    <div className="flex w-full space-x-3 justify-center">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold leading-none opacity-70"
                      >
                        แก้ไข
                      </Typography>

                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold leading-none opacity-70"
                      >
                        ลบ
                      </Typography>
                    </div>
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
                      ? " "
                      : ` border-b border-blue-gray-50 py-0.5 `;
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
                              {moment(data?.date)
                                .add(543, "years")
                                .format("DD-MM-YYYY")}
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
                          <div className="flex items-center justify-center text-center ">
                            <IconButton
                              size="sm"
                              className="ml-2 text-white bg-yellow-700  "
                              onClick={(e) => {
                                handleModalEdit(data);
                              }}
                            >
                              <MdEdit className="h-5 w-5   " />
                            </IconButton>
                            <IconButton
                              size="sm"
                              className="ml-3 bg-red-300 "
                              onClick={() => {
                                handleDelete();
                              }}
                            >
                              <MdDelete className="h-6 w-6   " />
                            </IconButton>
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

      {/* modal Edit Confirm */}
      <Dialog
        open={openModalEdit}
        handler={handleModalEdit}
        size="xl"
        className=" h-[50vh]  overflow-auto "
      >
        <DialogHeader className="bg-yellow-700 py-3  px-3  justify-center text-lg  opacity-80">
          <Typography variant="h5">
            แก้ไขรายการ ID : <span>{dataEdit?.id}</span>
          </Typography>
        </DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit}>
            <div className="  overflow-auto ">
              <div className="flex flex-col lg:flex-row gap-5 ">
                <div className="w-full flex flex-col">
                  <small>DO Number / CRM Number</small>
                  <input
                    type="text"
                    placeholder="DO Number / CRM Number"
                    // name="data_1"
                    // onChange={(e) => handleChange(e)}
                    onChange={(e) =>
                      setDataEdit({
                        ...dataEdit,
                        do_number: e.target.value,
                      })
                    }
                    value={dataEdit?.do_number || ""}
                    className="bg-gray-200 border border-gray-300 p-1 rounded-lg mt-2"
                  />
                </div>

                <div className=" w-full flex flex-col">
                  <small>รายการสินค้า</small>
                  <input
                    type="text"
                    placeholder="รายการสินค้า"
                    name="data_2"
                    value={dataEdit?.code || ""}
                    onChange={(e) =>
                      setDataEdit({
                        ...dataEdit,
                        code: e.target.value,
                      })
                    }
                    className="bg-gray-200 border border-gray-300 p-1 rounded-lg mt-2"
                  />
                </div>

                <div className="w-full flex flex-col">
                  <small>จำนวนสินค้าที่คืน</small>
                  <input
                    type="number"
                    placeholder="จำนวนสินค้าที่คืน"
                    name="data_3"
                    value={dataEdit?.qty || ""}
                    onChange={(e) =>
                      setDataEdit({
                        ...dataEdit,
                        qty: e.target.value,
                      })
                    }
                    className="bg-gray-200 border border-gray-300 p-1 rounded-lg mt-2"
                  />
                </div>
                <div className="w-full flex flex-col">
                  <small>หน่วยนับ</small>
                  <input
                    type="text"
                    placeholder="หน่วยนับ"
                    name="count"
                    value={dataEdit?.count || ""}
                    onChange={(e) =>
                      setDataEdit({
                        ...dataEdit,
                        count: e.target.value,
                      })
                    }
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
                    value={dataEdit?.note || ""}
                    onChange={(e) =>
                      setDataEdit({
                        ...dataEdit,
                        note: e.target.value,
                      })
                    }
                    className="bg-gray-200 border border-gray-300 p-1 rounded-lg mt-2"
                  />
                </div>
                <div className="w-full  flex flex-col">
                  <small>Remark</small>
                  <input
                    type="text"
                    placeholder="Remark"
                    name="data_5"
                    value={dataEdit?.remake || ""}
                    onChange={(e) =>
                      setDataEdit({
                        ...dataEdit,
                        remake: e.target.value,
                      })
                    }
                    className="bg-gray-200 border border-gray-300 p-1 rounded-lg mt-2"
                  />
                </div>

                <div className="w-full flex flex-col">
                  <small>ชื่อผู้แจ้ง</small>
                  <input
                    type="text"
                    placeholder="ชื่อผู้แจ้ง"
                    name="data_6"
                    value={dataEdit?.sign || ""}
                    onChange={(e) =>
                      setDataEdit({
                        ...dataEdit,
                        sign: e.target.value,
                      })
                    }
                    className="bg-gray-200 border border-gray-300 p-1 rounded-lg mt-2"
                  />
                </div>

                <div className="w-full flex flex-col">
                  <small>วันที่ส่งข้อมูล</small>
                  <input
                    type="date"
                    placeholder="date"
                    name="data_7"
                    value={dataEdit?.date || ""}
                    onChange={(e) =>
                      setDataEdit({
                        ...dataEdit,
                        date: e.target.value,
                      })
                    }
                    className="bg-gray-200 border border-gray-300 p-1 rounded-lg mt-2"
                  />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row gap-5 mt-3 "></div>
            </div>
          </form>
        </DialogBody>
        <DialogFooter className="flex justify-end gap-5 mt-3">
          <Button
            variant="text"
            color="red"
            size="sm"
            onClick={handleModalEdit}
            className="flex mr-1 text-base"
          >
            <span className="text-xl mr-2">{/* <AiOutlineStop /> */}</span>
            ยกเลิก
          </Button>
          <Button
            type="submit"
            size="sm"
            variant="gradient"
            color="purple"
            onClick={(e) => handleSubmit(e)}
            className="flex text-base mr-1"
          >
            <span className="mr-2 text-xl">{/* <FaRegSave /> */}</span>
            บันทึก
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default AdminHome;
