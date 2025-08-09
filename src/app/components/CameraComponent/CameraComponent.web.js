"use client";
import React, { useEffect, useRef } from 'react';

export default function CameraComponent() {
  const videoRef = useRef(null);

  useEffect(() => {
    async function initCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error('Gagal mengakses kamera:', err);
      }
    }
    initCamera();
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <video ref={videoRef} autoPlay playsInline style={{ width: '100%' }} />
    </div>
  );
}
