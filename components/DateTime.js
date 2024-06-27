"use client"; // This is a client component 👈🏽

import { useEffect, useState } from "react";

function DateTimeComponent() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <p>{currentDateTime.toLocaleString("fa")}</p>
    </div>
  );
}

export default DateTimeComponent;
