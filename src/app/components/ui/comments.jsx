import React, { useEffect, useState } from "react";
import AddCommentsForm from "./addCommentsForm";
import CommentsList from "./commentsList";
import api from "../../api";
import PropTypes from "prop-types";

const Comments = ({ userId }) => {
  const [users, setUsers] = useState();
  const [comments, setComments] = useState();

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
    api.comments.fetchCommentsForUser(userId).then((data) => setComments(data));
  }, []);

  const handleClick = (userIdRef, userId, contentRef) => {
    api.comments
      .add({
        userId: userIdRef,
        pageId: userId,
        content: contentRef
      })
      .then((data) => setComments([...comments, data]));
  };

  const handleRemoveClick = (items, id) => {
    const updateItems = items.filter((item) => {
      if (item._id === id) api.comments.remove(item._id); // удаление из LS
      return item._id !== id;
    });
    setComments(updateItems);
  };

  if (comments && users) {
    return (
      <div className="col-md-8">
        <AddCommentsForm users={users} userId={userId} onClick={handleClick} />

        <CommentsList comments={comments} onClick={handleRemoveClick} />
      </div>
    );
  } else {
    <h2>Loading...</h2>;
  }
};

Comments.propTypes = {
  userId: PropTypes.string.isRequired
};

export default Comments;
