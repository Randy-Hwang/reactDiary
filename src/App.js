import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

//PAGES
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import New from "./pages/New";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
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

// for the test
export default App;
