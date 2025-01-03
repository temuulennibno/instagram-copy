"use client";
import { redirect } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./contexts/user-context";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

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
    <ul>
      {posts.map((post) => (
        <li key={post._id}>
          <Image width={400} objectFit="contain" height={400} src={post.mediaUrl} alt="" />
          {post.description}
          <br />
          <Link className="text-blue-500" href={`/${post.user.username}`}>
            @{post.user.username}
          </Link>
        </li>
      ))}
    </ul>
  );
}
