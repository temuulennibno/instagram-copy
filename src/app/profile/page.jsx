"use client";
import Image from "next/image";
import { useContext } from "react";
import { UserContext } from "../contexts/user-context";

const Page = () => {
  const { user } = useContext(UserContext);
  return (
    <main className="px-4">
      <div className="flex gap-4">
        <div>
          <Image alt="" src={user.profileUrl} width={100} height={100} className="border w-[100px] h-[100px] rounded-full object-cover" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{user.username}</h1>
          <div>
            <button>Edit profile</button>
          </div>
          <div>
            {user.fullname} <br />
            {user.bio}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
