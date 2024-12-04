"use client";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [isSignedIn] = useState(false);

  if (!isSignedIn) {
    return redirect("/signin");
  }
  return <>INSTAGRAM APP</>;
}
