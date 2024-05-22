import PropTypes from "prop-types";
import moment from "moment";

export default function Comment(props) {
  const { comment } = props;

  return (
    <div className="p-4 border-b dark:border-gray-600">
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
              {comment.user.username || "Anonymous User"}
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
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};
