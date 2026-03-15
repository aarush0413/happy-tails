"use client";

import { useState } from "react";
import { Share2, Check, Copy, QrCode, X } from "lucide-react";
import QRCode from "qrcode";

interface ShareButtonProps {
  title?: string;
  text?: string;
  url?: string;
  className?: string;
  variant?: "icon" | "full";
}

export function ShareButton({
  title = "Happy Tails - East Pune Pet Services",
  text = "Check out Happy Tails — East Pune's best pet services directory!",
  url,
  className = "",
  variant = "full",
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);

  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");

  async function handleNativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: shareUrl });
      } catch {
        // User cancelled
      }
    } else {
      setShowMenu(true);
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = shareUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  async function handleShowQR() {
    try {
      const dataUrl = await QRCode.toDataURL(shareUrl, {
        width: 256,
        margin: 2,
        color: { dark: "#3F3F65", light: "#FFFFFD" },
      });
      setQrDataUrl(dataUrl);
      setShowQR(true);
      setShowMenu(false);
    } catch {
      // QR generation failed
    }
  }

  if (variant === "icon") {
    return (
      <>
        <button
          onClick={handleNativeShare}
          className={`p-2 rounded-xl bg-bluey-ice hover:bg-bluey-pale text-bluey-primary transition-colors ${className}`}
          aria-label="Share"
        >
          <Share2 className="w-5 h-5" />
        </button>
        {showQR && qrDataUrl && <QRModal qrDataUrl={qrDataUrl} url={shareUrl} onClose={() => setShowQR(false)} />}
      </>
    );
  }

  return (
    <>
      <div className={`relative inline-flex ${className}`}>
        <button
          onClick={handleNativeShare}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-bluey-primary text-white font-semibold text-sm hover:bg-bluey-primary/90 transition-colors"
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>

        {showMenu && (
          <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-lg border border-bluey-pale p-2 min-w-[180px] z-50">
            <button
              onClick={() => { handleCopy(); setShowMenu(false); }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-bluey-navy hover:bg-bluey-ice rounded-lg transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy link"}
            </button>
            <button
              onClick={handleShowQR}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-bluey-navy hover:bg-bluey-ice rounded-lg transition-colors"
            >
              <QrCode className="w-4 h-4" />
              Show QR Code
            </button>
          </div>
        )}
      </div>

      {showMenu && (
        <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
      )}

      {showQR && qrDataUrl && <QRModal qrDataUrl={qrDataUrl} url={shareUrl} onClose={() => setShowQR(false)} />}
    </>
  );
}

function QRModal({ qrDataUrl, url, onClose }: { qrDataUrl: string; url: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl p-6 max-w-xs w-full text-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-lg hover:bg-bluey-ice transition-colors"
        >
          <X className="w-5 h-5 text-bluey-navy/50" />
        </button>
        <h3 className="text-lg font-bold text-bluey-navy mb-1">Share Happy Tails</h3>
        <p className="text-xs text-bluey-navy/50 mb-4">Scan this QR code</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={qrDataUrl} alt="QR Code" className="mx-auto rounded-xl mb-3" width={256} height={256} />
        <p className="text-[10px] text-bluey-navy/40 break-all">{url}</p>
      </div>
    </div>
  );
}
