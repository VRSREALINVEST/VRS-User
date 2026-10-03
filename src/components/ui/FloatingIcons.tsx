// "use client";

// import { useState } from "react";
// import { Calendar, MessageCircle, Mail, X } from "lucide-react";

// export default function FloatingAssistant() {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="fixed bottom-6 right-6 z-[999]">

//       {/* ================= CHAT PANEL ================= */}
//       <div
//         className={`absolute bottom-16 right-0 w-[300px] rounded-2xl 
//         bg-[var(--card-bg)] border border-[var(--card-border)]
//         shadow-[0_20px_60px_rgba(0,0,0,0.7)]
//         backdrop-blur-xl overflow-hidden
//         transition-all duration-300
//         ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 pointer-events-none"}
//         `}
//       >

//         {/* HEADER */}
//         <div className="px-4 py-3 border-b border-[var(--card-border)] flex items-center justify-between">
//           <div>
//             <p className="text-sm text-white font-medium">
//               VRS Assistant
//             </p>
//             <p className="text-[10px] text-gray-400">
//               How can we help you?
//             </p>
//           </div>

//           <button onClick={() => setOpen(false)}>
//             <X size={16} className="text-gray-400 hover:text-white" />
//           </button>
//         </div>

//         {/* MESSAGE */}
//         <div className="px-4 py-4 space-y-3 text-sm">

//           <div className="bg-white/5 border border-[var(--card-border)] rounded-xl p-3">
//             👋 Welcome! Choose an option below to get started.
//           </div>

//           {/* ACTIONS */}
//           <div className="space-y-2">

//             <a
//               href="https://calendly.com/sudesh-vrsrealinvest/one-on-one-session"
//               target="_blank"
//               className="flex items-center gap-3 p-3 rounded-lg bg-black/30 hover:bg-black/50 transition"
//             >
//               <Calendar size={16} className="text-[var(--primary-gold)]" />
//               <span>Book Consultation</span>
//             </a>

//             <a
//               href="https://wa.me/61412864050"
//               target="_blank"
//               className="flex items-center gap-3 p-3 rounded-lg bg-black/30 hover:bg-black/50 transition"
//             >
//               <MessageCircle size={16} className="text-[var(--primary-gold)]" />
//               <span>Chat on WhatsApp</span>
//             </a>

//             <a
//               href="/contact"
//               className="flex items-center gap-3 p-3 rounded-lg bg-black/30 hover:bg-black/50 transition"
//             >
//               <Mail size={16} className="text-[var(--primary-gold)]" />
//               <span>Send Enquiry</span>
//             </a>

//           </div>
//         </div>
//       </div>

//       {/* ================= FLOATING BUTTON ================= */}
//       <button
//         onClick={() => setOpen(!open)}
//         className="relative w-14 h-14 rounded-full flex items-center justify-center
//         bg-[var(--primary-gold)] text-[#221F1F]
//         shadow-[0_12px_30px_rgba(231,200,156,0.35)]
//         transition duration-300 hover:scale-105"
//       >

//         {/* icon */}
//         <div className="text-xl">
//           {open ? "×" : "💬"}
//         </div>

//         {/* pulse glow */}
//         <span className="absolute inset-0 rounded-full bg-[var(--primary-gold)]/30 blur-lg animate-pulse" />
//       </button>

//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { Calendar, MessageCircle, Mail, X } from "lucide-react";

export default function FloatingAssistant() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[999]">

      <div
        className={`absolute bottom-16 right-0 w-[300px] rounded-2xl 
        bg-[var(--card-bg)] border border-[var(--card-border)]
        shadow-[0_20px_60px_rgba(0,0,0,0.7)]
        backdrop-blur-xl overflow-hidden
        transition-all duration-300
        ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 pointer-events-none"}`}
      >
        <div className="px-4 py-3 border-b border-[var(--card-border)] flex justify-between">
          <div>
            <p className="text-sm text-white">VRS Assistant</p>
            <p className="text-[10px] text-gray-400">How can we help you?</p>
          </div>

          <button onClick={() => setOpen(false)}>
            <X size={16} className="text-gray-400 hover:text-white" />
          </button>
        </div>

        <div className="px-4 py-4 space-y-3 text-sm">
          <div className="bg-white/5 border border-[var(--card-border)] rounded-xl p-3">
            👋 Welcome! Choose an option below.
          </div>

          <a href="https://calendly.com/sudesh-vrsrealinvest/one-on-one-session" className="flex gap-3 p-3 rounded-lg bg-black/30 hover:bg-black/50">
            <Calendar size={16} />
            Book Consultation
          </a>

          <a href="https://wa.me/61412864050" target="_blank" rel="noopener noreferrer" className="flex gap-3 p-3 rounded-lg bg-black/30 hover:bg-black/50">
            <MessageCircle size={16} />
            WhatsApp
          </a>

          <a href="/contact" className="flex gap-3 p-3 rounded-lg bg-black/30 hover:bg-black/50">
            <Mail size={16} />
            Enquiry
          </a>
        </div>
      </div>

      <button
        onClick={() => setOpen(!open)}
        className="relative w-14 h-14 rounded-full flex items-center justify-center
        bg-[var(--primary-gold)] text-[#221F1F]
        shadow-[0_12px_30px_rgba(231,200,156,0.35)]"
      >
        {open ? <X size={18} /> : <MessageCircle size={18} />}
      </button>
    </div>
  );
}