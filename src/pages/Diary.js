import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

const Diary = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);

  const [data, setData] = useState();

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `Emotional Diary - Diary No.${id}`;
  }, [id]);

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetDiary) {
        setData(targetDiary);
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList, navigate]);

  if (!data) {
    return <div className="DiaryPage">LOADING . . . </div>;
  } else {
    const curEmotionData = emotionList.find(
      (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
    );
    console.log(curEmotionData);

    return (
      <div className="DiaryPage">
        <MyHeader
          headText={`Diary at ${getStringDate(new Date(data.date))}`}
          leftChild={
            <MyButton text={"< Go Back"} onClick={() => navigate(-1)} />
          }
          rightChild={
            <MyButton
              text={"Edit >"}
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
        />
        <article>
          <section>
            <h4> Emotion at that Time</h4>
            <div className="diary_img_wrapper">
              <img
                src={curEmotionData.emotion_img}
                alt={"emotion description"}
              />
              <div className="emotion_descript">
                {curEmotionData.emotion_descript}
              </div>
            </div>
          </section>
          <section>
            <h4>Diary</h4>
            <div className="diary_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Diary;
