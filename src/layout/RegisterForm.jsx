import axios from 'axios';
import { useState } from "react";

export default function RegisterForm() {
  const [input, setInput] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    address: '',
    phone: ''
  });

  const hdlChange = e => {
    setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async e => {
    try {
      e.preventDefault();
      
      // Validation
      if (input.password !== input.confirmPassword) {
        return alert('Please check confirm password');
      }

      const formData = {
        username: input.username,
        password: input.password,
        confirmPassword: input.confirmPassword,
        email: input.email,
        address: input.address,
        phone: input.phone
      };

      const response = await axios.post('http://localhost:8008/auth/register', formData);
      
      if (response.status === 200) {
        alert('Register Successful');
      }
    } catch (error) {
      console.error('Registration Error:', error);
      alert('Registration Failed');
    }
  };

  return (
<div className="p-5 border rounded-lg shadow-lg mx-auto mt-5 bg-white w-4/6 min-w-[500px]">
<div className="flex items-center justify-center w-32 h-32 rounded-full overflow-hidden mx-auto mb-6">
      <img src="https://img2.thaipng.com/20180607/qtt/kisspng-computer-icons-man-avatar-male-login-5b1946d5e0bfe0.7062621915283831899206.jpg" alt="Logo" className="w-full h-full object-cover object-center" />
    </div>

  <div className="text-3xl mb-5">สร้างบัชชี</div>
  <form className="flex flex-col gap-2" onSubmit={hdlSubmit}>
    {/* Input fields for registration */}
    {/* Username */}
    <label className="form-control">
      <span className="label-text">ชื่อ</span>
      <input
        type="text"
        className="input input-bordered"
        name="username"
        value={input.username}
        onChange={hdlChange}
        placeholder='กรุณากรอกชื่อผู้ใช้'
      />
    </label>
    {/* Password */}
    <label className="form-control">
      <span className="label-text">Password</span>
      <input
        type="password"
        className="input input-bordered"
        name="password"
        value={input.password}
        onChange={hdlChange}
        placeholder='กรุณากรอกรหัสผ่าน'
      />
    </label>
    {/* Confirm Password */}
    <label className="form-control">
      <span className="label-text">Confirm Password</span>
      <input
        type="password"
        className="input input-bordered"
        name="confirmPassword"
        value={input.confirmPassword}
        onChange={hdlChange}
        placeholder='ยืนยันรหัสผ่าน'
      />
    </label>
    {/* Email */}
    <label className="form-control">
      <span className="label-text">Email</span>
      <input
        type="email"
        className="input input-bordered"
        name="email"
        value={input.email}
        onChange={hdlChange}
        placeholder='กรุณากรอกอีเมล์'
      />
    </label>
    {/* Address */}
    <label className="form-control">
      <span className="label-text">Address</span>
      <input
        type="text"
        className="input input-bordered"
        name="address"
        value={input.address}
        onChange={hdlChange}
        placeholder='กรุณากรอกที่อยู่'
      />
    </label>
    {/* Phone */}
    <label className="form-control">
      <span className="label-text">Phone</span>
      <input
        type="text"
        className="input input-bordered"
        name="phone"
        value={input.phone}
        onChange={hdlChange}
        placeholder='กรุณากรอกเบอร์โทรศัพท์'
      />
    </label>
    {/* Submit and Reset Buttons */}
    <div className="flex gap-5 mt-7">
      <button type="submit" className="btn btn-outline btn-info">สมัครบัชชี</button>
      <button type="reset" className="btn btn-outline btn-warning">Reset</button>
    </div>
  </form>
</div>

  );
}
