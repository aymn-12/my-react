// src/components/AnimatedNumber.jsx
import { motion as Motion } from "framer-motion";
import { useState } from "react";

const AnimatedNumbers = () => {
  // نولّد مصفوفة أرقام 1 → 15 كمثال
  const [count, setCount] = useState(0); // عدد الصفوف
  const [numbers, setNumbers] = useState([]);

  const handleStart = () => {
    const newNumbers = [];
    let current = 1;
    for (let row = 1; row <= count; row++) {
      const rowNumbers = [];
      for (let i = 0; i < row; i++) {
        rowNumbers.push(current++);
      }
      newNumbers.push(rowNumbers);
    }
    setNumbers(newNumbers);
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-500 flex flex-col items-center justify-center p-8">
      <div className="mb-8 flex gap-2">
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          placeholder="عدد الصفوف"
          className="px-4 py-2 rounded-lg outline-none text-gray-700"
        />
        <button
          onClick={handleStart}
          className="px-4 py-2 bg-white text-purple-600 font-bold rounded-lg hover:bg-gray-100 transition"
        >
          ابدأ
        </button>
      </div>

      <div className="flex flex-col items-center">
        {numbers.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex gap-4 mb-4 justify-center"
          >
            {row.map((num, numIndex) => (
              <Motion.div
                key={num}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: rowIndex * 0.3 + numIndex * 0.1,
                  type: "spring",
                  stiffness: 500,
                }}
                className="w-16 h-16 flex justify-center items-center bg-white rounded-full text-xl font-bold text-purple-600 shadow-lg"
              >
                {num}
              </Motion.div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedNumbers;
