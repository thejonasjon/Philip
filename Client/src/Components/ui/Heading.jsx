import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Heading({ heading, subHeading }) {
  return (
    <motion.div
      className="space-y-2 md:space-y-2.5"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.h2
        variants={item}
        className="text-3xl md:text-5xl text-[#222222]"
      >
        {heading}
      </motion.h2>

      {subHeading && (
        <motion.h5
          variants={item}
          className="text-xs font-bold text-[#0156D2]"
        >
          {subHeading.toUpperCase()}
        </motion.h5>
      )}
    </motion.div>
  );
}