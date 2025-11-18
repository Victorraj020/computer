import React from "react";
import "./styles/FAQs.css";

const FAQ = ({ faqdata, who }) => {
  return (
    <div className="faq-wrapper max-w-[1400px] mx-auto py-14 px-10 bg-[#050814] rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.75)]">
      {/* Heading */}
      <div className="mb-10">
        <p className="text-sm tracking-[0.25em] text-cyan-400 uppercase">
          FAQs - {who}
        </p>
        <h1 className="mt-2 text-3xl md:text-4xl font-extrabold text-gray-50">
          Computer Hardware Questions
        </h1>
        <p className="mt-3 text-sm text-gray-400 max-w-2xl">
          Clear answers to the most common questions about CPUs, GPUs, memory,
          and power supplies so you can build with confidence.
        </p>
      </div>

      {/* FAQ List */}
      <div className="faq-list w-full space-y-5">
        {faqdata.map((item, index) => (
          <div
            key={index}
            className="faq-item group relative overflow-hidden rounded-xl bg-gradient-to-r from-[#050814] via-[#050814] to-[#050814] border border-[#1f2937] hover:border-cyan-500/60 transition-all duration-300 shadow-[0_14px_30px_rgba(0,0,0,0.6)]"
          >
            <div className="flex items-stretch">
              {/* Accent strip */}
              <div className="w-1 bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex-1 px-6 py-5">
                {/* Question */}
                <p className="faq-question text-base md:text-lg font-semibold text-gray-100 group-hover:text-white transition duration-300">
                  {item.question}
                </p>

                {/* Answer (Visible on Hover) */}
                <div className="faq-answer max-w-[95%] text-gray-400 text-sm md:text-[15px] mt-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
