"use client";
import { redirect } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./contexts/user-context";
import Link from "next/link";
import axios from "axios";

export default function Home() {
  const { user } = useContext(UserContext);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3333/api/posts").then((res) => {
      setPosts(res.data);
    });
  }, []);

  if (!user) {
    return redirect("/signin");
  }

  return (
    <>
      <header className="flex justify-between p-4">
        <Link href={"/"}>Instagram</Link>
        <Link href={"/create"}>+</Link>
      </header>
      <main>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <img src={post.mediaUrl} alt="" />
              {post.description}
              <br />@{post.user.username}
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
