import { Instagram, Send } from "lucide-react";

export default function SocialLinks() {
  return (
    <div className="mt-10 flex gap-6 justify-center">
      <a
        href="#"
        className="text-white flex items-center gap-2 font-semibold transition-transform transform hover:text-cyan-400 hover:scale-110 hover:shadow-md"
      >
        <Instagram className="w-5 h-5" /> اینستاگرام
      </a>
      <a
        href="#"
        className="text-white flex items-center gap-2 font-semibold transition-transform transform hover:text-cyan-400 hover:scale-110 hover:shadow-md"
      >
        <Send className="w-5 h-5" /> تلگرام
      </a>
    </div>
  );
}
