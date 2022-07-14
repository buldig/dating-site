import React from "react";
import Comment from "./comment";
import PropTypes from "prop-types";

const CommentsList = ({ comments, onClick }) => {
  return (
    <>
      <div className="card mb-3">
        <div className="card-body ">
          <h2>Comments</h2>
          <hr />
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              userId={comment.userId}
              content={comment.content}
              date={comment.created_at}
              onClick={onClick}
              comments={comments}
              id={comment._id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

CommentsList.propTypes = {
  comments: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
};

export default CommentsList;
