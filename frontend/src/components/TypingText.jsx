import React, { useEffect, useState } from 'react';

const TypingText = () => {
  const texts = [
    "Welcome to Appointo",
    "Consult Flexibly with Trusted Doctors!!"
  ];

  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;

    const currentText = texts[currentLine];

    const timeout = setTimeout(() => {
      if (charIndex <= currentText.length) {
        if (currentLine === 0) {
          setLine1(currentText.substring(0, charIndex));
        } else {
          setLine2(currentText.substring(0, charIndex));
        }
        setCharIndex((prev) => prev + 1);
      } else {
        if (currentLine === 0) {
          setCurrentLine(1);
          setCharIndex(0);
        } else {
          setDone(true); // Done typing both lines
        }
      }
    }, 100); // Typing speed

    return () => clearTimeout(timeout);
  }, [charIndex, currentLine, done, texts]);

  return (
    <div className="text-start text-[#436a84] my-10 space-y-2 md:ml-16">
      <p className="text-5xl sm:text-5xl font-semibold">
        {line1}
        {!done && currentLine === 0 && <span className="animate-pulse">|</span>}
      </p>
      <p className="text-xl text-gray-500 sm:text-2xl">
        {line2}
        {!done && currentLine === 1 && <span className="animate-pulse">|</span>}
      </p>
    </div>
  );
};

export default TypingText;

