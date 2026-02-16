"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
    // Enable GA after consent
    window.dispatchEvent(new Event("cookie-consent-accepted"));
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-lg rounded-2xl border border-border bg-white p-5 shadow-lg sm:left-auto sm:right-6 sm:bottom-6"
        >
          <p className="text-sm text-muted-foreground">
            Používáme cookies pro analýzu návštěvnosti (Google Analytics).
            Žádné marketingové cookies nepoužíváme.
          </p>
          <div className="mt-4 flex gap-3">
            <Button size="sm" onClick={accept}>
              Souhlasím
            </Button>
            <Button size="sm" variant="ghost" onClick={decline}>
              Odmítnout
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
