// src/components/Header.jsx
import { motion as Motion } from "framer-motion";
import { FaTasks } from "react-icons/fa"; // أيقونة المهام من react-icons

const Header = () => {
  return (
    <header className="w-full mb-6 flex justify-center items-center gap-3">
      {/* أيقونة متحركة */}
      <Motion.div
        animate={{ rotate: [0, 15, -15, 0] }} // اهتزاز دائري
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <FaTasks className="text-purple-700 text-3xl" />
      </Motion.div>

      {/* نص متحرك دائم */}
      <Motion.h1
        animate={{ y: [0, -5, 0] }} // حركة صعود وهبوط بسيطة
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="text-3xl sm:text-4xl italic font-semibold tracking-tight text-purple-900 drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]"
      >
        To do manager
      </Motion.h1>
    </header>
  );
};

export default Header;
