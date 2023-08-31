import React from "react";

export default function formatDate(date) {
  const typeDate = new Date(date);
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const formattedDate = typeDate.toLocaleDateString("en-GB", options);
  return formattedDate;
}
