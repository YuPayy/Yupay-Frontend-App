"use client";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function CameraComponent() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    async function initCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Gagal mengakses kamera:", err);
      }
    }
    initCamera();
  }, []);

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/png");

    // Simpan hasil capture ke localStorage biar bisa diakses di halaman split order
    localStorage.setItem("capturedImage", imageData);

    // Redirect ke halaman split order
    router.push("/pages/scan/splitorder");
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <video ref={videoRef} autoPlay playsInline style={{ width: "100%" }} />
      <button
        onClick={handleCapture}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          background: "blue",
          color: "white",
          borderRadius: "8px",
        }}
      >
        Capture & Go to Split Order
      </button>
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}
