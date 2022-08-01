import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { reviewImgCreate } from "../../../redux/modules/reviewSlice";

function ReviewImgUpload() {
  const dispatch = useDispatch();

  const [preview, setPreview] = useState([]);

  //이미지 없을 때 디폴트 파일 생성
  const defaulfileImg = new File([], "mungfriendDefaultImage.png", {
    type: "image/png",
    lastModified: 1658306462480,
  });

  const [image, setImage] = useState([defaulfileImg]); //디폴프 파일 기본값으로 넣기

  const uploadImage = (e) => {
    let imagelist = [];
    let filelist = [];
    for (let i = 0; i < e.target.files.length; i++) {
      // console.log(e.target.files[i]);
      filelist[i] = e.target.files[i];
      let reader = new FileReader(); // 이미지 미리보기!!!
      reader.readAsDataURL(e.target.files[i]);
      reader.onload = () => {
        imagelist[i] = reader.result;
        setPreview([...preview, ...imagelist]);
      };
    }
    setImage([...image.filter((v) => Number(v.size) !== 0), ...filelist]); //이미지 업로드 시 기본이미지(size===0) 배열에서 삭제
    e.target.value = "";
  };
  // console.log(image);

  useEffect(() => {
    // console.log(image.filter((v) => Number(v.size) !== 0));
    dispatch(reviewImgCreate(image));
  }, [dispatch, image]);

  return (
    <AddPicture>
      <ImgLabel
        htmlFor="input-file"
        onChange={uploadImage}
        style={{
          backgroundImage: `url(${process.env.REACT_APP_IMAGE_URL}/Modal/imgUpload.svg)`,
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
      </ImgLabel>

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
                  setImage(image.filter((value, index) => index !== id + 1));
                }}
              >
                {/*이미지 누르면 삭제되도록 */}
                <Img src={img} alt={`${img}-${id}`} />
              </button>
            </div>
          ))}
      </div>
    </AddPicture>
  );
}
const Img = styled.img`
  height: 40px;
  width: 50px;
  cursor: pointer;
`;

const AddPicture = styled.div`
  display: flex;
  width: 570px;
  @media ${({ theme }) => theme.device.tabletV} {
    max-width: 420px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    max-width: 300px;
  }
`;

const ImgLabel = styled.label`
  width: 104px;
  height: 40px;
  cursor: pointer;
`;
export default ReviewImgUpload;
