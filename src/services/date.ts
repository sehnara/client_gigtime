export function gettimeData(date : string){
    const time = new Date(date);
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const day = time.getDate();
    const yoil =
        time.getDay() === 1
          ? "월"
          : time.getDay() === 2
          ? "화"
          : time.getDay() === 3
          ? "수"
          : time.getDay() === 4
          ? "목"
          : time.getDay() === 5
          ? "금"
          : time.getDay() === 6
          ? "토"
          : "일";
    return {year, month, day, yoil}
}
