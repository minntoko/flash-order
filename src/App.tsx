import { SetStateAction, useState } from "react";

const App = () => {
  const getRandInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  const [isAnswer, setIsAnser] = useState<boolean>(false);
  const [isCheck, setIsCheck] = useState<boolean>(false);
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
  ];

  const orderFood = async () => {
    setOrderList([]);
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
    }
    )
    if(count === orderList.length) {
      window.alert("全て正解です！おめでとうございます🎊")
    } else if (count === 0) {
      window.alert("全て不正解です…頑張りましょう💪")
    } else {
      window.alert(`正解数は${count}です`)
    }
  };

  return (
    <div className="App">
      <header
        className="z-10 fixed drop-shadow-sm top-0 w-full bg-white text-blue-400 text-4xl py-3 pl-6"
        style={styles}
      >
        Flash Order
      </header>
      <div className="flex flex-col items-center pt-24 h-[100vh] bg-[#f9f9f9]">
        <div className="drop-shadow-md orderDispla h-32 w-[50vw] bg-blue-50 flex justify-center items-center text-3xl rounded-lg relative">
          <p className="absolute top-5 left-5 text-sm text-slate-700 font-bold">
            お客様のオーダー
          </p>
          {food}
          <div className="flex flex-col absolute top-40 right-[-260px] w-60 h-[434px] bg-blue-50 rounded-lg p-4">
            <h2 className="text-xl text-center">メモ📝</h2>
            <textarea
              className="rounded-md h-full mt-4 outline-none p-2 resize-none text-sm"
              placeholder="オーダーをメモ"
              onChange={(e) => setMemo(e.target.value)}
              value={memo}
            ></textarea>
          </div>
        </div>
        {isAnswer ? (
          <div className="flex flex-col drop-shadow-md orderDispla w-[50vw] h-[434px] mt-8 bg-yellow-100 p-10 rounded-lg relative">
            <div className="bg-white p-10 rounded-md h-[300px] relative overflow-scroll">
              <h2 className="absolute top-3 left-3">
                それではご注文を復唱させていただきます
              </h2>
              {orderList.map((order, index) => {
                return (
                  <>
                    <div className="mt-3 flex justify-evenly" key={index}>
                    <p className="max-h-[26px]">{index + 1}品目:{" "}</p>
                      <input
                        className="border-b-2 border-slate-300 outline-none max-h-[26px]"
                        type="text"
                        value={orderNames[index]}
                        onChange={(e) => {
                          const updatedNames = [...orderNames];
                          updatedNames[index] = e.target.value;
                          setOrderNames(updatedNames);
                        }}
                      />
                      <p className="max-h-[26px]">がお一つ</p>
                      <div className="w-[180px]">
                        {isCheck && (order === orderNames[index] ? ( <p className="text-green-500">正解 よくできました👏</p> ) : ( <p className="text-red-500">※間違っています</p>))}
                        {isCheck && (order !== orderNames[index] && ( <p className="text-start">正解は{order}です</p>))}
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
            <div className="flex">
              <button
                className="w-60 mx-auto bg-blue-500 text-white px-4 py-2 rounded-lg mt-8"
                onClick={() => {
                  setIsAnser(false)
                  setIsCheck(false)
                  setIsFinish(false)
                  setMemo("")
                  setOrderNames([])
                }}
              >
                トップへ
              </button>
              <button
                className="w-60 mx-auto bg-green-500 text-white px-4 py-2 rounded-lg mt-8"
                onClick={handleCheck}
              >
                以上でよろしいでしょうか
              </button>
            </div>
          </div>
        ) : (
          <div className="drop-shadow-md orderDispla w-[50vw] mt-8 bg-yellow-100 p-10 rounded-lg">
            <div className="bg-white p-10 rounded-md">
              <div className="w-[230px] mx-auto flex flex-col items-end">
                <div className="flex mb-8 h-6">
                  <label>
                    オーダー1つにつき
                    <input
                      className="box-border border-b-2 border-slate-900 text-center w-20 outline-none"
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
                      className="border-b-2 border-slate-900 text-center w-20 outline-none"
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
            <div className="flex flex-col items-center h-[192px]">
              <button
                className="w-60 bg-blue-500 text-white px-4 py-2 rounded-lg mt-16"
                onClick={orderFood}
              >
                スタート
              </button>
              {isFinish && (<button
                className="w-60 bg-green-500 text-white px-4 py-2 rounded-lg mt-8"
                onClick={handleAnswer}
              >
                回答する
              </button>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  fontFamily: "Lilita One, cursive",
};

export default App;
