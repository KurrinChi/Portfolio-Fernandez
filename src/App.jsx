import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { router } from "./app/router";
import {
  BootSequenceLoader,
  shouldShowBootSequence,
} from "./components/motion/BootSequenceLoader";

function App() {
  const [bootVisible, setBootVisible] = useState(false);

  useEffect(() => {
    const shouldShow = shouldShowBootSequence();
    if (!shouldShow) {
      return;
    }

    setBootVisible(true);
    const timer = window.setTimeout(() => {
      setBootVisible(false);
    }, 1450);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        <BootSequenceLoader visible={bootVisible} />
      </AnimatePresence>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
