"use client";
import axios from "axios";
import Link from "next/link";

export default function SigninPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const email = e.target.email.value;
          const password = e.target.password.value;

          axios
            .post(`${process.env.NEXT_PUBLIC_API}/signin`, { email, password })
            .then((res) => {
              alert(res.data.message);
            })
            .catch((err) => {
              alert(err.response.data.message);
            });
        }}
        className="flex flex-col gap-4"
      >
        <label className="flex flex-col">
          Credential
          <input name="credential" type="string" className="text-black" />
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
