"use client";
import React from "react";
import { Leaf, Droplets, Globe } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Leaf className="text-[#4F6C4C]" size={22} />,
    title: "100% Botanical",
    description: "Sourced directly from nature. No synthetic fragrances, dyes, or harsh detergents."
  },
  {
    icon: <Droplets className="text-[#4F6C4C]" size={22} />,
    title: "Cold-Processed",
    description: "Cured for 6 weeks to preserve the therapeutic properties of our essential oils and plant butters."
  },
  {
    icon: <Globe className="text-[#4F6C4C]" size={22} />,
    title: "Earth Conscious",
    description: "Packaged in biodegradable materials. Good for your skin, gentle on the planet."
  }
];

export const Features = () => {
  return (
    <section className="py-32 bg-white relative">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
        <div className="mb-24 space-y-6">
          <h2 className="text-4xl lg:text-5xl font-serif text-[#1C1917]">
            Where Nature Meets Skin
          </h2>
          <p className="text-[15px] text-stone-500 max-w-2xl mx-auto leading-relaxed">
            Formulated with botanical precision and artisanal care. Each bar is a harmony of research and nature, designed for skin that breathes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="flex flex-col items-center text-center space-y-5"
            >
              <div className="w-16 h-16 bg-[#F3F6F2] rounded-full flex items-center justify-center mb-2">
                {feature.icon}
              </div>
              <h3 className="text-[19px] font-serif text-[#1C1917]">
                {feature.title}
              </h3>
              <p className="text-[14px] text-stone-500 leading-relaxed max-w-[260px]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
