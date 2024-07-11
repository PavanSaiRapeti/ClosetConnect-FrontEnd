import React from "react";
import Link from "next/link";
import Layout from "pages/Layout";

export default function ErrorPage() {
  return (
    <Layout>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1 style={{ fontSize: 64 }}>404</h1>
        <h2>The content you are looking for is not available at the moment</h2>
        <Link href="/" passHref>
          <h3 style={{ cursor: "pointer", textDecoration: "underline" }}>
            Continue Shopping
          </h3>
        </Link>
      </div>
    </Layout>
  );
}
