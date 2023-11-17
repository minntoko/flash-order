import { type } from 'os';
import React from 'react'

type Props = {
    orderList: string[];
    orderNames: string[];
    handleCheck: () => void;
    setOrderNames: React.Dispatch<React.SetStateAction<string[]>>;
    isCheck: boolean;
    setIsAnser: React.Dispatch<React.SetStateAction<boolean>>;
    setIsCheck: React.Dispatch<React.SetStateAction<boolean>>;
    setIsFinish: React.Dispatch<React.SetStateAction<boolean>>;
    setMemo: React.Dispatch<React.SetStateAction<string>>;
}

const Answer = ({
    orderList,
    orderNames,
    handleCheck,
    setOrderNames,
    isCheck,
    setIsAnser,
    setIsCheck,
    setIsFinish,
    setMemo
}: Props) => {
  return (
    <div className="flex flex-col drop-shadow-md orderDispla w-[50vw] h-[434px] mt-8 bg-white/50 backdrop-blur-xl p-10 rounded-lg relative">
      <div className="bg-white/50 backdrop-blur-xl p-10 rounded-md h-[300px] relative overflow-scroll">
        <h2 className="absolute top-3 left-3">
          それではご注文を復唱させていただきます
        </h2>
        {orderList.map((order, index) => {
          return (
            <>
              <div className="mt-3 flex justify-evenly" key={index}>
                <p className="max-h-[26px]">{index + 1}品目: </p>
                <input
                  className="border-b-2 border-slate-300 outline-none max-h-[26px] bg-transparent"
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
                  {isCheck &&
                    (order === orderNames[index] ? (
                      <p className="text-green-500">
                        正解 よくできました👏
                      </p>
                    ) : (
                      <p className="text-red-500">※間違っています</p>
                    ))}
                  {isCheck && order !== orderNames[index] && (
                    <p className="text-start">正解は{order}です</p>
                  )}
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
            setIsAnser(false);
            setIsCheck(false);
            setIsFinish(false);
            setMemo("");
            setOrderNames([]);
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
  )
}

export default Answer