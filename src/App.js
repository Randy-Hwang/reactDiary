import DiaryEditor from "./DiaryEditor";
import "./App.css";
import DiaryList from "./DiaryList";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";

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

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

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

  const memoizedDispatches = useMemo(() => {
    return { onCreate, onRemove, onEdit };
  }, []);

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = diaryData.filter((it) => it.emotion >= 3).length;
    const badCount = diaryData.length - goodCount;
    const goodRatio = (goodCount / diaryData.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [diaryData.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <DiaryStateContext.Provider value={diaryData}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
          <DiaryEditor />
          <div>
            Number of good emotions : {goodCount} , Ratio : {goodRatio}%
          </div>
          <div> Number of bad emotions : {badCount} </div>
          <DiaryList />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
