import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import api from "../../../api";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const UserEditPage = ({ userId }) => {
  const history = useHistory();
  const [data, setData] = useState({
    name: "",
    email: "",
    profession: "",
    sex: "male",
    qualities: []
  });
  const [qualities, setQualitites] = useState({});
  const [errors, setErrors] = useState({});
  const [professions, setProfession] = useState();
  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      setProfession(data);
    });

    api.qualities.fetchAll().then((data) => {
      setQualitites(data);
    });
  }, []);

  const handleChange = (target) => {
    setData((prevState) => {
      console.log(target);
      return { ...prevState, [target.name]: target.value };
    });
  };

  const validatorConfig = {
    email: {
      isRequired: { message: "Электронная почта обязательна для заполнения" },
      isEmail: {
        message: "Email введен некорректно"
      }
    },
    password: {
      isRequired: { message: "Пароль обязателен для заполнения" },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотя бы одну заглавную букву"
      },
      isContainDigit: {
        message: "Пароль должен содержать хотя бы одно число"
      },
      min: {
        message: "Пароль должен состоясть минимум из 8 символов",
        value: 8
      }
    },
    profession: {
      isRequired: { message: "Обязательно выберите вашу профессию" }
    },
    licence: {
      isRequired: {
        message:
          "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
      }
    },
    name: {
      isRequired: {
        message: "Обязательно укажите имя"
      }
    }
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdate = (id, rest) => {
    console.log(rest);
    api.users.getById(id).then((data) => {
      api.users.update(id, { ...data, ...rest });
    });
    history.push(`/users/${userId}`);
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();

    if (!isValid) return;

    console.log(data);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <form onSubmit={handleSubmit}>
            <TextField
              label="Имя"
              name="name"
              value={data.name}
              onChange={handleChange}
              error={errors.name}
            />
            <TextField
              label="Электронная почта"
              name="email"
              value={data.email}
              onChange={handleChange}
              error={errors.email}
            />

            <SelectField
              label="Выберите вашу профессию"
              value={data.profession}
              onChange={handleChange}
              defaultOption={"Choose..."}
              name="profession"
              options={professions}
              error={errors.profession}
            />
            <RadioField
              options={[
                { name: "Male", value: "male" },
                { name: "Female", value: "female" },
                { name: "Other", value: "other" }
              ]}
              value={data.sex}
              name={"sex"}
              onChange={handleChange}
              label="Выберите ваш пол"
            />
            <MultiSelectField
              options={qualities}
              onChange={handleChange}
              name="qualities"
              label="Выберите ваши качества"
            />

            <button
              type="button"
              disabled={!isValid}
              onClick={() => handleUpdate(userId, data)}
              className="btn btn-primary w-100 mx-auto"
            >
              Обновить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

UserEditPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserEditPage;
