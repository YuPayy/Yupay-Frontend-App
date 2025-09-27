"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);

    const handleBackClick = () => setShowModal(true);
    const handleConfirm = () => {
        setShowModal(false);
        router.push("/pages/home");
    };
    const handleCancel = () => setShowModal(false);

    return (
        <>
            <div
                onClick={handleBackClick}
                style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "2vw",
                    position: "relative",
                    cursor: "pointer",
                    margin: "3vw",
                    marginTop: "10vw",
                }}
            >
                <button
                    style={{
                        border: "0.5vw solid #2EE9D9",
                        borderRadius: "3vw",
                        background: "#fff",
                        width: "10vw",
                        height: "10vw",
                        marginRight: "4vw",
                        left: 0,
                        cursor: "pointer",
                    }}
                >
                    ←
                </button>
                <span
                    style={{
                        fontWeight: 600,
                        fontSize: "6vw",
                    }}
                >
                    Split Order
                </span>
            </div>

            {/* Modal */}
            {showModal && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000,
    }}
                >
                    <div
                        style={{  
                            borderRadius: "20px",
                            boxShadow: "0 8px 32px rgba(0,0,0,0.37)",
                            backdropFilter: "blur(7px) saturate(180%)",
                            border: "1px solid rgba(255,255,255,0.3)",
                            padding: "24px",
                            textAlign: "center",
                            maxWidth: "90%",
                            color: "#111",
                            background:
                                "linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.05))",
                       }}
                    >
                        <p
                            style={{
                                fontSize: "1.05rem",
                                fontWeight: 500,
                                marginBottom: "0px",
                                color: "#111",
                            }}
                        >
                            Are you sure you want to go back? <br />
                            Your current order split will not be saved.
                        </p>
                    </div>
                    {/* Yes & Cancel buttons outside the box */}
                    <div
                        style={{
                            display: "flex",
                            gap: "16px",
                            justifyContent: "center",
                            marginTop: "24px",
                        }}
                    >
                        <button
                            onClick={handleConfirm}
                            style={{
                                padding: "10px 32px",
                                borderRadius: "24px",
                                border: "none",
                                backdropFilter: "blur(3px) saturate(180%)",
                                WebkitBackdropFilter: "blur(30px) saturate(180%)",
                                background:
                                    "linear-gradient(135deg, rgba(167,243,208,0.8), rgba(110,231,183,0.6))",
                                color: "#111",
                                fontWeight: 600,
                                cursor: "pointer",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                            }}
                        >
                            Yes
                        </button>
                        <button
                            onClick={handleCancel}
                            style={{
                                padding: "10px 32px",
                                borderRadius: "24px",
                                border: "none",
                                background:
                                    "linear-gradient(135deg, rgba(254,202,202,0.8), rgba(252,165,165,0.6))",
                                color: "#111",
                                fontWeight: 600,
                                cursor: "pointer",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
