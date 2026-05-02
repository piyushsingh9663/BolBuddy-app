import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'
import { API_URL } from "../config/api";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_URL}/bot/auth/register`, form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username",res.data.user.username);
      navigate("/login");
    } catch (err) {
      if(err.status===400){
        alert("Invalid Format");
        return;
      }
      alert("Registration failed");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
      <div>
        <img src="/iconsBB.png" alt="Logo" className='w-20 h-20 ' />
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80 py-2">
        <h2 className="text-xl font-bold text-center">Register</h2>

        <input
          placeholder="Username"
          className="p-2 bg-gray-800 rounded"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          placeholder="Email"
          className="p-2 bg-gray-800 rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="p-2 bg-gray-800 rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="bg-green-600 py-2 rounded cursor-pointer">Register</button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-green-400">Login</Link>
        </p>
      </form>
    </div>
  );
}