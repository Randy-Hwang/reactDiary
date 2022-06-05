import DiaryItem from "./DiaryItem";

const DiaryList = ({ onEdit, onRemove, listOfDiary }) => {
  return (
    <div className="DiaryList">
      <h2>Diary List</h2>
      <h4>{listOfDiary.length} diaries are exist. </h4>
      <div>
        {listOfDiary.map((item) => (
          <DiaryItem
            key={item.id}
            {...item}
            onRemove={onRemove}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
};

DiaryList.defaultProps = {
  listOfDiary: [],
};

export default DiaryList;
