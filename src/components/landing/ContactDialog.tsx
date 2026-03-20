"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { submitContactForm } from "@/lib/api";

interface ContactDialogProps {
  open: boolean;
  onClose: () => void;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validate(name: string, email: string, message: string): FormErrors {
  const errors: FormErrors = {};

  if (!name.trim()) {
    errors.name = "Name is required.";
  } else if (name.trim().length > 30) {
    errors.name = "Name must be 30 characters or less.";
  }

  if (!email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!message.trim()) {
    errors.message = "Message is required.";
  } else if (message.trim().length > 1000) {
    errors.message = "Message must be 1000 characters or less.";
  }

  return errors;
}

export function ContactDialog({ open, onClose }: ContactDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      setName("");
      setEmail("");
      setMessage("");
      setErrors({});
      setSubmitted(false);
      setSubmitError("");
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    const validationErrors = validate(name, email, message);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    try {
      const res = await submitContactForm({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      });
      if (res.success) {
        setSubmitted(true);
      } else {
        setSubmitError(res.message || "Something went wrong. Please try again.");
      }
    } catch {
      setSubmitError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg rounded-2xl bg-background border border-border p-6 shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg
                         hover:bg-surface-elevated text-muted hover:text-foreground transition-colors cursor-pointer"
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {submitted ? (
              /* Success state */
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-chart-3/10 flex items-center justify-center mx-auto mb-4">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-chart-3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2">
                  Message Sent!
                </h3>
                <p className="text-muted text-sm">
                  Your message has been received successfully. We&apos;ll get back to you soon.
                </p>
                <div className="mt-6">
                  <Button onClick={onClose} variant="secondary" size="sm">
                    Close
                  </Button>
                </div>
              </div>
            ) : (
              /* Form state */
              <>
                <h3 className="font-heading text-xl font-semibold mb-1">
                  Contact Us
                </h3>
                <p className="text-muted text-sm mb-6">
                  Have a question or feedback? Send us a message.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    id="contact-name"
                    label="Name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    error={errors.name}
                    maxLength={30}
                  />

                  <Input
                    id="contact-email"
                    label="Email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    error={errors.email}
                  />

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-message" className="text-sm font-medium text-muted">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      placeholder="Your message..."
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                      }}
                      maxLength={1000}
                      rows={4}
                      className={`w-full rounded-lg bg-surface-elevated border border-border px-4 py-2.5
                        text-foreground placeholder:text-muted/50 resize-none
                        focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30
                        transition-colors duration-200
                        ${errors.message ? "border-red-500 focus:border-red-500 focus:ring-red-500/30" : ""}`}
                    />
                    <div className="flex justify-between">
                      {errors.message ? (
                        <p className="text-xs text-red-500">{errors.message}</p>
                      ) : (
                        <span />
                      )}
                      <span className="text-xs text-muted">
                        {message.length}/1000
                      </span>
                    </div>
                  </div>

                  {submitError && (
                    <p className="text-sm text-red-500">{submitError}</p>
                  )}

                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
