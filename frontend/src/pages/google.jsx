import React from "react";

export default function Google() {
  function google() {
    window.open("http://localhost:8000/auth/google", "_self");
  }
  return (
    <div>
      <button onClick={google}>Clice</button>
    </div>
  );
}
