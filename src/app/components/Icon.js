import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Icon({ name, size = 24, color = "#000" }) {
  return <Ionicons name={name} size={size} color={color} />;
}
