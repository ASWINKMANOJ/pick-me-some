import { motion } from "framer-motion";

const pageTransition = (OgComponent) => {
  return (props) => (
    <>
      {/* Enter transition */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="fixed h-screen w-full top-0 left-0 bg-gray-900 z-50 origin-top"
      />

      {/* Main component content */}
      <OgComponent {...props} />

      {/* Exit transition */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="fixed h-screen w-full top-0 left-0  bg-gray-900 z-50 origin-bottom"
      />
    </>
  );
};

export default pageTransition;
