import axios from "axios";

export const chatAPI = {
  loadChat: function (id) {
    // console.log("loadChat api 호출 전 마지막 id " + id);
    return axios.get(`https://hjkim-sparta.shop/api/channel/${id}/messages`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
    // return axios.get(`http://localhost:8080/api/channel/${id}/messages`, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}});
    // return instance.get("http://localhost:5001/chat");
  },
  loadChannel: function () {
    return axios.get("https://hjkim-sparta.shop/api/channels", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
    // return axios.get('http://localhost:8080/api/channels', {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}});
    // return instance.get("http://localhost:5001/channel");
  },
  createChannel: function (channel) {
    return axios.post("https://hjkim-sparta.shop/api/channel", channel, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
    // return axios.post('http://localhost:8080/api/channel', channel, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}});
    // return instance.post("http://localhost:5001/channel", channel);
  },
  deleteChannel: function (list) {
    return axios.delete(`https://hjkim-sparta.shop/api/channel/${list.id}`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
    // return axios.delete(`http://localhost:8080/api/channel/${list.id}`, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}});
    // return instance.delete(`http://localhost:5001/channel/${list.id}`);
  },
};
