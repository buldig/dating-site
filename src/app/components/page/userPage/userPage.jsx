import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import { useHistory } from "react-router-dom";
import QualititesCard from "../../ui/qualities/qualitiesCard";
import UserCard from "../../ui/userCard";
import Meetings from "../../ui/qualities/meetings";
import Comments from "../../ui/comments";

const UserPage = ({ userId }) => {
  const history = useHistory();
  const [user, setUser] = useState();

  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
  }, []);

  const handleClick = () => {
    history.push(`/users/${userId}/edit`);
  };

  if (user) {
    return (
      <>
        <div className="container">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <UserCard
                name={user.name}
                professionName={user.profession.name}
                rate={user.rate}
                onClick={handleClick}
              />

              <QualititesCard qualities={user.qualities} />
              <Meetings completedMeetings={user.completedMeetings} />
            </div>

            <Comments userId={userId} user={user} />
          </div>
        </div>
      </>
    );
  } else {
    return <h1>Loading</h1>;
  }
};

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserPage;
