import { useContext } from "react";
import { DiaryStateContext } from "./App";
import DiaryItem from "./DiaryItem";

const DiaryList = () => {
  // for the test commit
  const listOfDiary = useContext(DiaryStateContext);
  return (
    <div className="DiaryList">
      <h2>Diary List</h2>
      <h4>{listOfDiary.length} diaries are exist. </h4>
      <div>
        {listOfDiary.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

DiaryList.defaultProps = {
  listOfDiary: [],
};

export default DiaryList;
