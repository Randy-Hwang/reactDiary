import React, { useEffect, useRef, useState } from "react";

const DiaryItem = ({
  onEdit,
  onRemove,
  author,
  content,
  emotion,
  createdAt,
  id,
}) => {
  useEffect(() => console.log(`no. ${id} rendered`));

  const handleRemove = () => {
    if (window.confirm(`Do you really want to Remove diary no.${id + 1}?`)) {
      onRemove(id);
    }
  };

  const [edit, setEdit] = useState(false);
  const toggleEdit = () => setEdit(!edit);

  const [localContent, setLocalContent] = useState(content);
  const localContentInput = useRef();

  const handleCancelEdit = () => {
    setEdit(false);
    setLocalContent(content);
  };

  const handleEdit = () => {
    if (localContent.length < 1) {
      localContentInput.current.focus();
      localContentInput.current.placeholder = "Write at least 1 letter.";
      return;
    }

    if (window.confirm(`Do you really want to edit diary no.${id + 1}?`)) {
      onEdit(id, localContent);
      toggleEdit();
    }
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span className="author_info">
          author : {author} | emotion : {emotion}
        </span>
        <br />
        <span className="date">
          Created At : {new Date(createdAt).toLocaleString()} KST{" "}
        </span>
      </div>
      <div className="content">
        {edit ? (
          <>
            <textarea
              ref={localContentInput}
              value={localContent}
              onChange={(event) => setLocalContent(event.target.value)}
            />
          </>
        ) : (
          <>{content}</>
        )}
      </div>

      {edit ? (
        <>
          <button onClick={handleCancelEdit}>Cancel Edit</button>
          <button onClick={handleEdit}>Save</button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}> Remove</button>
          <button onClick={toggleEdit}>Edit</button>
        </>
      )}
    </div>
  );
};

export default React.memo(DiaryItem);
