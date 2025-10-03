import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("document") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const backendForm = new FormData();
  backendForm.append("document", file);

  console.log("Using API Key:", process.env.MINDEE_API_KEY?.slice(0, 10)); // cek terbaca atau tidak

  const response = await fetch(
    "https://api.mindee.net/v1/products/mindee/expense_receipts/v5/predict",
    {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.MINDEE_API_KEY}`,
      },
      body: backendForm,
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Mindee error:", errorText);
    return NextResponse.json(
      { error: "Mindee fetch failed", detail: errorText },
      { status: response.status }
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}
