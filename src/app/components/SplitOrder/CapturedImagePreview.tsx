"use client";
import Image from "next/image";
import React from "react";

interface CapturedImagePreviewProps {
  capturedImage?: string;
}

export default function CapturedImagePreview({
  capturedImage,
}: CapturedImagePreviewProps) {
  if (!capturedImage) {
    return <p>No image captured.</p>;
  }

  return (
    <div
      style={{
        maxWidth: "100%",
        marginBottom: "1rem",
        borderRadius: "8px",
        boxShadow: "0 0 8px rgba(0,0,0,0.15)",
        overflow: "hidden",
        position: "relative",
        width: "100%",
        height: "auto",
      }}
    >
      <Image
        src={capturedImage}
        alt="Captured Bill"
        fill
        sizes="100vw"
        className="object-contain"
        unoptimized
      />
    </div>
  );
}
