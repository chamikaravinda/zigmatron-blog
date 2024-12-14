import { Link } from "react-router-dom";
import ActionBanner from "../components/ActionBanner";
import PostCard from "../components/PostCard";
import { useEffect, useState } from "react";
import { getRecentPosts } from "../actions/post.action";
import { Button } from "flowbite-react";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const success = ({ posts }) => {
      setPosts(posts);
    };
    getRecentPosts(9, success);
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-6 lg:p-28 p-3 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold lg:text-6xl">
          Welcome to Zigma World
        </h1>
        <p className="text-gray-500 text-sm md:text-lg">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.{" "}
        </p>
        <Link to="search">
          <Button type="submit" gradientDuoTone="purpleToBlue" outline>
            View All Posts
          </Button>
        </Link>
      </div>
      <div className="bg-amber-100  dark:bg-slate-700">
        <div className="flex flex-col mx-auto p-3 max-w-6xl">
          <ActionBanner />
        </div>
      </div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flxe flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center py-8">
              Recent Posts
            </h2>
            <div className="flex flex-wrap gap-4 place-content-center place-items-center lg:grid-col-4">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <div className="py-3 md:pl-8 ">
              <Link
                to="search"
                className="text-md text-teal-500 hover:underline text-center lg:text-lg "
              >
                View All Posts
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}