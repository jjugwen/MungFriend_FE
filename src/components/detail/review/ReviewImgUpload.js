import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import imgUpload from "../../../assets/images/Modal/imgUpload.svg";
import { reveiewImgCreate } from "../../../redux/modules/reviewSlice";

function ReviewImgUpload() {
  const dispatch = useDispatch();

  const [preview, setPreview] = useState([]);
  const [image, setImage] = useState([]);

  const uploadImage = (e) => {
    let imagelist = [];
    let filelist = [];
    for (let i = 0; i < e.target.files.length; i++) {
      console.log(e.target.files[i]);
      filelist[i] = e.target.files[i];
      let reader = new FileReader(); // 이미지 미리보기!!!
      reader.readAsDataURL(e.target.files[i]);
      reader.onload = () => {
        imagelist[i] = reader.result;
        setPreview([...preview, ...imagelist]);
      };
    }
    setImage([...image, ...filelist]);
    e.target.value = "";
  };
  console.log(image);

  return (
    <div className="addPicture" style={{ display: "flex", width: "560px" }}>
      <label
        htmlFor="input-file"
        onChange={uploadImage}
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
          onClick={(e) => {
            if (preview.length >= 3) {
              e.preventDefault();
              alert("사진은 최대 3장만 올릴 수 있어요 :)");
            }
          }}
        />
      </label>

      {/* // 저장해둔 이미지들을 순회하면서 화면에 이미지 출력 */}
      <div style={{ display: "flex" }}>
        {preview &&
          preview.map((img, id) => (
            <div
              className="imageContainer"
              style={{ display: "flex" }}
              key={id}
            >
              <button
                style={{ background: "none", border: "none" }}
                onClick={() => {
                  // handleDeleteImage(id);
                  setPreview(preview.filter((value, index) => index !== id));
                  setImage(image.filter((value, index) => index !== id));
                }}
              >
                {/*이미지 누르면 삭제되도록 */}
                <Img src={img} alt={`${img}-${id}`} />
              </button>
            </div>
          ))}
        <button
          onClick={(e) => {
            if (preview.length > 3) {
              e.preventDefault();
              alert("사진은 최대 3장만 올릴 수 있어요 :)");
            }
            // dispatch(reveiewImgCreate([image]));
            dispatch(reveiewImgCreate(image));
          }}
        >
          이미지 등록
        </button>
      </div>
    </div>
  );
}
const Img = styled.img`
  height: 40px;
  width: 50px;
`;
export default ReviewImgUpload;
