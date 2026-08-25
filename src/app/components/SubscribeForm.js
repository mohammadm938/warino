"use client";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        setEmail("");
      } else {
        console.log(data.messageError);
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("مشکل در اتصال به سرور");
    }
  };

  return (
    <div className="mt-10 w-full max-w-md md:max-w-lg mx-auto ">
      <form
        onSubmit={handleSubmit}
        className="b flex flex-col sm:flex-row gap-4 bg-gradient-to-br from-gradientStart/30 to-gradientEnd/30 p-7 md:p-4 rounded-3xl shadow-lg backdrop-blur-md"
      >
        <input
          type="email"
          placeholder="💌 ایمیل خود را وارد کنید"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className=" flex-1 px-5 py-3 rounded-2xl  placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 transition shadow-2xl border-b-1  text-gray-200"
          required
        />
        <button className=" bg-cyan-500 text-white px-8 py-3 rounded-xl font-bold shadow-xl hover:bg-cyan-600 hover:shadow-2xl transition transform hover:-translate-y-1 ">
          خبرم کن
        </button>
      </form>
      <Toaster position="top-center" />
    </div>
  );
}
