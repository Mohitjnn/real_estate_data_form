"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import validationSchema from "@/schemas";
import axios from "axios";

function Contact() {
  const [successMessage, setSuccessMessage] = useState("");
  const [imageFiles, setImageFiles] = useState([]);

  const onChangeHandler = (e) => {
    if (e.target.files) {
      setImageFiles(e.target.files);
    }
  };

  const formik = useFormik({
    initialValues: {
      Name: "",
      Location: "",
      CarpetArea: "",
      AskingPrice: "",
      IsForRent: false,
      Furnished: false,
      Features: {
        Bedrooms: "",
        Bathrooms: "",
        Balconies: "",
        Kitchen: "",
      },
      Amenities: "",
      SpecialFeatures: "",
      Landmarks: "",
      ExactLocation: {
        DistanceFromBusStop: "",
        DistanceFromSchool: "",
      },
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        // Upload images first
        const formData = new FormData();
        Array.from(imageFiles).forEach((file) => {
          formData.append("images", file);
        });
        formData.append("Name", values.Name);

        const response = await axios.post("/api/uploadImage", formData);
        const { results } = response.data;

        // Include image URLs and public IDs in the form data
        const images = results.map((result) => ({
          url: result.url,
          public_id: result.public_id,
        }));

        const formattedData = {
          ...values,
          Amenities: values.Amenities.split(",").map((amenity) =>
            amenity.trim()
          ),
          SpecialFeatures: values.SpecialFeatures.split(",").map((feature) =>
            feature.trim()
          ),
          Landmarks: values.Landmarks.split(",").map((landmark) =>
            landmark.trim()
          ),
          images, // Add images to the form data
        };

        const saveResponse = await fetch("/api", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        });

        if (saveResponse.ok) {
          setSuccessMessage("Form submitted successfully!");
          resetForm();
        } else {
          setSuccessMessage("Form submission failed. Please try again.");
        }
      } catch (error) {
        setSuccessMessage("An error occurred. Please try again.");
      }
    },
  });

  return (
    <main className="w-full h-full">
      <center className="w-full h-full px-4 md:px-0 xl:px-16 mb-20">
        <section className="flex flex-col xl:flex-row w-full h-full justify-center items-center xl:space-x-6">
          <div className="flex flex-col w-full h-screen items-start my-4 px-4 justify-between">
            <h1 className="Title text-blue-900 text-center w-full">
              Data Upload
            </h1>
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col items-start space-y-4 text-left w-full py-4"
            >
              <label htmlFor="Name" className="text-lg font-bold text-gray-700">
                {formik.errors.Name && formik.touched.Name
                  ? formik.errors.Name
                  : "Name"}
              </label>
              <input
                value={formik.values.Name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="Name"
                name="Name"
                className={`input ${
                  formik.errors.Name && formik.touched.Name
                    ? "border-2 border-red-600"
                    : "focus:border-blue-500"
                }`}
                type="text"
                placeholder="Name"
              />

              <label
                htmlFor="Location"
                className={`font-semibold ${
                  formik.errors.Location && formik.touched.Location
                    ? "text-red-500"
                    : "text-blue-500"
                }`}
              >
                {formik.errors.Location && formik.touched.Location
                  ? formik.errors.Location
                  : "Location"}
              </label>
              <input
                value={formik.values.Location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="Location"
                name="Location"
                className={`input ${
                  formik.errors.Location && formik.touched.Location
                    ? "border-2 border-red-600"
                    : "focus:border-blue-500"
                }`}
                type="text"
                placeholder="Location"
              />

              <label
                htmlFor="CarpetArea"
                className={`font-semibold ${
                  formik.errors.CarpetArea && formik.touched.CarpetArea
                    ? "text-red-500"
                    : "text-blue-500"
                }`}
              >
                {formik.errors.CarpetArea && formik.touched.CarpetArea
                  ? formik.errors.CarpetArea
                  : "Carpet Area (sq.ft)"}
              </label>
              <input
                value={formik.values.CarpetArea}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="CarpetArea"
                name="CarpetArea"
                className={`input ${
                  formik.errors.CarpetArea && formik.touched.CarpetArea
                    ? "border-2 border-red-600"
                    : "focus:border-blue-500"
                }`}
                type="number"
                placeholder="Carpet Area"
              />

              <label
                htmlFor="AskingPrice"
                className={`font-semibold ${
                  formik.errors.AskingPrice && formik.touched.AskingPrice
                    ? "text-red-500"
                    : "text-blue-500"
                }`}
              >
                {formik.errors.AskingPrice && formik.touched.AskingPrice
                  ? formik.errors.AskingPrice
                  : "Asking Price (INR)"}
              </label>
              <input
                value={formik.values.AskingPrice}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="AskingPrice"
                name="AskingPrice"
                className={`input ${
                  formik.errors.AskingPrice && formik.touched.AskingPrice
                    ? "border-2 border-red-600"
                    : "focus:border-blue-500"
                }`}
                type="number"
                placeholder="Asking Price"
              />

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="IsForRent"
                  checked={formik.values.IsForRent}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label
                  className="ml-2 block text-sm font-medium text-gray-700"
                  htmlFor="IsForRent"
                >
                  Is For Rent
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="Furnished"
                  checked={formik.values.Furnished}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label
                  className="ml-2 block text-sm font-medium text-gray-700"
                  htmlFor="Furnished"
                >
                  Furnished
                </label>
              </div>

              <label
                htmlFor="Features.Bedrooms"
                className={`font-semibold ${
                  formik.errors.Features?.Bedrooms &&
                  formik.touched.Features?.Bedrooms
                    ? "text-red-500"
                    : "text-blue-500"
                }`}
              >
                {formik.errors.Features?.Bedrooms &&
                formik.touched.Features?.Bedrooms
                  ? formik.errors.Features.Bedrooms
                  : "Bedrooms"}
              </label>
              <input
                value={formik.values.Features.Bedrooms}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="Features.Bedrooms"
                name="Features.Bedrooms"
                className={`input ${
                  formik.errors.Features?.Bedrooms &&
                  formik.touched.Features?.Bedrooms
                    ? "border-2 border-red-600"
                    : "focus:border-blue-500"
                }`}
                type="number"
                placeholder="Bedrooms"
              />

              <label
                htmlFor="Features.Bathrooms"
                className={`font-semibold ${
                  formik.errors.Features?.Bathrooms &&
                  formik.touched.Features?.Bathrooms
                    ? "text-red-500"
                    : "text-blue-500"
                }`}
              >
                {formik.errors.Features?.Bathrooms &&
                formik.touched.Features?.Bathrooms
                  ? formik.errors.Features.Bathrooms
                  : "Bathrooms"}
              </label>
              <input
                value={formik.values.Features.Bathrooms}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="Features.Bathrooms"
                name="Features.Bathrooms"
                className={`input ${
                  formik.errors.Features?.Bathrooms &&
                  formik.touched.Features?.Bathrooms
                    ? "border-2 border-red-600"
                    : "focus:border-blue-500"
                }`}
                type="number"
                placeholder="Bathrooms"
              />

              <label
                htmlFor="Features.Balconies"
                className={`font-semibold ${
                  formik.errors.Features?.Balconies &&
                  formik.touched.Features?.Balconies
                    ? "text-red-500"
                    : "text-blue-500"
                }`}
              >
                {formik.errors.Features?.Balconies &&
                formik.touched.Features?.Balconies
                  ? formik.errors.Features.Balconies
                  : "Balconies"}
              </label>
              <input
                value={formik.values.Features.Balconies}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="Features.Balconies"
                name="Features.Balconies"
                className={`input ${
                  formik.errors.Features?.Balconies &&
                  formik.touched.Features?.Balconies
                    ? "border-2 border-red-600"
                    : "focus:border-blue-500"
                }`}
                type="number"
                placeholder="Balconies"
              />

              <label
                htmlFor="Features.Kitchen"
                className={`font-semibold ${
                  formik.errors.Features?.Kitchen &&
                  formik.touched.Features?.Kitchen
                    ? "text-red-500"
                    : "text-blue-500"
                }`}
              >
                {formik.errors.Features?.Kitchen &&
                formik.touched.Features?.Kitchen
                  ? formik.errors.Features.Kitchen
                  : "Kitchen"}
              </label>
              <input
                value={formik.values.Features.Kitchen}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="Features.Kitchen"
                name="Features.Kitchen"
                className={`input ${
                  formik.errors.Features?.Kitchen &&
                  formik.touched.Features?.Kitchen
                    ? "border-2 border-red-600"
                    : "focus:border-blue-500"
                }`}
                type="text"
                placeholder="Kitchen"
              />

              <label
                htmlFor="Amenities"
                className={`font-semibold ${
                  formik.errors.Amenities && formik.touched.Amenities
                    ? "text-red-500"
                    : "text-blue-500"
                }`}
              >
                {formik.errors.Amenities && formik.touched.Amenities
                  ? formik.errors.Amenities
                  : "Amenities (comma separated)"}
              </label>
              <input
                value={formik.values.Amenities}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="Amenities"
                name="Amenities"
                className={`input ${
                  formik.errors.Amenities && formik.touched.Amenities
                    ? "border-2 border-red-600"
                    : "focus:border-blue-500"
                }`}
                type="text"
                placeholder="Amenities"
              />

              <label
                htmlFor="SpecialFeatures"
                className={`font-semibold ${
                  formik.errors.SpecialFeatures &&
                  formik.touched.SpecialFeatures
                    ? "text-red-500"
                    : "text-blue-500"
                }`}
              >
                {formik.errors.SpecialFeatures && formik.touched.SpecialFeatures
                  ? formik.errors.SpecialFeatures
                  : "Special Features (comma separated)"}
              </label>
              <input
                value={formik.values.SpecialFeatures}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="SpecialFeatures"
                name="SpecialFeatures"
                className={`input ${
                  formik.errors.SpecialFeatures &&
                  formik.touched.SpecialFeatures
                    ? "border-2 border-red-600"
                    : "focus:border-blue-500"
                }`}
                type="text"
                placeholder="Special Features"
              />

              <label
                htmlFor="Landmarks"
                className={`font-semibold ${
                  formik.errors.Landmarks && formik.touched.Landmarks
                    ? "text-red-500"
                    : "text-blue-500"
                }`}
              >
                {formik.errors.Landmarks && formik.touched.Landmarks
                  ? formik.errors.Landmarks
                  : "Landmarks (comma separated)"}
              </label>
              <input
                value={formik.values.Landmarks}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="Landmarks"
                name="Landmarks"
                className={`input ${
                  formik.errors.Landmarks && formik.touched.Landmarks
                    ? "border-2 border-red-600"
                    : "focus:border-blue-500"
                }`}
                type="text"
                placeholder="Landmarks"
              />

              <label
                htmlFor="ExactLocation.DistanceFromBusStop"
                className={`font-semibold ${
                  formik.errors.ExactLocation?.DistanceFromBusStop &&
                  formik.touched.ExactLocation?.DistanceFromBusStop
                    ? "text-red-500"
                    : "text-blue-500"
                }`}
              >
                {formik.errors.ExactLocation?.DistanceFromBusStop &&
                formik.touched.ExactLocation?.DistanceFromBusStop
                  ? formik.errors.ExactLocation.DistanceFromBusStop
                  : "Distance From Bus Stop"}
              </label>
              <input
                value={formik.values.ExactLocation.DistanceFromBusStop}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="ExactLocation.DistanceFromBusStop"
                name="ExactLocation.DistanceFromBusStop"
                className={`input ${
                  formik.errors.ExactLocation?.DistanceFromBusStop &&
                  formik.touched.ExactLocation?.DistanceFromBusStop
                    ? "border-2 border-red-600"
                    : "focus:border-blue-500"
                }`}
                type="number"
                placeholder="Distance From Bus Stop"
              />

              <label
                htmlFor="ExactLocation.DistanceFromSchool"
                className={`font-semibold ${
                  formik.errors.ExactLocation?.DistanceFromSchool &&
                  formik.touched.ExactLocation?.DistanceFromSchool
                    ? "text-red-500"
                    : "text-blue-500"
                }`}
              >
                {formik.errors.ExactLocation?.DistanceFromSchool &&
                formik.touched.ExactLocation?.DistanceFromSchool
                  ? formik.errors.ExactLocation.DistanceFromSchool
                  : "Distance From School"}
              </label>
              <input
                value={formik.values.ExactLocation.DistanceFromSchool}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="ExactLocation.DistanceFromSchool"
                name="ExactLocation.DistanceFromSchool"
                className={`input ${
                  formik.errors.ExactLocation?.DistanceFromSchool &&
                  formik.touched.ExactLocation?.DistanceFromSchool
                    ? "border-2 border-red-600"
                    : "focus:border-blue-500"
                }`}
                type="number"
                placeholder="Distance From School"
              />
              <label htmlFor="images" className="font-semibold text-blue-500">
                upload images (MAX 10MB OVERALL UPLOAD SIZE)
              </label>
              <input
                type="file"
                name="images"
                multiple={true}
                onChange={onChangeHandler}
              />
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </form>
            {successMessage && (
              <div className="mt-4 text-center text-green-500">
                {successMessage}
              </div>
            )}
          </div>
        </section>
      </center>
    </main>
  );
}

export default Contact;
