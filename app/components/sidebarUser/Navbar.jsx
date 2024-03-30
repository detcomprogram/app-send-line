"use client";
import { useState } from "react";
import { FaAlignJustify } from "react-icons/fa";
import { AiOutlineStop } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { TbLogout } from "react-icons/tb";
import { BsPersonCircle } from "react-icons/bs";
import { useRouter } from "next/navigation";

import { useRecoilState } from "recoil";
import { hideActiveStore } from "../../store/store";
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  Button,
  Typography,
} from "@material-tailwind/react";

export default function Navbar() {
  const [hideActive, setHideActive] = useRecoilState(hideActiveStore);
  const [openModalLogout, setOpenModalLogout] = useState(false);

  const rounter = useRouter();

  const handleLogin = () => {
    rounter.push('/login');
  };


  const handleModalLogout = () => {
    setOpenModalLogout(!openModalLogout);
  };

  const logout = () => {
    rounter.push("/");
  };

  return (
    <div className="flex  bg-nav-bg h-14 items-center p-2 justify-between">
      <div className="ms-3">
        <FaAlignJustify
          className=" cursor-pointer text-xl"
          onClick={() => setHideActive(!hideActive)}
          hidden={!hideActive}
        />
      </div>
      <div className="flex gap-5">
      <div>
        <BsPersonCircle
          className="text-3xl text-white cursor-pointer"
          onClick={handleLogin}
        />
      </div>
      <div>
        <TbLogout
          className="text-3xl text-white cursor-pointer"
          onClick={handleModalLogout}
        />
      </div>
      </div>

      {/* modal Logout  */}

      <Dialog
        open={openModalLogout}
        handler={handleModalLogout}
        size="xs"
        className="h-[20vh] "
      >
        <DialogHeader className="bg-red-700 py-3  px-3  justify-center text-lg text-white opacity-80">
          <Typography variant="h5">ต้องการ Logout หรือไม่</Typography>
        </DialogHeader>
        <DialogFooter className="flex justify-center gap-3 mt-3">
          <Button
            // variant="outlined"
            color="red"
            size="sm"
            onClick={handleModalLogout}
            className="flex  text-base "
          >
            <span className="text-xl mr-2">
              <AiOutlineStop />
            </span>
            ยกเลิก
          </Button>
          <Button
            size="sm"
            // variant="gradient"
            color="green"
            onClick={logout}
            className="flex text-base mr-1"
          >
            <span className="mr-2 text-xl">
              <BiLogOut />
            </span>
            ตกลง
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
