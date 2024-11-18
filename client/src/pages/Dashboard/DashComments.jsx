import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table } from "flowbite-react";
import { getComments, deleteComment } from "../../actions/comment.action";
import TwoOptionModel from "../../components/TwoOptionModel";

export default function DashComments() {
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModel, setShowModel] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState("");

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const success = (data) => {
      setComments(data.comments);
      if (data.comments.length < 9) {
        setShowMore(false);
      }
    };
    if (currentUser.userRole === "ADMIN") {
      getComments(0, success);
    }
  }, [currentUser]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    const success = (data) => {
      setComments((prev) => [...prev, ...data.comments]);
      if (data.comments.length < 9) {
        setShowMore(false);
      }
    };
    if (currentUser.userRole === "ADMIN") {
      getComments(startIndex, success);
    }
  };

  const handleDeleteComment = async () => {
    setShowModel(false);
    const success = () => {
      setComments((prev) => prev.filter((comment) => comment._id !== commentIdToDelete));
    };
    await deleteComment(commentIdToDelete, success);
  };

  return (
    <div
      className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar
     scrollbar-track-slate-100 scrollbar-thumb-slate-300
      dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500"
    >
      {currentUser.userRole === "ADMIN" && comments.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell className="bg-gray-200">
                Date created
              </Table.HeadCell>
              <Table.HeadCell className="bg-gray-200">
                Comment content
              </Table.HeadCell>
              <Table.HeadCell className="bg-gray-200">Number of likes</Table.HeadCell>
              <Table.HeadCell className="bg-gray-200">Post</Table.HeadCell>
              <Table.HeadCell className="bg-gray-200">User</Table.HeadCell>
              <Table.HeadCell className="bg-gray-200">Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {comments.map((comment) => (
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={comment._id}
                >
                  <Table.Cell>
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    {comment.content}
                  </Table.Cell>
                  <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  <Table.Cell>{comment.post.title}</Table.Cell>
                  <Table.Cell>{comment.user.username}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModel(true);
                        setCommentIdToDelete(comment._id);
                      }}
                      className="font-medium text-red-500 hover:text-red-700"
                    >
                      Delete
                    </span>
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
            ModelMessage="Are you sure you want to delete this user"
            AcceptBtnText="Yes,I'm sure"
            CancelBtnText="No,Cancel"
            AcceptAction={handleDeleteComment}
            CancelAction={() => {
              setShowModel(false);
            }}
          />
        </>
      ) : (
        <p> You have no comments yet </p>
      )}
    </div>
  );
}
