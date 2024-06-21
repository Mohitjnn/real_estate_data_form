import { NextResponse } from "next/server";
import { UploadImage } from "@/lib/uploadImage";

export const POST = async (req) => {
  try {
    const formData = await req.formData();
    const images = formData.getAll("images");
    const folderName = formData.get("Name");

    const uploadPromises = images.map((image) =>
      UploadImage(image, folderName)
    );

    const results = await Promise.all(uploadPromises);

    return NextResponse.json(
      { message: "Images uploaded successfully", results },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing images:", error);
    return NextResponse.json(
      { message: "Image processing failed", error: error.message },
      { status: 500 }
    );
  }
};
