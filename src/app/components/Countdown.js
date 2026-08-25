"use client";
import { useEffect, useState } from "react";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      if (distance <= 0) clearInterval(interval);

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-6 flex gap-4 text-center text-xl font-bold">
      {["روز", "ساعت", "دقیقه", "ثانیه"].map((label, i) => {
        const value = [
          timeLeft.days,
          timeLeft.hours,
          timeLeft.minutes,
          timeLeft.seconds,
        ][i];
        return (
          <div
            key={i}
            className="bg-gradient-to-br from-gradientStart to-gradientEnd p-4 rounded-xl shadow text-white"
          >
            <p className="text-2xl font-bold">{value}</p>
            <span className="text-sm opacity-80">{label}</span>
          </div>
        );
      })}
    </div>
  );
}
