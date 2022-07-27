function timeForToday(value) {
  const today = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  );
  if (betweenTime < 1) return "방금전";
  if (betweenTime < 60) {
    return `${betweenTime}분 전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간 전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay}일 전`;
  }

  return `${Math.floor(betweenTimeDay / 365)}년 전`;
}

function betweenTime(data) {
  // console.log(data);
  const EndTime = new Date(data.EndTime).getTime();
  const StartTime = new Date(data.StartTime).getTime();
  const gapTime = Math.floor((EndTime - StartTime) / 1000 / 60);
  const betweenTimeHour = Math.floor(gapTime / 60);

  const exMinuteTime = () => {
    if (gapTime < 60) {
      return `${gapTime}분`;
    } else if (gapTime > 60) {
      return `${gapTime - betweenTimeHour * 60}분`;
    }
    return "";
  };
  const exHourTime = () => {
    if (betweenTimeHour < 24 && betweenTimeHour !== 0) {
      return `${betweenTimeHour}시간`;
    } else if (betweenTimeHour === 0) {
      return "";
    }
  };

  return exHourTime() + exMinuteTime();
}

export { timeForToday, betweenTime };
