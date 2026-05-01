import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import { API_URL } from "../config/api";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_URL}/bot/auth/login`, form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username",res.data.user.username);
      navigate("/");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80">
        <h2 className="text-xl font-bold text-center">Login</h2>

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

        <button className="bg-green-600 py-2 rounded">Login</button>

        <p className="text-sm text-center">
          No account? <Link to="/register" className="text-green-400">Register</Link>
        </p>
      </form>
    </div>
  );
}