"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { CgHome, CgMail, CgPlayButton, CgSearch } from "react-icons/cg";
import { UserContext } from "../contexts/user-context";

export const Footer = () => {
  const { user } = useContext(UserContext);
  return (
    <footer className="fixed bottom-0 left-0 z-10 flex justify-between w-full p-4 border-t bg-background">
      <Link href={"/"}>
        <CgHome size={20} />
      </Link>
      <Link href={"/"}>
        <CgSearch size={20} />
      </Link>
      <Link href={"/"}>
        <CgPlayButton size={20} />
      </Link>
      <Link href={"/"}>
        <CgMail size={20} />
      </Link>
      <Link href={"/profile"}>
        <Image width={20} height={20} src={user?.profileUrl} alt="" className="object-cover w-5 h-5 rounded-full" />
      </Link>
    </footer>
  );
};
