import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import imgUpload from "../../../assets/images/Modal/imgUpload.svg";
import {
  reveiewImgCreate,
  reviewImgDelete,
} from "../../../redux/modules/reviewSlice";

function ReviewImgUpload() {
  const dispatch = useDispatch();
  const [showImages, setShowImages] = useState([]);
  // 이미지 상대경로 저장
  const handleAddImages = (event) => {
    let imageUrlLists = [...showImages];
    let filelist = [];
    for (let i = 0; i < event.target.files.length; i++) {
      const currentImageUrl = window.URL.createObjectURL(event.target.files[i]); //blob url 생성
      imageUrlLists.push(currentImageUrl);
      console.log(event.target.files[i]);
      filelist[i] = event.target.files[i];
    }

    if (imageUrlLists.length > 3) {
      //최대 업로드 할 수 있는 이미지 3개로 제한
      imageUrlLists = imageUrlLists.slice(0, 3);
    }
    setShowImages(imageUrlLists);
    console.log([...filelist]);
    event.target.value = "";

    dispatch(reveiewImgCreate([...filelist]));
  };
  // const formData = new FormData();
  // console.log(formData.append("showImages", showImages.blob));
  // dispatch(reveiewImgCreate(currentImageUrl));

  //클릭하면 이미지 삭제
  const handleDeleteImage = (id) => {
    setShowImages(showImages.filter((_, index) => index !== id));
    window.URL.revokeObjectURL(showImages); //blob url 삭제
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
              onClick={() => {
                handleDeleteImage(id);
              }}
            >
              {/*이미지 누르면 삭제되도록 */}
              <Img src={image} alt={`${image}-${id}`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
const Img = styled.img`
  height: 40px;
  width: 50px;
`;
export default ReviewImgUpload;
