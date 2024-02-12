import axios from "axios";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

import '../layout/styles.css'
export default function LoginForm() {
  const { setUser } = useAuth();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8008/auth/login",
        input
      );

      localStorage.setItem("token", response.data.token);

      const userResponse = await axios.get("http://localhost:8008/auth/me", {
        headers: { Authorization: `Bearer ${response.data.token}` },
      });

      setUser(userResponse.data);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
<div className="container">
  <div className="p-8 border rounded-lg shadow-lg bg-white" style={{ width: "600px", height: "800px" }}>
    <div className="flex items-center justify-center w-32 h-32 rounded-full overflow-hidden mx-auto mb-6">
      <img src="https://img2.thaipng.com/20180607/qtt/kisspng-computer-icons-man-avatar-male-login-5b1946d5e0bfe0.7062621915283831899206.jpg" alt="Logo" className="w-full h-full object-cover object-center" />
    </div>

    <h2 className="text-2xl font-semibold text-center mb-4">เข้าสู่ระบบ</h2>

    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <label className="flex flex-col">
        <span className="text-sm font-semibold mb-1">ชื่อผู้ใช้งาน</span>
        <input type="text" className="input input-bordered py-2 px-3" name="email" value={input.email} onChange={handleChange} placeholder="กรุณากรอกชื่อ" />
      </label>
      <label className="flex flex-col">
        <span className="text-sm font-semibold mb-1">รหัสผ่าน</span>
        <input type="password" className="input input-bordered py-2 px-3" name="password" value={input.password} onChange={handleChange} placeholder="กรุณากรอกรหัสผ่าน" />
      </label>

      <button type="submit" className="btn btn-primary py-2">
        เข้าสู่ระบบ
      </button>
    </form>
  </div>
</div>
  );
}
