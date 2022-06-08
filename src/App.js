import DiaryEditor from "./DiaryEditor";
import "./App.css";
import DiaryList from "./DiaryList";
import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case `INIT`: {
      return action.diaryData;
    }
    case `CREATE`: {
      const createdAt = new Date().getTime();
      const newItem = {
        ...action.diaryData,
        createdAt,
      };
      return [newItem, ...state];
    }
    case `REMOVE`: {
      return state.filter((it) => it.id !== action.targetId);
    }
    case `EDIT`: {
      return state.map((it) =>
        it.id === action.targetId ? { ...it, content: action.newContent } : it
      );
    }
    default:
      return state;
  }
};

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
    dispatch({ type: `INIT`, diaryData: initData });
  };

  useEffect(() => {
    getData();
  }, []);

  const [diaryData, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);
  // DiaryEditor가 일기를 수정하는 setDiaryData 이벤트를 onCreate를 통해 발생시키면,
  // App 컴포넌트에서 diaryData를 DiaryList컴포넌트에 내려주어 diaryData 배열에 변화를 일으킴
  const onCreate = useCallback((author, content, emotion) => {
    dispatch({
      type: `CREATE`,
      diaryData: { author, content, emotion, id: dataId.current },
    });
    dataId.current += 1;
  }, []);

  const onRemove = useCallback((targetId) => {
    dispatch({ type: `REMOVE`, targetId });
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: `EDIT`, targetId, newContent });
  }, []);

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
