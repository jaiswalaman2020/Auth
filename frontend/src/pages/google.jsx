import React from "react";

const API_BASE_URL =
  "https://auth-15v2.onrender.com/api/auth/google/callback" ||
  "http://localhost:8000/api/auth/google";

export default function Google() {
  function google() {
    window.location.href = API_BASE_URL;
  }
  return (
    <div>
      <button
        className={"bg-transparent text-gray-950 text-lg"}
        onClick={google}
      >
        Login with google
      </button>
    </div>
  );
}
