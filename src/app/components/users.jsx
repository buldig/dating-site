import React, { useState, useEffect } from "react";
import Pagination from "./pagination";
import paginate from "../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import api from "../api";
import SearchStatus from "./searchStatus";
import UserTable from "./usersTable";
const Users = ({ users, ...rest }) => {
  const pageSize = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfession] = useState();
  const [selectedProf, setSelectedProf] = useState();
  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data));
  }, []);
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);
  const handleProffesionSelect = (item) => {
    setSelectedProf(item);
  };
  const clearFilter = () => {
    setSelectedProf(undefined);
  };
  const handleSort = (item) => {
    console.log(item);
  };
  let filteredUsers;
  if (selectedProf) {
    filteredUsers = users.filter(
      (user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf)
    );
  } else filteredUsers = users;
  const userCrop = paginate(filteredUsers, currentPage, pageSize);
  const count = filteredUsers.length;
  return (
    <div className="d-flex">
      {professions && (
        <div className="d-flex flex-column p-3">
          <GroupList
            items={professions}
            onItemSelect={handleProffesionSelect}
            selectedItem={selectedProf}
          />

          <button className="btn btn-primary mt-2" onClick={clearFilter}>
            Сбросить
          </button>
        </div>
      )}
      <div className="d-flex flex-column">
        <SearchStatus length={count} />
        {count > 0 && (
          <UserTable users={userCrop} onSort={handleSort} {...rest} />
        )}
        <div className="d-flex justify-content-center">
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

Users.propTypes = {
  users: PropTypes.array.isRequired
};

export default Users;
