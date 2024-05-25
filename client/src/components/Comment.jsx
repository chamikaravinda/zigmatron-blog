import PropTypes from "prop-types";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { editComment, toggleLike } from "../actions/comment.action";
import { Button, Textarea } from "flowbite-react";

export default function Comment(props) {
  const { currentUser } = useSelector((state) => state.user);
  const commentFromProp = props.comment;
  const [comment, setComment] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  useEffect(() => {
    setComment(commentFromProp);
  }, [commentFromProp]);

  const onClickLikeButton = async () => {
    if (!currentUser) {
      return;
    }

    const success = () => {
      let updatedComment = comment;
      const userIndex = comment.likes.indexOf(currentUser._id);

      if (userIndex === -1) {
        updatedComment.likes.push(currentUser._id);
        updatedComment = {
          ...comment,
          numberOfLikes: (updatedComment.numberOfLikes += 1),
          likes: updatedComment.likes,
        };
      } else {
        updatedComment.likes.splice(userIndex, 1);
        updatedComment = {
          ...comment,
          numberOfLikes: (updatedComment.numberOfLikes -= 1),
          likes: updatedComment.likes,
        };
      }
      setComment(updatedComment);
    };

    toggleLike(comment._id, success);
  };

  const toggleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleEdit = () => {
    const commentToUpdate = {
      ...comment,
      content: editedContent,
    };
    const success = () => {
      const editedComment = {
        ...comment,
        content: editedContent,
      };

      setIsEditing(false);
      setComment(editedComment);
    };

    editComment(commentToUpdate, success);
  };

  if (!comment.user) {
    <p>Loading comment data...</p>;
    return;
  }

  return (
    <div id={comment._id} className="p-4 border-t dark:border-gray-600">
      <div className="flex text-sm">
        <div className="flex-shrink-0 mr-3">
          <img
            className="w-10 h-10 rounded-full bg-gray-200"
            src={comment.user.profilePicture}
          />
        </div>
        <div className="flex-1">
          <div className="flex item-center mb-1">
            <span className="font-bold  mr-1 text-xs truncate">
              {comment.user.username}
            </span>
            <span className="text-gray-500 text-xs">
              {moment(comment.createdAt).fromNow()}
            </span>
          </div>
        </div>
      </div>
      {isEditing ? (
        <>
          <Textarea
            className="my-2"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <div className="flex justify-end gap-2 text-xm">
            <Button
              type="button"
              size="sm"
              gradientDuoTone="purpleToBlue"
              onClick={handleEdit}
            >
              Save
            </Button>
            <Button
              type="button"
              size="sm"
              gradientDuoTone="purpleToBlue"
              outline
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </div>
        </>
      ) : (
        <div className="flex-2">
          <p className="pb-2">{comment.content}</p>
        </div>
      )}

      <div className="flex items-center pt-2 text-xs max-w-fit gap-2">
        <button
          type="button"
          onClick={onClickLikeButton}
          className={`text-gray-400 hover:text-blue-400
            ${
              currentUser &&
              comment.likes &&
              comment.likes.includes(currentUser._id) &&
              "!text-blue-500 hover:text-gray-400"
            }`}
          title={!currentUser ? "Sign in to like" : ""}
        >
          <FaThumbsUp className="text-sm" />
        </button>
        {comment.numberOfLikes > 0 && (
          <p id={`no_of_likes_${comment._id}`}>
            &nbsp; {comment.numberOfLikes} &nbsp;{" "}
            {parseInt(comment.numberOfLikes) === 1 ? "like" : "likes"}
          </p>
        )}
        {currentUser &&
          (currentUser._id === comment.user._id ||
            currentUser.userRole === "ADMIN") && (
            <button
              type="button"
              onClick={toggleEdit}
              className="text-gray-400 hover:text-red-500"
            >
              Edit
            </button>
          )}
      </div>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};
