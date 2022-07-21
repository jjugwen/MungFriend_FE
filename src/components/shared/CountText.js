function CountText(str) {
  let result = {};

  [...str].forEach((e) => {
    if (e === " ") {
      //forEach에서의 continue
      return;
    }
    if (result[e] > 0) {
      result[e] += 1;
    } else {
      result[e] = 1; //result [e] === undefined 라면 1 할당 //default 값으로 1 할당
    }
  });
  return result;
}

export default CountText;
