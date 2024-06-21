// pages/api/index.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import postForm from "@/models/PostForm";

export async function POST(request) {
  await dbConnect();
  try {
    const data = await request.json();
    const {
      Name,
      Location,
      CarpetArea,
      AskingPrice,
      IsForRent,
      Furnished,
      Features,
      Amenities,
      SpecialFeatures,
      Landmarks,
      ExactLocation,
      images, // Include images in request data
    } = data;

    const newProperty = new postForm({
      Name,
      Location,
      CarpetArea,
      AskingPrice,
      IsForRent,
      Furnished,
      Features,
      Amenities,
      SpecialFeatures,
      Landmarks,
      ExactLocation,
      images, // Save images to the schema
    });

    await newProperty.save();

    return NextResponse.json({ message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error saving property:", error);
    return NextResponse.json(
      { error: "Form submission failed. Please try again." },
      { status: 500 }
    );
  }
}
