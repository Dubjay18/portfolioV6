export default function KineticHeading({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <h1 className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block opacity-0 animate-fadeUp mr-[0.28ch]"
          style={{ animationDelay: `${0.15 + i * 0.07}s` }}
        >
          {word}
        </span>
      ))}
    </h1>
  );
}
