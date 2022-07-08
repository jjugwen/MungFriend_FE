import React, { useState } from "react";
import styled from "styled-components";
import imgUpload from "../../../assets/images/Modal/imgUpload.svg";

function ReviewImgUpload() {
  const [showImages, setShowImages] = useState([]);
  // 이미지 상대경로 저장
  const handleAddImages = (event) => {
    const imageLists = event.target.files;
    let imageUrlLists = [...showImages];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = window.URL.createObjectURL(imageLists[i]); //blob url 생성
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 3) {
      //최대 업로드 할 수 있는 이미지 3개로 제한
      imageUrlLists = imageUrlLists.slice(0, 3);
    }
    setShowImages(imageUrlLists);
  };

  // X버튼 클릭 시 이미지 삭제
  const handleDeleteImage = (id) => {
    setShowImages(showImages.filter((_, index) => index !== id));
    window.URL.revokeObjectURL(showImages); //blob url 삭제
  };

  console.log(showImages);

  //이미지 전송 formdata
  const sendImg = () => {
    const formData = new FormData();
    console.log(formData.append("showImages", showImages.blob));
  };
  return (
    <div className="addPicture" style={{ display: "flex", width: "560px" }}>
      <label
        htmlFor="input-file"
        onChange={handleAddImages}
        style={{
          backgroundImage: `url(${imgUpload})`,
          width: "104px",
          height: "40px",
        }}
      >
        <input
          type="file"
          id="input-file"
          multiple
          accept="image/*"
          style={{ display: "none" }}
        />
      </label>

      {/* // 저장해둔 이미지들을 순회하면서 화면에 이미지 출력 */}
      <div style={{ display: "flex" }}>
        {showImages.map((image, id) => (
          <div className="imageContainer" style={{ display: "flex" }} key={id}>
            <button
              style={{ background: "none", border: "none" }}
              onClick={() => handleDeleteImage(id)}
            >
              <Img src={image} alt={`${image}-${id}`} />
            </button>
          </div>
        ))}
      </div>
      {/* <button onClick={sendImg}>전송</button> */}
    </div>
  );
}
const Img = styled.img`
  height: 40px;
  width: 50px;
`;
export default ReviewImgUpload;
