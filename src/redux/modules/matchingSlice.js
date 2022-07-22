import instance from "./instance";

//axios
//create 매칭하기
export const createMatchingDB = (id, postId) => {
  return async function () {
    try {
      const response = await instance.post(`/api/match/${id}`, {
        postId: postId,
      });
      if (response.data.staus === "true") {
        console.log(response.data.status, response.data.message);
      } else if (response.data.staus === "false") {
        console.log(response.data.status, response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
};

//delete - 매칭 취소
export const deleteMatchingDB = (postId) => {
  return async function () {
    try {
      const response = await instance.post(`/api/match/cancel`, {
        postId: postId,
      });
      console.log(response.data.status, response.data.message);
    } catch (error) {
      console.error(error);
    }
  };
};

export const actionCreators = { createMatchingDB, deleteMatchingDB };
