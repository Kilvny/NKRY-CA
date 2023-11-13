// pages/403.tsx
import { NextPage } from "next";
import Link from "next/link";
import React from "react";

const Custom403: NextPage = () => {
  const containerStyle = {
    display: "grid",
    placeContent: "center",
    minHeight: "100vh",
  };

  const flexContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const headingStyle = {
    fontSize: "1.5rem",
    margin: "0.75rem 0",
  };

  const paragraphStyle = {
    margin: "0.5rem 0",
  };

  const btnStyle = {
    backgroundColor: "#3182ce",
    color: "#fff",
    padding: "0.5rem 1rem",
    borderRadius: "0.25rem",
    textDecoration: "none",
    display: "inline-block",
    marginTop: "1rem",
  };

  return (
    <div style={containerStyle}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ margin: "1rem 0", textAlign: "center" }}>
          <h1 style={headingStyle}>403 - Unauthorized</h1>
          <p style={paragraphStyle}>Please login as admin</p>
        </div>
        <Link href="/signin" style={btnStyle}>
          Login
        </Link>
      </div>
    </div>
  );
};

export default Custom403;
