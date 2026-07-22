"use client";

import { motion } from "framer-motion";

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href="https://wa.me/94112345678"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_-6px_rgba(37,211,102,0.6)]"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
      <svg viewBox="0 0 24 24" className="relative h-7 w-7" fill="currentColor">
        <path d="M17.47 14.38c-.29-.15-1.73-.85-2-.95-.27-.1-.46-.15-.66.15-.2.29-.76.95-.93 1.15-.17.19-.34.22-.63.07-.29-.15-1.23-.45-2.35-1.45-.87-.77-1.45-1.73-1.63-2.02-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.49.1-.19.05-.36-.02-.51-.07-.15-.66-1.58-.9-2.17-.24-.57-.48-.49-.66-.5-.17-.01-.36-.01-.56-.01-.19 0-.51.07-.78.36-.27.29-1.02 1-1.02 2.43 0 1.43 1.04 2.82 1.19 3.01.15.19 2.05 3.13 4.96 4.39.69.3 1.23.48 1.65.61.69.22 1.32.19 1.82.11.55-.08 1.73-.71 1.98-1.39.24-.68.24-1.27.17-1.39-.07-.12-.26-.19-.55-.34z" />
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.9.53 3.68 1.44 5.2L2 22l5.02-1.53a9.86 9.86 0 0 0 5.02 1.37c5.46 0 9.91-4.45 9.91-9.93C21.95 6.45 17.5 2 12.04 2zm0 18.02a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.06.93.94-2.98-.19-.31a8.08 8.08 0 0 1-1.24-4.32c0-4.47 3.64-8.11 8.02-8.11 4.38 0 8.02 3.64 8.02 8.11 0 4.47-3.64 8.11-8.02 8.11z" />
      </svg>
    </motion.a>
  );
}