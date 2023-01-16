import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);
  const onChange = (onChangeEvent) => {
    switch (onChangeEvent.target.type) {
      case "file": {
        const [file] = onChangeEvent.target.files;

        if (!file) return;

        const fileReader = new FileReader();

        fileReader.onload = (readerEvent) => {
          setValues({
            ...values,
            [onChangeEvent.target.name]: readerEvent.target.result,
          });
        };

        fileReader.readAsDataURL(file);
        break;
      }

      case "checkbox": {
        setValues({
          ...values,
          [onChangeEvent.target.name]: onChangeEvent.target.checked,
        });
        break;
      }

      default: {
        setValues({
          ...values,
          [onChangeEvent.target.name]: onChangeEvent.target.value,
        });
      }
    }
  };

  const onSubmit = (e = undefined) => {
    e?.preventDefault();
    let formData = new FormData(e?.target);

    let gender = formData.get("gender");

    if (gender) {
      callback({ gender: gender });
    } else {
      callback();
    }
  };

  const updateValues = (_values) => setValues(_values);

  return {
    onChange,
    onSubmit,
    updateValues,
    values,
  };
};

export function useUserInfo() {
  const { isAuthenticated, getIdTokenClaims } = useAuth0();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    async function getUserInfo() {
      if (isAuthenticated) {
        const claims = await getIdTokenClaims();
        setUserInfo({
          firstName: claims.given_name,
          lastName: claims.family_name,
          email: claims.email,
        });
      } else {
        setUserInfo(null);
      }
    }

    getUserInfo();
  }, [isAuthenticated, getIdTokenClaims]);

  return userInfo;
}
