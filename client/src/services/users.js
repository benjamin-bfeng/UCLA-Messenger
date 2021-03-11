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

  const textObject = (({name,role,bio}) => ({name,role,bio}))(newObject);

  console.log(newObject.file);
  if(newObject.file) {
    const fd = new FormData();
    fd.append('picture', newObject.file, id);
    axios
        .put('http://localhost:3001/api/users/image/' + id, fd,config)
        .then(response => {
          console.log(response.data);
        });
  }

  console.log(config);
  const response = await axios.put(`${baseUrl}/${id}`, textObject, config);
  console.log(response.data);
  return response.data;
};

const updateUserCourses = async (id, newArray) => {
  console.log(token);
  const config = {
    headers: {
      token: token,
    },
  };

  const newObject = {courses: newArray};
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);

  return response.data;
};

export default { getToken, setToken, getUser, updateUserData ,updateUserCourses};
