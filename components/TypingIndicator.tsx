export default function TypingIndicator() {
  return (
    <div className="inline-flex gap-1 items-center py-1">
      {[0, 200, 400].map((delay, i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 bg-green rounded-full animate-typing-dot"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </div>
  )
}
