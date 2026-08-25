"use client";
import { motion } from "framer-motion";

export default function Logo() {
  return (
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-4xl md:text-5xl font-extrabold drop-shadow-lg"
    >
      وارینو | Warino
    </motion.h1>
  );
}
