const axios = require('axios');

const BASE_URL =
  process.env.NODE_ENV !== 'development' ? '/api' : '//localhost:3000/api';
var eventsDB = [];
export default {
  query,
  getEventById,
  saveEvent,
  remove,
  getImage
};

function query(filter = null, sort = null) {
  var urlEnd = '/event'
  if (filter) {
    urlEnd += `?genre=${filter.byGenre}&instrument=${filter.byInstrument}
                &name=${filter.byName}&status=${filter.byStatus}`
    if (sort) {
      urlEnd += `&sortBy=${sort.sorter}&order=${sort.order}`
    }  
  }
  if (!filter && sort) {
    urlEnd += `?sortBy=${sort.sorter}&order=${sort.order}`
  }
  return axios.get(BASE_URL + urlEnd)
    .then(res => res.data);
}

function getEventById(eventId) {
  return axios.get(`${BASE_URL}/event/${eventId}`)
    .then(res => res.data);
}

function remove(eventId) {
  return axios.delete(`${BASE_URL}/event/${eventId}`);
}

function saveEvent(event) {
  if (event._id) {
    return axios.put(`${BASE_URL}/event/${event._id}`, event);
  } else {
    return axios.post(`${BASE_URL}/event`, event);
  }
}

function getImage(){
  var randNum = getRandomIntInclusive(1,20)
  return   `/img/previews/${randNum}.jpg`
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}