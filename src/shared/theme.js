// 자주 사용하는 색을 객체로 만들자.
const colors = {
  primary: {
    orange_700: "#FA5A30",
    orange_600: "#F67452",
    orange_500: "#f78d70",
    blue_700: "#4F65FF",
  },
  grayScale: {
    black: "#000000",
    grey_1: "#4E4E56",
    grey_2: "#7A7A80",
    grey_3: "#B8BBC0",
    grey_4: "#E3E5E9",
    white: "#FFFFFF",
  },
  background: {
    background_1: "#F2F3F6",
    background_2: "#FBF1E8",
  },
};
const size = {
  mobile: "767px",
  tabletV: "991px", //태블릿 세로
  tabletH: "1199px", //태블릿 가로
  desktop: "1440px", //데스크탑 일반
};

// 미디어 쿼리의 중복 코드를 줄이기위해 정의된 변수입니다
const device = {
  mobile: `only screen and (max-width: ${size.mobile})`,
  tabletV: `only screen and (min-width: ${size.mobile}) and (max-width: ${size.tabletV})`,
  tabletH: `only screen and (min-width: ${size.tabletV}) and (max-width: ${size.tabletH})`,
  desktop: `only screen and (max-width: ${size.desktop})`,
};

// 자주 사용하는 스타일 속성을 theme으로 만들어보자.
const common = {
  flexCenter: `
      display: flex;
      justify-content: center;
      align-items: center;
    `,
  flexCenterColumn: `
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `,
};

// theme 객체에 감싸서 반환한다.
const theme = {
  colors,
  common,
  device,
};

export default theme;
