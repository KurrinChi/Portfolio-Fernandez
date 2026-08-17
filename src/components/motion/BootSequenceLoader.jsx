import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_FLAG = "portfolio_boot_seen";

export function shouldShowBootSequence() {
  return sessionStorage.getItem(BOOT_FLAG) !== "1";
}

export function markBootSequenceSeen() {
  sessionStorage.setItem(BOOT_FLAG, "1");
}

export function BootSequenceLoader({ visible }) {
  useEffect(() => {
    if (!visible) {
      return;
    }

    markBootSequenceSeen();
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-zinc-950"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35 } }}
        >
          <div className="w-[min(92vw,640px)] space-y-5 rounded-2xl border border-cyan-400/35 bg-zinc-950/85 p-7 shadow-[0_0_45px_rgba(0,245,255,0.2)]">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-300">
              System Initialization
            </p>
            <h2 className="font-display text-3xl text-zinc-100">
              Booting Neural Interface
            </h2>
            <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-300 via-violet-400 to-pink-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.15, ease: "easeInOut" }}
              />
            </div>
            <motion.ul
              className="space-y-2 font-mono text-xs text-zinc-300"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.14 } },
              }}
            >
              {[
                "Loading motion engine...",
                "Calibrating cyber HUD...",
                "Preparing portfolio layers...",
                "Handshake complete.",
              ].map((line) => (
                <motion.li
                  key={line}
                  variants={{
                    hidden: { opacity: 0, y: 6 },
                    show: { opacity: 1, y: 0 },
                  }}
                >
                  {line}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
