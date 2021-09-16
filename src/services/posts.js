import axios from "axios";
const apiUrl = "https://jsonplaceholder.typicode.com/";

export const getPosts = (query) => {
  let url = `${apiUrl}posts`;
  if (query) {
    url = `${url}?title=${query}`;
  }
  return axios.get(url);
};

export const addPost = (post) => {
  let url = `${apiUrl}posts`;
  return axios.post(url, post);
};

export const getComments = (id) => {
  return axios.get(`${apiUrl}posts/${id}/comments`);
};
