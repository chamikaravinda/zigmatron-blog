import PropTypes from "prop-types";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { toggleLike } from "../actions/comment.action";

export default function Comment(props) {
  const { currentUser } = useSelector((state) => state.user);
  const commentFromProp = props.comment;
  const [comment, setComment] = useState({});

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

  if (!comment.user) {
    <p>Loading comment data...</p>;
    return;
  }

  return (
    <div id={comment._id} className="p-4 border-b dark:border-gray-600">
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
      <div className="flex-2">
        <p className="pb-2">{comment.content}</p>
      </div>
      <div className="flex items-center">
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
      </div>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};
