const DiaryItem = ({ author, content, emotion, createdDate, id }) => {
  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          author : {author} | emotion : {emotion}
        </span>
        <br />
        <span className="date">
          Created At : {new Date(createdDate).toLocaleString()} KST{" "}
        </span>
      </div>
      <div className="content">{content}</div>
    </div>
  );
};

export default DiaryItem;
