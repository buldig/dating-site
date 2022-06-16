import React from "react";
import PropTypes from "prop-types";
import QualitiesList from "./qualitiesList";
import { useHistory } from "react-router-dom";
const User = ({ user }) => {
  const { name, profession, qualities, completedMeetings, rate } = user;
  const history = useHistory();
  const handleReturnToUsers = (history) => {
    history.push("/users");
  };
  return (
    <>
      <h1>{name}</h1>
      <h2>{`Профессия: ${profession.name}`}</h2>
      <p>
        <QualitiesList qualities={qualities} />
      </p>
      <p>{`Completed meetings: ${completedMeetings}`}</p>
      <h3>{`Rate: ${rate}`}</h3>
      <button
        className="btn btn-primary"
        onClick={() => handleReturnToUsers(history)}
      >
        Все пользователи
      </button>
    </>
  );
};

export default User;

// import Qualitie from "./qualitie";
// import BookMark from "./bookmark";
// import PropTypes from "prop-types";

// const User = ({
//   _id,
//   name,
//   qualities,
//   profession,
//   completedMeetings,
//   rate,
//   onDelete,
//   bookmark,
//   onToggleBookMark
// }) => {
//   return (
//     <tr>
//       <td>{name}</td>
//       <td>
//         {qualities.map((qual) => (
//           <Qualitie key={qual._id} {...qual} />
//         ))}
//       </td>
//       <td>{profession.name}</td>
//       <td>{completedMeetings}</td>
//       <td>{rate} /5</td>
//       <td>
//         <BookMark status={bookmark} onClick={() => onToggleBookMark(_id)} />
//       </td>
//       <td>
//         <button onClick={() => onDelete(_id)} className="btn btn-danger">
//           delete
//         </button>
//       </td>
//     </tr>
//   );
// };

// User.propTypes = {
//   _id: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   qualities: PropTypes.array.isRequired,
//   profession: PropTypes.object.isRequired,
//   completedMeetings: PropTypes.number.isRequired,
//   rate: PropTypes.number.isRequired,
//   onDelete: PropTypes.func.isRequired,
//   bookmark: PropTypes.bool.isRequired,
//   onToggleBookMark: PropTypes.func.isRequired
// };

User.propTypes = {
  user: PropTypes.object.isRequired
};
