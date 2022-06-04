import DiaryEditor from "./DiaryEditor";
import "./App.css";
import DiaryList from "./DiaryList";

const dummyList = [
  {
    id: 1,
    author: "duckgu",
    content: "hello world",
    emotion: 2,
    createdDate: new Date().getTime(),
  },
  {
    id: 2,
    author: "duckgu hwang",
    content: "hello javascript",
    emotion: 3,
    createdDate: new Date().getTime(),
  },
  {
    id: 3,
    author: "duckguH",
    content: "hello react",
    emotion: 5,
    createdDate: new Date().getTime(),
  },
  {
    id: 4,
    author: "Randy",
    content: "hello html",
    emotion: 1,
    createdDate: new Date().getTime(),
  },
];

function App() {
  return (
    <div className="App">
      <DiaryEditor />
      <DiaryList listOfDiary={dummyList} />
    </div>
  );
}

export default App;
