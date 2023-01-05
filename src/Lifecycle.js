import React, { useEffect, useState } from "react";

const UnmountTest = () => {
  //mount를 제어하는 콜백함수가 함수 한가지를 return 하게 하면 unmount됨
  useEffect(() => {
    console.log("Mount!");

    return () => {
      //unmount 시점에 실행 됨
      console.log("Unmount!");
    };
  }, []);
  return <div>Unmount Testing Component</div>;
};

const Lifecycle = () => {
  /*  
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  //dependency array에 있는 값이 변하게 되면 call back함수가 실행됨
  useEffect(() => {
    console.log("Mount!");
  }, []);
  //update(=rerendering, 1. state가 변하거나, 2. 부모에게서 내려오는 props가 바뀌거나, 3. 부모 component의 rerendering이 되면)하는 순간을 제어하려면 dependency를 안쓰면 됨
  useEffect(() => {
    console.log("Update!");
  });

  useEffect(() => {
    console.log(`count is update: ${count}`);
    if (count > 5) {
      alert("count가 5를 넘었습니다. 1로 초기화 됩니다.");
      setCount(1);
    }
  }, [count]);
  //이 경우, count state가 변화하는 순간 콜백함수가 호출 됨

  useEffect(() => {
    console.log(`text is update: ${text}`);
  }, [text]);

  */

  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);

  return (
    <div style={{ padding: 20 }}>
      {/* <div>
        {count}
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div> */}
      <button onClick={toggle}>ON/OFF</button>
      {isVisible && <UnmountTest />}
    </div>
  );
};

export default Lifecycle;
