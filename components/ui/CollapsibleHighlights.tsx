import { motion, AnimatePresence } from "framer-motion";

interface CollapsibleHighlightsProps {
  highlights: string[];
  theme: "default" | "winter";
  isOpen: boolean;
}

export default function CollapsibleHighlights({
  highlights,
  theme,
  isOpen,
}: CollapsibleHighlightsProps) {
  const isWinter = theme === "winter";

  return (
    <div className="mt-2 mb-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <ul className={`mt-2 space-y-3 pl-1 ${isWinter ? "text-white/60" : "text-[#57534e]"}`}>
              {highlights.map((highlight, idx) => (
                <motion.li
                  key={idx}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ x: 5, color: isWinter ? "#ffffff" : "#0d9488" }}
                  className="flex gap-3 text-sm md:text-base leading-relaxed transition-colors duration-200 group/point cursor-default"
                >
                  <span
                    className={`mt-2 shrink-0 w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      isWinter 
                        ? "bg-white/30 group-hover/point:bg-white group-hover/point:shadow-[0_0_8px_rgba(255,255,255,0.8)]" 
                        : "bg-[#0d9488]/30 group-hover/point:bg-[#0d9488]"
                    }`}
                  />
                  <span>{highlight}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
