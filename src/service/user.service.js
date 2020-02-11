const axios = require('axios');
const BASE_URL =
  process.env.NODE_ENV !== 'development' ? '' : '//localhost:3000';

var playersDB = [];
generatePlayers();
// const API_KEY = 'AIzaSyAy0MEnLAI1gBNxTT2DBtw440qGgNzZb8c';
export default {
  query,
  getById,
  signupUser,
  updateUser,
  login,
  logout,
  getLoggedInUser
};

function logout() {
  return axios.post(`${BASE_URL}/logout`).then(() => {
    sessionStorage.removeItem('loggedInUser');
  });
}

function getLoggedInUser() {
  if (!sessionStorage.loggedInUser) return Promise.resolve('');
  return Promise.resolve(JSON.parse(sessionStorage.loggedInUser));
}

function getById(id) {
  if (id) {
    axios.get(`${BASE_URL}/player/${id}`);
    return axios.get(`${BASE_URL}/player/${id}`).then(res => res.data);
  }
}

function signupUser(user) {
  return axios.post(`${BASE_URL}/signup`, user);
}

function login({ userName, password }) {
  return axios.put(`${BASE_URL}/login`, { userName, password }).then(res => {
    sessionStorage.loggedInUser = JSON.stringify(res.data);
    return res.data;
  });
}

function updateUser(user) {
  const userId = user._id;
  return axios.put(`${BASE_URL}/player/${userId}`, user);
}

function query() {
  return Promise.resolve(playersDB);
}

function generatePlayers() {
  playersDB = [
    {
      name: 'rocki',
      password: '123',
      pic: `https://api.adorable.io/avatars/64/rocki.png`,
      partEvents: [],
      adminEventsIds: [],
      instruments: ['guitar'],
      favGenres: ['rock', 'country'],
      level: 'professional'
    },
    {
      name: 'mocki',
      password: '234',
      pic: `https://api.adorable.io/avatars/64/mocki.png`,
      partEventsIds: [],
      adminEventsIds: [],
      instruments: ['drums'],
      favGenres: ['rock'],
      level: 'amateur'
    },
    {
      name: 'bobo',
      password: '123',
      pic: `https://api.adorable.io/avatars/64/bobo.png`,
      partEventsIds: [],
      adminEventsIds: [],
      instruments: ['flute'],
      favGenres: ['french'],
      level: 'amateur'
    },
    {
      name: 'robo',
      password: '123',
      pic: `https://api.adorable.io/avatars/64/robo.png`,
      partEventsIds: [],
      adminEventsIds: [],
      instruments: ['whistler'],
      favGenres: ['irish'],
      level: 'professional'
    },
    {
      name: 'michael',
      password: '123',
      pic: `https://api.adorable.io/avatars/64/michael.png`,
      partEventsIds: [],
      adminEventsIds: [],
      instruments: ['trombone'],
      favGenres: ['folk'],
      level: 'amateur'
    },
    {
      name: 'pichael',
      password: '123',
      pic: `https://api.adorable.io/avatars/64/pichael.png`,
      partEventsIds: [],
      adminEventsIds: [],
      instruments: ['trumpet'],
      favGenres: ['jazz'],
      level: 'professional'
    },
    {
      name: 'leon',
      password: '123',
      pic: `https://api.adorable.io/avatars/64/leon.png`,
      partEventsIds: [],
      adminEventsIds: [],
      instruments: ['bass'],
      favGenres: ['rock'],
      level: 'amateur'
    }
  ];
}
// function createBook() {
//     var imgBaseUrl = 'http://coding-academy.org/users-photos/'
//     var user = {
//         id: utilService.makeId(),
//         title: utilService.makeLorem(10),
//         publishedDate: utilService.getRandomInt(1900, 2000),
//         thumbnail: imgBaseUrl + utilService.getRandomInt(1, 21) + '.jpg',
//     }
//     return user;
// }
