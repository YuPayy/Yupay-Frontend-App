"use client";
import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Tesseract from "tesseract.js";

interface Order {
  id: number;
  name: string;
  price: number;
}

export default function CameraComponent() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Mulai kamera
  useEffect(() => {
    async function initCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Gagal akses kamera:", err);
      }
    }
    initCamera();
  }, []);

  const handleCapture = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/png");

    setLoading(true);
    try {
      const result = await Tesseract.recognize(imageData, "eng+ind");
      const text = result.data.text.trim();

      // 🔹 Parsing hasil OCR
      const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
      let subtotal = 0;
      let tax = 0;
      let total = 0;
      const orders: Order[] = [];

      lines.forEach((line, idx) => {
        const match = line.match(/(.+?)\s+(\d+(?:\.\d{1,2})?)$/); 
        if (match) {
          const name = match[1].trim();
          const price = parseFloat(match[2]);

          if (/tax/i.test(name)) {
            tax += price;
          } else if (/total/i.test(name)) {
            total = price;
          } else {
            subtotal += price;
            orders.push({ id: idx + 1, name, price });
          }
        }
      });

      if (!total) total = subtotal + tax;

      const parsedData = { orders, subtotal, tax, total };

      // simpan JSON ke localStorage
      localStorage.setItem("ocrParsed", JSON.stringify(parsedData));

      // redirect ke halaman split order
      router.push("/pages/scan/splitorder");
    } catch (err) {
      console.error("OCR gagal:", err);
    }
    setLoading(false);
  };

  return (
    <div className="relative w-screen h-screen bg-black">
      <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
      <button
        onClick={handleCapture}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-full"
      >
        {loading ? "Processing..." : "Capture & OCR"}
      </button>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
