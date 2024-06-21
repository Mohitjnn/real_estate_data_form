import * as yup from "yup";

const validationSchema = yup.object({
  Name: yup.string().required("Name is required"),
  Location: yup.string().required("Location is required"),
  CarpetArea: yup.number().required("Carpet Area is required"),
  AskingPrice: yup.number().required("Asking Price is required"),
  IsForRent: yup.boolean(),
  Furnished: yup.boolean(),
  Features: yup.object({
    Bedrooms: yup.number().required("Bedrooms are required"),
    Bathrooms: yup.number().required("Bathrooms are required"),
    Balconies: yup.number().required("Balconies are required"),
    Kitchen: yup.string().required("Kitchen is required"),
  }),
  Amenities: yup.string().required("Amenities are required"),
  SpecialFeatures: yup.string().required("Special Features are required"),
  Landmarks: yup.string().required("Landmarks are required"),
  ExactLocation: yup.object({
    DistanceFromBusStop: yup
      .string()
      .required("Distance from bus stop is required"),
    DistanceFromSchool: yup
      .string()
      .required("Distance from school is required"),
  }),
});

export default validationSchema;
