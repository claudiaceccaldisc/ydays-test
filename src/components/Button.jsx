const VARIANTS = {
  outline:
    "border border-bleu-confiance text-bleu-confiance bg-transparent hover:bg-bleu-confiance/5",
  primary:
    "border border-bleu-confiance bg-bleu-confiance text-ivoire hover:bg-bleu-confiance/90",
};

export default function Button({
  children,
  variant = "outline",
  className = "",
  ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-2xl p-4 font-sous-titre font-semibold text-base transition-colors cursor-pointer ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
