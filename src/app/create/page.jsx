"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const CreatePage = () => {
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    const response = await axios.post("http://localhost:3333/api/posts", { description });
    if (response.status !== 200) {
      toast.error("Post nemehed aldaa garlaa!");
    } else {
      toast.success("Amjilttai post hiilee");
      router.push("/");
    }
  };

  return (
    <>
      <header className="flex justify-between p-4">
        <button onClick={() => router.back()}> &lt; </button>
        <p>New post</p>
        <button onClick={handleSubmit}>Share</button>
      </header>
      <main className="p-4">
        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          className="w-full border rounded resize-none bg-background text-foreground"
        />
      </main>
    </>
  );
};

export default CreatePage;
