import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import React, { useRef, useState } from "react";

// const dummyList = [
//   {
//     id: 1,
//     author: "author 1",
//     content: "content 1",
//     emotion: 1,
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 2,
//     author: "author 2",
//     content: "content 2",
//     emotion: 2,
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 3,
//     author: "author 3",
//     content: "content 3",
//     emotion: 3,
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 4,
//     author: "author 4",
//     content: "content 4",
//     emotion: 4,
//     created_date: new Date().getTime(),
//   },
// ];

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  //DiaryEditor.js에서 매개변수를 받아옴 -> 이벤트의 형태일까?
  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  };

  const onRemove = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다.`);
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList);
  };

  const onEdit = (targetId, newContent) => {
    //매개변수로 받은건, 수정할 대상 그리고 어떤내용을 변경시킬것인지
    setData(
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
    //map으로 돌려서 it(data)에 id가 수정하려는 id(타겟id)와 일치한다면,
    //it객체를 전부 받아오고, 그 중 content객체의 내용은 newContent(변경시킬 내용)이 되고,
    //일치하지 않는다면, it(원래 객체에 저장된 데이터)를 반환
  };
  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
}

export default App;
