import { useRef, useState } from "react";

const DiaryEditor = ({ onCreate }) => {
  const authorInput = useRef();

  const contentInput = useRef();

  const [text, setText] = useState({
    author: "",
    content: "",
    emotion: 1,
  });

  const handleChangeText = (event) => {
    setText({
      ...text,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    if (text.author.length < 1) {
      authorInput.current.focus();
      authorInput.current.placeholder = "Write at least 1 letter.";
      return;
    }
    if (text.content.length < 1) {
      contentInput.current.focus();
      contentInput.current.placeholder = "Write at least 1 letter.";
      return;
    }

    onCreate(text.author, text.content, text.emotion);
    setText({
      author: "",
      content: "",
      emotion: 1,
    });
  };

  return (
    <div className="DiaryEditor">
      <h2>Today's Diary</h2>

      <div>
        <input
          ref={authorInput}
          name="author"
          value={text.author}
          onChange={handleChangeText}
          placeholder="Write Your Name"
        />
      </div>

      <div>
        <textarea
          ref={contentInput}
          name="content"
          value={text.content}
          onChange={handleChangeText}
          placeholder="Write Your Diary"
        />
      </div>

      <div>
        <span>Today's Emotion Score : </span>
        <select name="emotion" value={text.emotion} onChange={handleChangeText}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>

      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default DiaryEditor;
