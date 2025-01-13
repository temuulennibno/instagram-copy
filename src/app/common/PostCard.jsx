import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/user-context";
import axios from "axios";

export const PostCard = ({ post }) => {
  const { user, accessToken } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const [liked, setLiked] = useState(false);
  const [commentsShown, setCommentsShown] = useState(false);

  useEffect(() => {
    if (user) {
      const myLike = likes.find((like) => {
        return like.user.username === user.username;
      });
      setLiked(Boolean(myLike));
    }
  }, [user, post]);

  const handleLike = () => {
    setLoading(true);
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
          setLoading(false);
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
          setLoading(false);
        });
    }
    setLiked(!liked);
  };

  const handleComment = async (comment) => {
    if (comment.length > 0) {
      setLoading(true);
      axios
        .post(
          `http://localhost:3333/api/posts/${post._id}/comments`,
          {
            comment,
          },
          {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          }
        )
        .then((res) => {
          setComments([
            ...comments,
            {
              ...res.data,
              user: {
                username: user.username,
              },
            },
          ]);
          setLoading(false);
        });
    }
  };

  return (
    <li>
      <Link className="text-blue-500" href={`/${post.user.username}`}>
        @{post.user.username}
      </Link>
      <Image width={400} objectFit="contain" height={400} src={post.mediaUrl} alt="" />
      <div>
        {likes.length} Likes{" "}
        <button disabled={loading} onClick={handleLike} className="disabled:opacity-50">
          {liked ? "Liked" : "Like"}
        </button>
      </div>
      <p>{post.description}</p>

      {!commentsShown && (
        <p
          onClick={() => {
            setCommentsShown(true);
          }}
        >
          Show comments...
        </p>
      )}
      {commentsShown && (
        <>
          <ul>
            {comments.map((comment) => (
              <li key={comment._id}>
                {comment.user.username}: {comment.comment}
              </li>
            ))}
          </ul>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const comment = e.target.comment.value;
              await handleComment(comment);
              e.target.comment.value = "";
            }}
          >
            <input
              disabled={loading}
              name="comment"
              className="w-full border-b bg-background text-foreground"
              placeholder="Write comment"
              type="text"
            />
          </form>
        </>
      )}
    </li>
  );
};
