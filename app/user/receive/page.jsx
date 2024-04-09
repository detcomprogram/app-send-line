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

import { MdRemoveRedEye } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";

import moment from "moment/min/moment-with-locales";
// import { parse, addYears } from "date-fns";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Receive = () => {
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
        `${process.env.NEXT_PUBLIC_API}/api/status`
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
        status:1 ,
        date: dataEdit?.date,
      };

      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API}/api/status`,
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

  return (
    <>
      <ToastContainer autoClose={3000} theme="colored" />
      <div className="mt-5">
        <h1 className="text-center text-3xl text-gray-700 ">
          ตรวจสอบรับสินค้า{" "}
        </h1>
      </div>
      <Card className=" p-4">
        <div>
          <div className="mt-0 h-[350px] w-full overflow-auto lg:mt-3 ">
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

                  <th className="border-y border-blue-gray-100  bg-blue-gray-50/50 p-2 ">
                    <div className="flex w-full space-x-3 justify-center">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold leading-none opacity-70"
                      >
                        อัพเดท
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
                          <div className="flex items-center justify-center text-center ">
                            <IconButton
                              size="sm"
                              className="ml-2 text-white bg-green-700  "
                              onClick={(e) => {
                                handleModalEdit(data);
                              }}
                            >
                              <MdRemoveRedEye className="h-5 w-5   " />
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

      {/* modal Update Confirm */}
      <Dialog
        open={openModalEdit}
        handler={handleModalEdit}
        size="xs"
        className=" overflow-auto "
      >
        <DialogHeader className="bg-green-300 py-3  px-3  justify-center text-lg  opacity-80">
          <Typography variant="h5">
            อัพเดทสถานะ : <span>{dataEdit?.do_number}</span>
          </Typography>
        </DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit}>
              <div className="w-full items-center   flex flex-col">
                <div className="flex flex-col">
                <small className="">วันที่ส่งข้อมูล</small>
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
                  className="bg-gray-200 border w-full lg:w-[300px]  border-gray-300 p-1 rounded-lg mt-2"
                />
                </div>
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

export default Receive;
