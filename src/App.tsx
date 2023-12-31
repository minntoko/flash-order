import { SetStateAction, useState } from "react";
import Header from "./components/templates/Header";
import Memo from "./components/templates/Memo";
import Answer from "./components/templates/Answer";

const App = () => {
  const getRandInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  const [isAnswer, setIsAnser] = useState<boolean>(false);
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [isStart, setIsStart] = useState<boolean>(false);
  const [isFinish, setIsFinish] = useState<boolean>(false);
  const [sec, setSec] = useState(1);
  const [memo, setMemo] = useState("");
  const [orderNum, setOrderNum] = useState(5);
  const [orderList, setOrderList] = useState<string[]>([]);
  const [orderNames, setOrderNames] = useState<string[]>([]);
  const [food, setFood] = useState<string>("");
  const foodList = [
    "ドリア",
    "ピザ",
    "パスタ",
    "ひつまぶし",
    "カレー",
    "オムライス",
    "ハンバーガー",
    "チャーハン",
    "ラーメン",
    "うどん",
    "そば",
    "お好み焼き",
    "たこ焼き",
    "エビフライ",
  ];

  const orderFood = async () => {
    setOrderList([]);
    setIsStart(true);
    setIsFinish(false);
    const milliSecPerNumber = sec * 1000;
    for (let i = 0; i < orderNum; i++) {
      const index = getRandInt(0, foodList.length - 1);
      const order = foodList[index];
      setFood(order);
      setOrderList((prev) => [...prev, order]);
      await new Promise((resolve) => setTimeout(resolve, milliSecPerNumber));
      setFood("");
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    setIsStart(false);
    setIsFinish(true);
  };
  const handleAnswer = () => {
    setIsAnser(true);
  };

  const handleCheck = () => {
    setIsCheck(true);
    let count = 0;
    orderList.forEach((order, index) => {
      if (order === orderNames[index]) {
        count++;
      }
    });
    if (count === orderList.length) {
      window.alert("全て正解です！おめでとうございます🎊");
    } else if (count === 0) {
      window.alert("全て不正解です…頑張りましょう💪");
    } else {
      window.alert(`正解数は${count}です`);
    }
  };

  const reset = () => {
    setIsAnser(false);
    setIsCheck(false);
    setIsFinish(false);
    setMemo("");
    setOrderNames([]);
  }

  return (
    <div className="App">
      <Header reset={reset} />
      <img className="absolute top-[0px] z-0 object-cover h-full w-full" src="https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80" alt="" />
      <div className="backdrop-blur-md flex flex-col items-center pt-24 h-[100vh] bg-white/30">
        <div className="drop-shadow-md orderDispla h-32 w-[50vw] bg-blue-50/50 backdrop-blur-xl flex justify-center items-center text-3xl rounded-lg relative">
          <p className="absolute top-3 left-10 text-sm text-slate-700 font-bold">
            お客様のオーダー
          </p>
          <span className="flex justify-center items-center w-[90%] h-[60%] translate-y-3 bg-white/50 backdrop-blur-xl rounded-lg">{food}</span>
          <Memo memo={memo} setMemo={setMemo} />
        </div>
        {isAnswer ? (
          <Answer orderList={orderList} orderNames={orderNames} handleCheck={handleCheck} setOrderNames={setOrderNames} isCheck={isCheck} setIsCheck={setIsCheck} setIsAnser={setIsAnser} setIsFinish={setIsFinish} setMemo={setMemo} />
        ) : (
          <div className="drop-shadow-md orderDispla w-[50vw] mt-8 bg-white/50 backdrop-blur-xl p-10 rounded-lg">
            <div className="bg-white/50 backdrop-blur-xl p-10 rounded-md">
              <div className="w-[230px] mx-auto flex flex-col items-end">
                <div className="flex mb-8 h-6">
                  <label>
                    オーダー1つにつき
                    <input
                      className="box-border border-b-2 bg-transparent border-slate-900 text-center w-20 outline-none"
                      id="displayed-sec"
                      type="number"
                      value={sec}
                      onChange={(e) => setSec(+e.target.value)}
                    />
                  </label>
                  <p>秒</p>
                </div>
                <div className="flex">
                  <label>
                    オーダー数
                    <input
                      className="border-b-2 bg-transparent border-slate-900 text-center w-20 outline-none"
                      id="displayed-sec"
                      type="number"
                      value={orderNum}
                      onChange={(e) => setOrderNum(+e.target.value)}
                    />
                  </label>
                  <p>個</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center h-[192px]">
              <button
                className={`w-60 bg-blue-500 text-white px-4 py-2 rounded-lg mt-8 ${
                  isStart && "opacity-70"
                }`}
                onClick={() => {
                  !isStart && orderFood();
                }}
              >
                {isFinish ? "やり直す" : "ご注文お伺いします"}
              </button>
              {isFinish && (
                <button
                  className="w-60 bg-green-500 text-white px-4 py-2 rounded-lg mt-8"
                  onClick={handleAnswer}
                >
                  確認を取る
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};



export default App;
