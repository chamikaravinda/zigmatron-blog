import { Button, Textarea } from "flowbite-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createComment } from "../actions/comment.action";
import PropTypes from "prop-types";

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");

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

    const success = () => {
      setComment("");
    };
    createComment(newComment, success);
  };

  if (!currentUser) {
    return (
      <div className="text-sm text-teal-500 my-5">
        <p>You must be Signed in to comment.</p>
        <Link className="text-blue-500 hover:underline" to={"/sign-in"}>
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser && (
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
      )}
    </div>
  );
}

CommentSection.propTypes = {
  postId: PropTypes.string.isRequired,
};
