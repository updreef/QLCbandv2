export default function SquiggleUnderline({ className = "" }: { className?: string }) {
  return (
    <div className={`w-36 h-3 mt-2 relative ${className}`}>
      <svg 
        viewBox="0 0 100 10" 
        preserveAspectRatio="none" 
        className="w-full h-full text-brand-red fill-none stroke-brand-red"
        style={{ strokeWidth: 4, strokeLinecap: "round" }}
      >
        <path d="M0,5 Q12.5,0 25,5 T50,5 T75,5 T100,5" />
      </svg>
    </div>
  );
}
