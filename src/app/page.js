"use client";
import { redirect } from "next/navigation";
import { useContext } from "react";
import { UserContext } from "./contexts/user-context";

export default function Home() {
  const { isSignedIn, setIsSignedIn } = useContext(UserContext);

  if (!isSignedIn) {
    return redirect("/signin");
  }
  return (
    <>
      INSTAGRAM APP
      <button
        onClick={() => {
          setIsSignedIn(false);
        }}
      >
        signout
      </button>
    </>
  );
}
