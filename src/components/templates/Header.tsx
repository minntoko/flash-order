import React from 'react'

type Props = {
    reset: () => void;
}

const Header = ({reset}: Props) => {
  return (
    <header
      className="z-10 fixed drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)] top-0 w-full bg-white/80 backdrop-blur-xl text-blue-400 text-4xl py-3 pl-6"
      style={styles}
    >
      <span className="cursor-pointer" onClick={reset}>Flash Order</span>
    </header>
  )
}
const styles = {
    fontFamily: "Lilita One, cursive",
};

export default Header