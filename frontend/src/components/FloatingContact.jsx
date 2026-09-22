// src/components/FloatingContact.jsx

import { Phone } from 'lucide-react';

export default function FloatingContact() {
  return (
    <div className="floating-contact">

      {/* CALL */}
      <a
        href="tel:+919772733319"
        className="floating-contact-btn call-btn"
        aria-label="Call A-Tech"
        title="Call Us"
      >
        <Phone size={21} strokeWidth={2.4} />

        <span className="floating-tooltip">
          Call Us
        </span>
      </a>


      {/* WHATSAPP */}
      <a
        href="https://wa.me/919772733319"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-contact-btn whatsapp-btn"
        aria-label="Chat with us on WhatsApp"
        title="WhatsApp Us"
      >

        <svg
          viewBox="0 0 32 32"
          width="22"
          height="22"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M19.11 17.23c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.13-.42-2.15-1.34-.79-.7-1.33-1.56-1.49-1.82-.16-.27-.02-.41.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27s.98 2.63 1.11 2.81c.14.18 1.93 2.95 4.68 4.14.65.28 1.16.45 1.56.58.66.21 1.26.18 1.74.11.53-.08 1.6-.66 1.83-1.29.23-.63.23-1.17.16-1.29-.07-.11-.25-.18-.52-.32z"
          />

          <path
            fill="currentColor"
            d="M16.03 3.2c-7.08 0-12.84 5.76-12.84 12.84 0 2.26.59 4.47 1.72 6.42L3.1 28.8l6.49-1.7a12.8 12.8 0 0 0 6.44 1.73h.01c7.08 0 12.84-5.76 12.84-12.84S23.11 3.2 16.03 3.2zm0 23.5h-.01a10.66 10.66 0 0 1-5.43-1.49l-.39-.23-3.85 1.01 1.03-3.75-.25-.4a10.65 10.65 0 1 1 8.9 4.86z"
          />
        </svg>

        <span className="floating-tooltip">
          WhatsApp Us
        </span>

      </a>

    </div>
  );
}