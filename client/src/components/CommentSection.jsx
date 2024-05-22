import { Button, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createComment, getPostComments } from "../actions/comment.action";
import PropTypes from "prop-types";
import Comment from "./Comment";

export default function CommentSection(props) {
  const { postId } = props;
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const success = (comments) => {
      setComments(comments);
    };
    getPostComments(postId, success);
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }

    const newComment = {
      content: comment,
      postId: postId,
      userId: currentUser._id,
    };

    const getPostCommentsSuccess = (comments) => {
      setComments(comments);
    };

    const createCommentSuccess = () => {
      setComment("");
      getPostComments(postId, getPostCommentsSuccess);
    };
    createComment(newComment, createCommentSuccess);
  };

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div>
          <div className="flex items-center gap-1 my-5 text-gray-500">
            <p>Signed in as :</p>
            <img
              className="h-5 w-5 object-cover rounded-full"
              src={currentUser.profilePicture}
              alt=""
            />
            <Link
              to={"/dashboard?tab=profile"}
              className="text-x5 text-cyan-500 hover:underline"
            >
              @{currentUser.username}
            </Link>
          </div>
          <form
            onSubmit={handleSubmit}
            className="border border-teal-500 rounded-md p-3"
          >
            <Textarea
              placeholder="Add a comment ..."
              rows="3"
              maxLength="200"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
            <div className="flex justify-between items-center mt-5">
              <p className="text-gray-500 text-xs">
                {200 - comment.length} characters remaining
              </p>
              <Button type="submit" outline gradientDuoTone="purpleToBlue">
                Submit
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5">
          <p>You must be Signed in to comment.</p>
          <Link className="text-blue-500 hover:underline" to={"/sign-in"}>
            Sign In
          </Link>
        </div>
      )}

      {comments.length > 0 ? (
        <>
          <div className="text-sm my-5 flex items-center gap-1">
            <p>Comments</p>
            <div className="border border-gray-400 py-1 px-2 rounded-sm">
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </>
      ) : (
        <p> No comments to show </p>
      )}
    </div>
  );
}

CommentSection.propTypes = {
  postId: PropTypes.string.isRequired,
};
