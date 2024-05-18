import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostBySlug } from "../actions/post.action";
import { Button } from "flowbite-react";
import ActionBanner from "../components/ActionBanner";

export default function PostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState();

  useEffect(() => {
    const success = (post) => {
      setPost(post);
    };
    getPostBySlug(slug, success);
  }, [slug]);

  if (!post) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-xl">Post your looking for is not present</h2>
      </div>
    );
  }

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1
        className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl 
      mx-auto lg:text-4xl"
      >
        {post.title}
      </h1>

      <Link
        to={`/search?category=${post.category}`}
        className="self-center mt-5"
      >
        <Button color="gray" pill size={"xs"}>
          {post.category}
        </Button>
      </Link>

      <img
        src={post.image}
        alt={post.title}
        className="mt-10 p-3 max-b-[600px] w-full object-cover"
      />
      <div
        className="flex justify-between p-3 border-b border-slate-500 mx-auto 
        w-full max-w-4xl text-xs"
      >
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {(post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>

      <div
        className="p-3 max-w-4xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
      <div className="max-w-4xl mx-auto w-full">
        <ActionBanner />
      </div>
    </main>
  );
}
