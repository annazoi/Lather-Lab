"use client";
import React from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Elise M.",
    role: "Verified Buyer",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "After years of trying clinical products that felt harsh, this brought balance back to my skin. The texture changed within two weeks. Absolutely luxurious lather.",
  },
  {
    name: "Sarah T.",
    role: "Verified Buyer",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "The French Green Clay bar has completely transformed my daily routine. It cleanses deeply without leaving my face feeling tight or dry. Smells like a spa.",
  },
  {
    name: "James L.",
    role: "Verified Buyer",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "I bought the Oatmeal bar for my sensitive skin and it's a game changer. The minimalist packaging is also beautiful sitting in my bathroom.",
  }
];

export const Testimonials = () => {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 text-center">
        <div className="mb-20 space-y-5">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#86967E] font-bold">Customer Feedback</span>
          <h2 className="text-4xl lg:text-[52px] font-serif text-[#1C1917]">
            Real Results
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 gap-y-12 text-left">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-[#F8F9F7] p-10 h-full flex flex-col"
            >
              <div className="flex space-x-1.5 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={13} 
                    className="fill-[#A8B8A0] text-[#A8B8A0]" 
                  />
                ))}
              </div>
              <p className="text-[#898886] font-sans italic leading-relaxed mb-10 text-[14px] flex-grow pr-4">
                "{testimonial.text}"
              </p>
              <div className="flex items-center space-x-4 mt-auto">
                <img src={testimonial.img} alt={testimonial.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-[800] text-[#1C1917] font-sans text-[13px] tracking-wide">{testimonial.name}</h4>
                  <div className="text-[11px] text-[#A2A19F] font-sans mt-1">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
