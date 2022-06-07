import DiaryEditor from "./DiaryEditor";
import "./App.css";
import DiaryList from "./DiaryList";
import { useEffect, useMemo, useRef, useState } from "react";

function App() {
  const getData = async () => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments`
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        createdAt: new Date().getTime(),
        id: dataId.current++,
      };
    });
    setDiaryData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  // App을 0단계, 자식 컴포넌트인 DiaryList와 DiaryEditor는 1단계라고 했을 때
  // 같은 단계에서는 데이터를 주고받을 수 없다
  // 따라서 부모 컴포넌트에 공통된 State를 만들고
  const [diaryData, setDiaryData] = useState([]);

  const dataId = useRef(0);
  // DiaryEditor가 일기를 수정하는 setDiaryData 이벤트를 onCreate를 통해 발생시키면,
  // App 컴포넌트에서 diaryData를 DiaryList컴포넌트에 내려주어 diaryData 배열에 변화를 일으킴
  const onCreate = (author, content, emotion) => {
    const createdAt = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      createdAt,
      id: dataId.current,
    };
    dataId.current += 1;
    setDiaryData([newItem, ...diaryData]);
  };

  const onRemove = (targetId) => {
    const newDiaryList = diaryData.filter((it) => it.id !== targetId);
    setDiaryData(newDiaryList);
  };

  const onEdit = (targetId, newContent) => {
    setDiaryData(
      diaryData.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = diaryData.filter((it) => it.emotion >= 3).length;
    const badCount = diaryData.length - goodCount;
    const goodRatio = (goodCount / diaryData.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [diaryData.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <div>
        Number of good emotions : {goodCount} , Ratio : {goodRatio}%
      </div>
      <div> Number of bad emotions : {badCount} </div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} listOfDiary={diaryData} />
    </div>
  );
}

export default App;
