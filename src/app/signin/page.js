"use client";
import axios from "axios";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../contexts/user-context";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

export default function SigninPage() {
  const { isSignedIn, setIsSignedIn } = useContext(UserContext);

  if (isSignedIn) {
    return redirect("/");
  }

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const credential = e.target.credential.value;
          const password = e.target.password.value;

          axios
            .post(`${process.env.NEXT_PUBLIC_API}/signin`, { credential, password })
            .then((res) => {
              toast.success("Амжилттай нэвтэрлээ");
              setIsSignedIn(true);
            })
            .catch((err) => {
              toast.error(err.response.data.message);
            });
        }}
        className="flex flex-col gap-4"
      >
        <label className="flex flex-col">
          Credential
          <input name="credential" type="text" className="text-black" />
        </label>
        <label className="flex flex-col">
          Password
          <input name="password" type="password" className="text-black" />
        </label>
        <button className="text-black bg-white">Signin</button>
      </form>
      <div className="my-4">
        Don&rsquo;t have an account? <Link href={"/signup"}>Sign up</Link>
      </div>
    </div>
  );
}
