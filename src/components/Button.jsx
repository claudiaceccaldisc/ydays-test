import { motion } from "framer-motion";

const VARIANTS = {
  outline:
    "border border-bleu-confiance text-bleu-confiance bg-transparent hover:bg-bleu-confiance/5",
  primary:
    "border border-bleu-confiance bg-bleu-confiance text-ivoire shadow-[0_6px_18px_-6px_rgba(36,86,211,0.6)] hover:bg-bleu-confiance/90",
};

export default function Button({
  children,
  variant = "outline",
  className = "",
  ...props
}) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-sous-titre text-sm font-semibold transition-colors cursor-pointer sm:px-6 sm:text-base ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
