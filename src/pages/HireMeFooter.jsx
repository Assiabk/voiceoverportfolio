import React from "react";

const WhatsappSVG = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M20.52 3.48A11.94 11.94 0 0012 0C5.37 0 .04 5.33.04 12c0 2.12.55 4.18 1.6 6.01L0 24l6.24-1.63A11.94 11.94 0 0012 24c6.63 0 11.96-5.33 11.96-12 0-1.98-.45-3.86-1.44-5.52z" fill="currentColor" opacity="0.05"/>
    <path d="M17.6 14.1c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.68.15s-.78.97-.96 1.17c-.18.2-.36.22-.66.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.68-2.08-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2 0-.37-.05-.52-.05-.15-.68-1.7-.93-2.34-.24-.6-.49-.52-.68-.53l-.58-.01c-.2 0-.52.07-.8.37-.28.3-1.06 1.03-1.06 2.5 0 1.46 1.08 2.87 1.23 3.07.15.2 2.12 3.3 5.15 4.63 3.03 1.34 3.03.89 3.57.84.53-.06 1.72-.7 1.96-1.37.24-.67.24-1.24.17-1.36-.07-.12-.27-.2-.57-.35z" fill="currentColor"/>
  </svg>
);

const InstagramSVG = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.2" />
    <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.2" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor"/>
  </svg>
);

export default function HireMeFooterFixed() {
  const whatsappNumber = "+213783061469";
  const instagramLink = "https://www.instagram.com/taraavoice/";

  return (
    <footer id="hire" className="bg-black text-white px-6 py-16 relative overflow-hidden">
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-fadeInUp">
          Want to work together?
        </h2>

        <p className="text-gray-300 mb-6 max-w-xl mx-auto animate-fadeInUp" style={{ animationDelay: "120ms" }}>
          I’m available for freelance projects, collaborations, or full-time work. Let’s bring your ideas to life!
        </p>

        <div className="flex justify-center gap-4 flex-wrap animate-fadeInUp" style={{ animationDelay: "240ms" }}>
          <a
            href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-purple-700 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            <span className="text-white bg-white/0 rounded-full p-0.5">
              <WhatsappSVG className="w-5 h-5 text-white" />
            </span>
            Hire Me
          </a>

          <a
            href={instagramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white bg-gradient-to-r from-purple-700 via-pink-600 to-purple-700 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            <InstagramSVG className="w-5 h-5" />
            Instagram
          </a>
        </div>

        <p className="text-gray-500 mt-12 text-sm">© {new Date().getFullYear()} . All rights reserved.</p>
      </div>

      {/* Decorative circles */}
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-purple-800 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-pink-700 rounded-full opacity-20 translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none"></div>

      <style jsx>{`
        @keyframes fadeInUp { from { transform: translateY(12px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        .animate-fadeInUp { animation: fadeInUp 600ms cubic-bezier(.16,.84,.44,1) both; }
      `}</style>
    </footer>
  );
}
