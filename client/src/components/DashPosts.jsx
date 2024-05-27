import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { deletePost, getPosts } from "../actions/post.action";
import TwoOptionModel from "./TwoOptionModel";

export default function DashPosts() {
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModel, setShowModel] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const success = (posts) => {
      setUserPosts(posts);
      if (posts && posts.length < 9) {
        setShowMore(false);
      }
    };
    if (currentUser.userRole === "ADMIN") {
      getPosts(currentUser._id, 0, success);
    }
  }, [currentUser]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    const success = (posts) => {
      setUserPosts((prev) => [...prev, ...posts]);
      if (posts && posts.length < 9) {
        setShowMore(false);
      }
    };

    getPosts(currentUser._id, startIndex, success);
  };

  const handleDeletePost = async () => {
    setShowModel(false);
    const success = () => {
      setUserPosts((prev) =>
        prev.filter((post) => post._id !== postIdToDelete)
      );
    };
    deletePost(postIdToDelete, currentUser._id, success);
  };

  return (
    <div
      className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar
     scrollbar-track-slate-100 scrollbar-thumb-slate-300
      dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500"
    >
      {currentUser.userRole === "ADMIN" && userPosts.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell className="bg-gray-200">
                Date updated
              </Table.HeadCell>
              <Table.HeadCell className="bg-gray-200">
                Post image
              </Table.HeadCell>
              <Table.HeadCell className="bg-gray-200">
                Post title
              </Table.HeadCell>
              <Table.HeadCell className="bg-gray-200">Category</Table.HeadCell>
              <Table.HeadCell className="bg-gray-200">Delete</Table.HeadCell>
              <Table.HeadCell className="bg-gray-200">
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {userPosts.map((post) => (
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={post.slug}
                >
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="2-20 h-10 object-cover bg-gray-500"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="font-medium text-gray-900 dark:text-white"
                      to={`/post/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModel(true);
                        setPostIdToDelete(post._id);
                      }}
                      className="font-medium text-red-500 hover:text-red-700"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="text-teal-500 hover:text-teal-700"
                      to={`/update-post/${post._id}`}
                    >
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show More
            </button>
          )}
          <TwoOptionModel
            showModel={showModel}
            onClose={() => {
              setShowModel(false);
            }}
            ModelMessage="Are you sure you want to delete this post"
            AcceptBtnText="Yes,I'm sure"
            CancelBtnText="No,Cancel"
            AcceptAction={handleDeletePost}
            CancelAction={() => {
              setShowModel(false);
            }}
          />
        </>
      ) : (
        <p> You have no post yet </p>
      )}
    </div>
  );
}
