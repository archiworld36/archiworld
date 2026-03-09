import React, { useEffect } from "react";
import {
  X,
  Copy,
  Facebook,
  Linkedin,
  Send,
  Twitter,
  Instagram,
} from "lucide-react";
import { toast } from "react-toastify";
import { FaWhatsapp } from "react-icons/fa";

function ShareModal({ isOpen, onClose, url }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  if (!isOpen) return null;

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    toast.info("Link copied!");
  };

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}`,
  };

  const openShare = (link) => {
    window.open(link, "_blank");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[90%] max-w-md p-6 space-y-5">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Share</h2>
          <button className="px-0 py-0" onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Copy Link */}
        <button
          onClick={copyLink}
          className="w-full flex gap-2 items-center justify-center border rounded-full py-2"
        >
          <Copy size={18} />
          Copy Link
        </button>

        {/* Social Icons */}
        <div className="grid grid-cols-3 gap-4 pt-2">
          <button
            onClick={() => openShare(shareLinks.whatsapp)}
            className="flex flex-col items-center gap-2"
          >
            <FaWhatsapp className="text-green-600 w-5 h-5" />
            <span className="text-sm">WhatsApp</span>
          </button>

          <button
            onClick={() => openShare(shareLinks.facebook)}
            className="flex flex-col items-center gap-2"
          >
            <Facebook className="text-blue-600 w-5 h-5" />
            <span className="text-sm">Facebook</span>
          </button>

          <button
            onClick={() => openShare(shareLinks.linkedin)}
            className="flex flex-col items-center gap-2"
          >
            <Linkedin className="text-blue-700 w-5 h-5" />
            <span className="text-sm">LinkedIn</span>
          </button>

          <button
            onClick={() => openShare(shareLinks.twitter)}
            className="flex flex-col items-center gap-2"
          >
            <Twitter className="text-blue-700 w-5 h-5" />
            <span className="text-sm">Twitter</span>
          </button>

          <button
            onClick={() => openShare(shareLinks.telegram)}
            className="flex flex-col items-center gap-2"
          >
            <Send className="text-blue-700 w-5 h-5" />
            <span className="text-sm">Telegram</span>
          </button>

          <button
            onClick={() => window.open("https://instagram.com", "_blank")}
            className="flex flex-col items-center gap-2"
          >
            <Instagram className="text-pink-500 w-5 h-5" />
            <span className="text-sm">Instagram</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShareModal;
