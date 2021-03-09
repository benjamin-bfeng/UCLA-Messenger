import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/users';

let token = null;

const setToken = newToken => {
  console.log(newToken);
  token = newToken;
};

const getToken = () => {
  return token;
};

const getUser = async username => {
  const response = await axios.get(`${baseUrl}/${username}`);
  return response.data;
};

const updateUserData = async (id, newObject) => {
  console.log(token);
  const config = {
    headers: {
      token: token,
    },
  };

  console.log(config);
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  console.log(response.data);
  return response.data;
};

export default { getToken, setToken, getUser, updateUserData };
