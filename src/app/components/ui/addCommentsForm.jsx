import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

const AddCommentsForm = ({ users, userId, onClick }) => {
  const selectRef = useRef();
  const textareaRef = useRef();

  const [value, setValue] = useState();

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="card mb-2">
      <div className="card-body">
        <div>
          <h2>New comment</h2>
          <div className="mb-4">
            <select
              className="form-select"
              name="userId"
              value={value}
              onChange={handleChange}
              defaultValue="choice"
              ref={selectRef}
            >
              <option value="choice" disabled>
                Выберите пользователя
              </option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Сообщение
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              ref={textareaRef}
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() =>
              onClick(
                selectRef.current.value,
                userId,
                textareaRef.current.value
              )
            }
          >
            Опубликовать
          </button>
        </div>
      </div>
    </div>
  );
};

AddCommentsForm.propTypes = {
  users: PropTypes.array.isRequired,
  userId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default AddCommentsForm;
