import { useState } from 'react';
import 'antd/dist/antd.css';
import "./uploader.scss";
import { Button, Spin } from 'antd';
import axios from 'axios';

const Uploader = (props) => {

  console.log(props)
  const [image, setImage] = useState({
    image_file: "", //서버에 보낼 실제 이미지
    preview_URL: "img/default_image.png", //클라이언트에게 보여줄 이미지경로
  });
 // preview_URL은 이미지 파일을 readAsDataURL로 읽어서(base64로 인코딩한 string 데이터) 
 //img 태그에 src에 넣어서 클라이언트한테 보여주기
  const [loaded, setLoaded] = useState(false);

  let inputRef;

  const saveImage = (e) => {
    e.preventDefault();
    const fileReader = new FileReader();
    
    if(e.target.files[0]){
      setLoaded("loading")
      fileReader.readAsDataURL(e.target.files[0])
    }
    fileReader.onload = () => {
      setImage(
        {
          image_file: e.target.files[0],
          preview_URL: fileReader.result
        }
      )
      setLoaded(true);
    }
    
  }

  const deleteImage = () => {
    setImage({
      image_file: "",
      preview_URL: "img/default_image.png",
    });
    setLoaded(false);
  }

  const sendImageToServer = async () => {
    if(image.image_file){
      const formData = new FormData()
      formData.append('file', image.image_file);
      await axios.post('/api/image/upload', formData);
      alert("서버에 등록이 완료되었습니다!");
      setImage({
        image_file: "",
        preview_URL: "img/default_image.png",
      });
      setLoaded(false);
    }
    else{
      alert("사진을 등록하세요!")
    }
  }

  return (
    <div className="uploader-wrapper">
      <input type="file" accept="image/*"
        onChange={saveImage}
        // 클릭할 때 마다 file input의 value를 초기화 하지 않으면 버그가 발생할 수 있다
        // 사진 등록을 두개 띄우고 첫번째에 사진을 올리고 지우고 
        // 두번째에 같은 사진을 올리면 그 값이 남아있음!
        onClick={(e)=>e.target.value = null}
        ref={refParam => inputRef = refParam}
        style={{ display: "none" }}
      />
      <div className="img-wrapper">
        {loaded === false || loaded === true ? (
          <img src={image.preview_URL} />
        ) : (
          <Spin className="img-spinner" tip = "이미지 불러오는중"/>
        )}
      </div>

      <div className="upload-button">
        <Button type="primary" onClick={() => inputRef.click()}>
          Preview
        </Button>
        <Button type="primary" onClick={deleteImage} danger>
          Delete
        </Button>
        <Button type="ghost" onClick={sendImageToServer}>
          Upload
        </Button>
      </div>

    </div>
  );
}

export default Uploader;