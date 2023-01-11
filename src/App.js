import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
/**렌더링이 일어나는 경우 */
//본인이 가진 state에 변화가 생겼거나
//부모 컴포넌트가 rerendering이 일어나거나
//자신이 받은 prop이 변경되는 경우
function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());
    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });
    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  /* 생성(추가) */
  const onCreate = useCallback((author, content, emotion) => {
    //DiaryEditor컴포넌트에 저장하기 버튼(handleSubmit)이벤트로 author, content, emotion을 받아옴
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    //새로 생성되는 건 newItem으로 추가됨
    dataId.current += 1;
    setData((data) => [newItem, ...data]);
    //최신입력 한 항목이 가장 위로 배치되도록 하기 위해 newItem부터 넣음 (참고로 ...data는 기존에 이미 저장되어 있는 것들)
  }, []);
  //onCreate useCallback의 첫번째 인자로 보낸 함수는 작성완료를 눌렀을때 데이터를 추가하는 함수가 됨
  //dependency array에 빈 배열로 두면 마운트 되는 시점에서 한번만 사용하고 그 뒤로는 만든 함수를 그대로 사용할 수 있도록 함
  //빈배열로 두면 setData안에 onCreate로 추가되기 이전의 값이 빈배열이므로 리스트를 조회하는 경우 최근 입력한 값 외에는 사라짐(그러니까, ...data의 값이 빈 값으로 들어감)
  //그래서 setState인 setData에 함수를 넣으면? 함수형 업데이트라고 함 => 항상 최신의 state를 인자를 통해 참고할 수 있게됨(이경우, deps를 비워도 됨)

  /** 삭제 */
  const onRemove = useCallback((targetId) => {
    //const newDiaryList = data.filter((it) => it.id !== targetId);
    //filter : true면 유지, false면 버림 => true요소들만 모아서 새로운 배열로 반환
    //targetId랑 같으면(false)이므로 이거는 삭제, 다르면(true)이기 때문에 이것들을 모아서 새로운 배열로 반환하고, newDiaryList에 넣음
    setData((data) => data.filter((it) => it.id !== targetId));
    //최신형 데이터를 사용하기 위해 return부분에 함수를 넣어야 함
  }, []);

  /** 수정 */
  const onEdit = useCallback((targetId, newContent) => {
    //매개변수로 받은건, 수정할 대상 그리고 어떤내용을 변경시킬것인지
    setData((data) =>
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
    //map으로 돌려서 it(data)에 id가 수정하려는 id(타겟id)와 일치한다면,
    //it객체를 전부 받아오고, 그 중 content객체의 내용은 newContent(변경시킬 내용)이 되고,
    //일치하지 않는다면, it(원래 객체에 저장된 데이터)를 반환
  }, []);

  const goodDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;

    return { goodCount, badCount, goodRatio };
  }, [data.length]);
  //useMemo는 첫번째 인자를 콜백함수(연산)로 받고, 그 안에 return되는 값을 최적화 하는 기능을 함
  //dependency array안에 값이 변화할 때만 useMemo안에 있는 연산을 수행
  const { goodCount, badCount, goodRatio } = goodDiaryAnalysis;
  //goodDiaryAnalysis는 useMemo를 호출한 것 이므로 함수가 아님 따라서 "()"를 붙이지 않고 호출
  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <div>전체일기: {data.length}</div>
      <div>기분좋은 일기 개수: {goodCount}</div>
      <div>기분나쁜 일기 개수: {badCount}</div>
      <div>기분좋은 일기 비율: {goodRatio}</div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
}

export default App;
