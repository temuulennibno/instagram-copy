import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/user-context";
import axios from "axios";

export const PostCard = ({ post }) => {
  const { user, accessToken } = useContext(UserContext);
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user) {
      const myLike = likes.find((like) => {
        return like.user.username === user.username;
      });
      setLiked(Boolean(myLike));
    }
  }, [user, post]);

  const handleLike = () => {
    if (!liked) {
      axios
        .post(`http://localhost:3333/api/posts/${post._id}/likes`, null, {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        })
        .then((res) => {
          setLikes([...likes, res.data]);
          setLiked(true);
        });
    } else {
      axios
        .delete(`http://localhost:3333/api/posts/${post._id}/likes`, {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        })
        .then(() => {
          setLikes(
            likes.filter((like) => {
              return like.user.username === user.username;
            })
          );
          setLiked(false);
        });
    }
    setLiked(!liked);
  };

  return (
    <li>
      <Image width={400} objectFit="contain" height={400} src={post.mediaUrl} alt="" />
      <p>{post.description}</p>
      <div>
        {likes.length} Likes <button onClick={handleLike}>{liked ? "Liked" : "Like"}</button>
      </div>

      <br />
      <Link className="text-blue-500" href={`/${post.user.username}`}>
        @{post.user.username}
      </Link>
    </li>
  );
};
