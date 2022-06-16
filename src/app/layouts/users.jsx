import React, { useState, useEffect } from "react";
import Pagination from "../components/pagination";
import paginate from "../utils/paginate";
import GroupList from "../components/groupList";
import api from "../api";
import SearchStatus from "../components/searchStatus";
import UserTable from "../components/usersTable";
import _ from "lodash";
import { useParams } from "react-router-dom";
import User from "../components/user";

const Users = () => {
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfession] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });

  const [users, setUsers] = useState();
  useEffect(() => api.users.fetchAll().then((data) => setUsers(data)), []);

  const { usersId } = useParams();

  const [user, setUser] = useState();
  if (usersId) {
    api.users.getById(usersId).then((item) => setUser(item));
  }

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  const handleToggleBookMark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) {
          return { ...user, bookmark: !user.bookmark };
        }
        return user;
      })
    );
  };

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
    setSortBy(item);
  };
  if (users) {
    let filteredUsers;
    if (selectedProf) {
      filteredUsers = users.filter(
        (user) =>
          JSON.stringify(user.profession) === JSON.stringify(selectedProf)
      );
    } else filteredUsers = users;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);
    const count = filteredUsers.length;
    if (usersId && user) return <User user={user} />;
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
            <UserTable
              users={userCrop}
              onSort={handleSort}
              selectedSort={sortBy}
              onDelete={handleDelete}
              onToggleBookMark={handleToggleBookMark}
            />
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
  }
  return "loading...";
};

export default Users;