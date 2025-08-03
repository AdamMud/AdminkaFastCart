import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const API_BASE = "https://store-api.softclub.tj/Account/login";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const res = await fetch(API_BASE, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userName, password }),
            });

            let data;
            try {
                data = await res.json();
            } catch {
                throw new Error("Ошибка: сервер вернул неверный формат ответа");
            }

            if (!res.ok) {
                throw new Error(data.message || "Ошибка входа");
            }

            if (data?.data) {
                localStorage.setItem("token", data.data);
                alert("Вход успешен!");
                navigate("/dashbord");
            } else {
                throw new Error("Токен не получен от сервера");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-lg shadow-lg font-sans">
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">  Вход </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="User Name" required value={userName} onChange={(e) => setUserName(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />

                <input type="password" placeholder="Пароль" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />

                <button type="submit" className="w-full bg-[#DB4444] text-white py-3 rounded-md hover:bg-red-600 transition"  > Войти </button>
            </form>

            {error && (
                <p className="mt-4 text-center text-red-600 font-medium">{error}</p>
            )}
        </div>
    );
}
