import React, { useRef, useState } from "react";

const DiaryItem = ({
  onEdit,
  onRemove,
  author,
  content,
  emotion,
  created_date,
  id,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  // isEdit이면 수정을 하지 않는 현재상태 = false
  // setIsEdit은 수정을 하는 상태가 아니라 업데이트 되는 상태(즉, 업데이트 되지 않으면 현재상태가 되고, 업데이트 되면 업데이트 되는 내용이 현재상태가 됨)
  const toggleIsEdit = () => setIsEdit(!isEdit);
  // 토글을 하면, 수정을 하는 상태(!isEdit)로 변화해서 그게 업데이트 되는 현재상태인 setIsEdit이 !isEdit의 상태로 업데이트해서 가지고 있음
  // 그러니까 onClick을 할때마다 토글을 하면 이에 따라 변화한 상태(isEdit -> !isEdit / !isEdit->isEdit)가 setIsEdit이 됨

  const localContentInput = useRef();
  const handleRemove = () => {
    if (window.confirm(`${id} 번째 일기를 삭제 하시겠습니까?`)) {
      onRemove(id);
    }
  };
  //return이하에 함수를 넣게되면 코드가 지저분하고 길어지기 때문에 위에 handleRemove함수를 따로 만들어서 빼줌

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }
    if (window.confirm(`${id}번째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEdit();
    }
  };
  const [localContent, setLocalContent] = useState(content);
  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자: {author} | 감정점수: {emotion}
        </span>
        <br />
        <span className="date">{new Date(created_date).toLocaleString()}</span>
      </div>
      <div className="content">
        {isEdit ? (
          <>
            <textarea
              ref={localContentInput}
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
            ></textarea>
          </>
        ) : (
          <>{content}</>
        )}
      </div>
      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>취소</button>
          <button onClick={handleEdit}>저장</button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};

export default DiaryItem;
