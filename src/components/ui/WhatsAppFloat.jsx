import { useState, useEffect } from "react";

export default function WhatsAppFloat() {
  const [showBubble, setShowBubble] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const waLink =
    "https://api.whatsapp.com/send?phone=254707569122&text=Hi%2C+I%27m+interested+in+joining+Starhela.+Can+you+help+me+get+started%3F";

  // Show bubble automatically 2 seconds after page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBubble(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Show bubble on hover regardless of dismissed state
  const handleMouseEnter = () => {
    setHovered(true);
    setShowBubble(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    // Only hide if user has dismissed it before
    if (dismissed) {
      setShowBubble(false);
    }
  };

  const handleDismiss = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDismissed(true);
    setShowBubble(false);
  };

  const bubbleVisible = showBubble || hovered;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Speech Bubble */}
      <div
        className={`relative bg-white border border-gray-100 rounded-2xl rounded-br-sm shadow-xl px-4 py-3 max-w-[220px] transition-all duration-300 ${
          bubbleVisible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        {/* Close button — only shows on auto-pop, not needed on hover */}
        {!hovered && (
          <button
            onClick={handleDismiss}
            className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors duration-200"
            aria-label="Dismiss"
          >
            <svg
              width="8"
              height="8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#555"
              strokeWidth="3"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}

        {/* Message */}
        <div className="flex flex-col gap-1">
          <p className="text-text-primary text-sm font-semibold leading-snug">
            Need help getting started?
          </p>
          <p className="text-text-secondary text-xs leading-relaxed">
            Chat with us on WhatsApp. We reply within minutes.
          </p>
        </div>

        {/* Bubble tail */}
        <div className="absolute -bottom-2 right-4 w-0 h-0 border-l-8 border-l-transparent border-t-8 border-t-white" />
      </div>

      {/* WhatsApp Button */}
      <a
        href={waLink}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
        style={{ backgroundColor: "#25D366" }}
      >
        {/* Pulse ring */}
        <span
          className="absolute inset-0 rounded-full animate-ping opacity-30"
          style={{ backgroundColor: "#25D366" }}
        />

        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.845L0 24l6.335-1.505A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.894 0-3.666-.523-5.18-1.431l-.371-.221-3.762.894.952-3.671-.244-.387A9.937 9.937 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        </svg>
      </a>
    </div>
  );
}