"use client";
import React from "react";

export default function CapturedImagePreview({ capturedImage }) {
  if (!capturedImage) {
    return <p>No image captured.</p>;
  }

  return (
    <img
      src={capturedImage}
      alt="Captured Bill"
      style={{
        maxWidth: "100%",
        marginBottom: "1rem",
        borderRadius: "8px",
        boxShadow: "0 0 8px rgba(0,0,0,0.15)",
      }}
    />
  );
}
