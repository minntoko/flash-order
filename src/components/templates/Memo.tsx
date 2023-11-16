type Props = {
    memo: string;
    setMemo: (memo: string) => void;
}

const Memo = ({memo, setMemo}: Props) => {
  return (
    <div className="flex flex-col absolute top-40 right-[-260px] w-60 h-[434px] bg-blue-50/80 backdrop-blur-xl rounded-lg p-4">
        <h2 className="text-xl text-center">メモ📝</h2>
        <textarea
            className="rounded-md h-full mt-4 outline-none p-2 resize-none text-sm bg-white/50 backdrop-blur-xl"
            placeholder="オーダーをメモ"
            onChange={(e) => setMemo(e.target.value)}
            value={memo}
        ></textarea>
    </div>
  )
}

export default Memo