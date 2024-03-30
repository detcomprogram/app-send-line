"use client";
import SidebarAdmin from "../components/sidebarAdmin/index";
import NavbarAdmin from "../components/sidebarAdmin/Navbar";
import { useEffect } from "react";

import { useRecoilState } from "recoil";
import {mobileStore ,hideActiveStore } from '../store/store'

function layout({ children }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [hideActive, setHideActive] = useRecoilState(hideActiveStore);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [mobileData ,setMobileData] = useRecoilState(mobileStore)


  const checkScreenSize = () => {
    if (window.innerWidth < 960) {
      setHideActive(true);
      setMobileData(true)
    } else {
      setHideActive(false);
      setMobileData(false)
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // เรียกฟังก์ชันเมื่อ Component โหลดหรือขนาดหน้าจอเปลี่ยน
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    // คืนค่าเมื่อ Component ถูก Unmount เพื่อเลิกติดตามการเปลี่ยนขนาดหน้าจอ
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  return (
    <div className="flex h-screen w-full bg-gray-200">
      <div hidden={hideActive}>
        <SidebarAdmin  />
      </div>
      <div className={`flex flex-col w-full ${hideActive == true ? "" : 'ml-[180px]' } `}>
        <NavbarAdmin  />

        <div className="  p-4">{children}</div>
      </div>
    </div>
  );
}

export default layout;
