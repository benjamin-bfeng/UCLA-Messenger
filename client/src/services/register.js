import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/register';

// returns the savedUser and the savedUser's token
const register = async registrationInfo => {
  const response = await axios.post(baseUrl, registrationInfo);
  return response.data;
};

export default { register };
