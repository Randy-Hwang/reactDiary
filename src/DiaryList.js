import DiaryItem from "./DiaryItem";

const DiaryList = ({ listOfDiary }) => {
  return (
    <div className="DiaryList">
      <h2>Diary List</h2>
      <h4>{listOfDiary.length}개의 일기가 저장되어 있습니다.</h4>
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
