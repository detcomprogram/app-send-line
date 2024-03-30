"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RecoilRoot } from "recoil";

export default function Login() {
  const router = useRouter(); // สร้างตัวแปร router ด้วย useRouter
  const [sendDataLogin, setSendDataLogin] = useState({});

  const handleChange = (e) => {
    setSendDataLogin((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignIn = async () => {
    // const data = {
    //   username: sendDataLogin.username,
    //   password: sendDataLogin.password,
    // };

    if (
      sendDataLogin.username == "admin" &&
      sendDataLogin.password == "admin"
    ) {
      toast.success("เข้าสู่ระบบสำเร็จ");
      router.push("/admin");
    } else {
      toast.error("userName หรือ Password ไม่ถูกต้อง");
      // toast.error("ไม่สำเร็จ กรุณาลองใหม่");
      // router.push('/')
    }
  };

  const handleSignOut = () => {
     router.push('/')
  }

  return (
    <div className="flex bg-gray-100 w-full h-[100vh] justify-center">
      <RecoilRoot>
        <ToastContainer autoClose={2000} theme="colored" />
        <Card className="w-96 my-32 border-2 bg-gray-50 ">
          <div className="flex justify-center mt-10">
            <Typography variant="h4">เข้าสู่ระบบ.</Typography>
          </div>
          <CardBody className="flex flex-col  gap-4 mt-10">
            <Input
              color="blue"
              label="UserName"
              size="lg"
              name="username"
              onChange={(e) => handleChange(e)}
            />
            <Input
              type="password"
              color="blue"
              label="Password"
              size="lg"
              name="password"
              onChange={(e) => handleChange(e)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSignIn();
                }
              }}
            />
          </CardBody>
          <CardFooter className="pt-5  ">
            <div className="flex flex-col gap-3">
              <div>
                <Button
                  color="purple"
                  variant="gradient"
                  fullWidth
                  onClick={handleSignIn}
                >
                  <Typography variant="h5" color="white">
                    เข้าสู่ระบบ
                  </Typography>
                </Button>
              </div>
              <div>
                <Button
                  color="gray"
                  variant="gradient"
                  fullWidth
                  onClick={handleSignOut}
                >
                  <Typography variant="h5" color="white">
                    ออก
                  </Typography>
                </Button>
              </div>
            </div>

            {/* <ul className="mx-auto mt-5">
              <li>ADMIN : admin / admin</li>
              <li>USER : user1 / user1</li>
            </ul> */}
          </CardFooter>
        </Card>
      </RecoilRoot>
    </div>
  );
}
