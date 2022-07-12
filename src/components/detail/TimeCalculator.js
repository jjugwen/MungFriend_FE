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
  const EndTime = data.EndTime;
  const StartTime = data.StartTime;
  // console.log(EndTime, StartTime);
  const exHourTime =
    EndTime?.split("T")[1].split(":")[0] -
    StartTime?.split("T")[1].split(":")[0] +
    "시간 ";
  // console.log(exHourTime);
  const exMinuteTime =
    EndTime?.split("T")[1].split(":")[1] -
    StartTime?.split("T")[1].split(":")[1] +
    "분";
  // console.log(exMinuteTime);

  return exHourTime + exMinuteTime;
}

export { timeForToday, betweenTime };
