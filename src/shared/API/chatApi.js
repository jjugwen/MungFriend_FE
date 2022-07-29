import axios from "axios";

export const chatAPI = {
  loadChat: function (id) {
    // const aa = `${process.env.REACT_APP_API_URL}/api/channel/${id}/messages`;
    // console.log("loadChat api 호출 전 마지막 id " + id);
    return axios.get(
      `${process.env.REACT_APP_API_URL}/api/channel/${id}/messages`,
      {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
      }
    );
    // return axios.get(`http://localhost:8080/api/channel/${id}/messages`, {headers: {Authorization: 'Bearer ' + sessionStorage.getItem('token')}});
    // return instance.get("http://localhost:5001/chat");
  },
  loadChannel: function () {
    return axios.get(`${process.env.REACT_APP_API_URL}/api/channels`, {
      headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
    });
    // return axios.get('http://localhost:8080/api/channels', {headers: {Authorization: 'Bearer ' + sessionStorage.getItem('token')}});
    // return instance.get("http://localhost:5001/channel");
  },
  createChannel: function (channel) {
    return axios.post(`${process.env.REACT_APP_API_URL}/api/channel`, channel, {
      headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
    });
    // return axios.post('http://localhost:8080/api/channel', channel, {headers: {Authorization: 'Bearer ' + sessionStorage.getItem('token')}});
    // return instance.post("http://localhost:5001/channel", channel);
  },
  deleteChannel: function (list) {
    return axios.delete(
      `${process.env.REACT_APP_API_URL}/api/channel/${list.id}`,
      {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
      }
    );
    // return axios.delete(`http://localhost:8080/api/channel/${list.id}`, {headers: {Authorization: 'Bearer ' + sessionStorage.getItem('token')}});
    // return instance.delete(`http://localhost:5001/channel/${list.id}`);
  },
};
