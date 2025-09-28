"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push("/pages/transaction");
  };

  const handleSplitClick = (e) => {
    e.stopPropagation(); 
    router.push("/pages/scan");
  };

  return (
    <div className=" overflow-x-auto"
      onClick={handleCardClick}
      style={{
        width: "85vw",
        borderRadius: "13vw",
        maxWidth: "380px",
        maxHeight: "300px",
        padding: "7vw",
        marginBottom: "10vw",
        marginTop: "10vw",
        background: "linear-gradient(to bottom, #35F0D1, #A2FFEF)",
        color: "#000",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
        height: "60vw",
        clipPath: "polygon(0 0, 100% 0, 100% 93%, 50% 100%, 0 93%)",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: "1.1rem", fontWeight: "500" }}>Amount To Pay:</p>
        <h1 style={{ fontSize: "1.8rem", fontWeight: "bold" }}>Rp. -</h1>
        <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>Click for details</p>
      </div>

      <button
        onClick={handleSplitClick}
        style={{
          padding: "3.5vw 7vw",
          borderRadius: "4vw",
          backgroundColor: "#A2FFEF",
          color: "#333",
          fontWeight: "600",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          border: "none",
          cursor: "pointer",
          marginBottom: "3vw",
        }}
      >
        Split Now
      </button>
    </div>
  );
};

export default Hero;
