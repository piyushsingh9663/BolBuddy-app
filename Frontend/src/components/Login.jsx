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
      if(err.status===400){
        alert("Invalid Format");
        return;
      }if(err.status===404){
        alert("Invalid credentials");
        navigate('/register');

      }else if (err.status===401)alert("Invalid credentials");
      else{
        console.log(err);
        alert(err);
        return;
      }
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
      <div>
        <img src="/iconsBB.png" alt="Logo" className='w-20 h-20 ' />
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80 py-2">
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

        <button className="bg-green-600 py-2 rounded cursor-pointer">Login</button>

        <p className="text-sm text-center">
          No account? <Link to="/register" className="text-green-400">Register</Link>
        </p>
      </form>
    </div>
  );
}