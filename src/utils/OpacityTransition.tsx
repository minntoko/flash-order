import { ReactNode } from "react";
import { easeIn, motion } from "framer-motion";

const OpacityTransition = ({ children }: { children: ReactNode }) => {
  const blackBox = {
    initial: {
      opacity: 0.5,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: easeIn,
      },
    },
  };

  return (
    <motion.div initial="initial" animate="animate" variants={blackBox}>
      {children}
    </motion.div>
  );
};

export default OpacityTransition;
