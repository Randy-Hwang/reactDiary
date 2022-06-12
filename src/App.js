import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

//PAGES
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import New from "./pages/New";

// COMPONENTS
import MyButton from "./components/MyButton";
import MyHeader from "./components/MyHeader";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MyHeader
          headText={"APP"}
          leftChild={
            <MyButton
              text={"left"}
              onClick={() => console.log("left clicked")}
            />
          }
          rightChild={
            <MyButton
              text={"right"}
              onClick={() => console.log("right clicked")}
            />
          }
        />

        <h2>Hi!</h2>
        {/* public 폴더로 바로 접근할 수 있게 해주는 process.env.PUBLIC_URL  */}
        {/* <img src={process.env.PUBLIC_URL + `/assets/emotion1.png`} />
        <img src={process.env.PUBLIC_URL + `/assets/emotion2.png`} />
        <img src={process.env.PUBLIC_URL + `/assets/emotion3.png`} />
        <img src={process.env.PUBLIC_URL + `/assets/emotion4.png`} />
        <img src={process.env.PUBLIC_URL + `/assets/emotion5.png`} /> */}

        <MyButton
          text={"Save"}
          onClick={() => console.log("Button clicked")}
          type={"positive"}
        />
        <MyButton
          text={"Edit"}
          onClick={() => console.log("Button clicked")}
          type={"default"}
        />
        <MyButton
          text={"Delete"}
          onClick={() => console.log("Button clicked")}
          type={"negative"}
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/diary/:id" element={<Diary />} />
          <Route path="/edit" element={<Edit />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
