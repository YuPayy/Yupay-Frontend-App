import { useRouter } from "next/navigation";

interface ProfileFrameProps {
  id: number | string;
  name: string;
  username: string;
  photo?: string | null;
  colorBackground?: string;
}

export default function ProfileFrame({ id, name, username, photo, colorBackground }: ProfileFrameProps) {
  const router = useRouter();
  const backgroundColor = colorBackground || "#E5E7EB"; // warna abu default
  const firstLetter = name ? name.charAt(0).toUpperCase() : "?";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: "0.5rem 1rem",
      }}
    >
      {/* Avatar + Nama & Username */}
      <button
        onClick={() => router.push("/pages/edit-profile")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          background: "transparent",
          border: "none",
          cursor: "pointer",
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "8px",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ddd",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#000",
          }}
        >
        {photo && photo.trim() == "" ? (
          <img
            src={photo}
            alt={(name || "Profile").trim().charAt(0).toUpperCase()}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "inherit",
              objectFit: "cover",
            }}
          />
        ) : (
          (name || "Profile").trim().charAt(0).toUpperCase()
        )}
      </div>


       
        <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
          <span style={{ fontWeight: "600", fontSize: "16px" }}>{name}</span>
       
        </div>
      </button>

   
      
    </div>
  );
}
