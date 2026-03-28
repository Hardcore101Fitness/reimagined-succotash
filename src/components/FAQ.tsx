"use client";

import { useState } from "react";

const faqs = [
  {
    question: "I'm a complete beginner. Is this gym for me?",
    answer:
      "Absolutely. Over 60% of our members started with zero gym experience. Every class is coached and every movement is scaled to your ability. Our coaches meet you where you are — not where they think you should be.",
  },
  {
    question: "What does the free trial include?",
    answer:
      "Your free trial includes a full training session with one of our coaches, a facility tour, and a conversation about your goals. No pressure, no hard sell — just a chance to experience what real coaching feels like.",
  },
  {
    question: "How much does membership cost?",
    answer:
      "Membership starts at $149/month for group training with no long-term contracts. Personal training packages are available starting at $75/session. We'll walk you through all options during your trial visit.",
  },
  {
    question: "What are your hours?",
    answer:
      "We run classes from 5:30 AM to 7:30 PM Monday through Friday, and 8:00 AM to 12:00 PM on Saturdays. Open gym is available during all operating hours for members.",
  },
  {
    question: "Do I need to be in shape before I start?",
    answer:
      "No. That's literally what we're here for. You don't need to get fit to join a gym — you join a gym to get fit. We'll handle the rest.",
  },
  {
    question: "What makes you different from other gyms?",
    answer:
      "Three things: real coaching (not just someone watching you from a desk), real programming (not random workouts on a whiteboard), and real community (members who know your name and push you to be better). We're a training facility, not a health club.",
  },
];

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: { question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-brand-200">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-base sm:text-lg font-semibold text-brand-900 group-hover:text-accent transition-colors pr-8">
          {faq.question}
        </span>
        <svg
          className={`w-5 h-5 shrink-0 text-brand-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="pb-5 pr-12">
          <p className="text-brand-500 leading-relaxed">{faq.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 sm:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center">
          <span className="text-accent text-sm font-semibold tracking-wider uppercase">
            FAQ
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-brand-900 tracking-tight">
            Questions? We&apos;ve Got Answers.
          </h2>
        </div>

        {/* FAQ list */}
        <div className="mt-12">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
