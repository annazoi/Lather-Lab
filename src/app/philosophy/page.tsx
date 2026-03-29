import React from "react";
import Image from "next/image";

export default function Philosophy() {
  return (
    <main className="min-h-screen pt-20 bg-[#F9F8F6] text-stone-900">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] lg:h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/philosophy-hero.png"
          alt="Botanical Ingredients"
          fill
          className="object-cover opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-stone-900/30" />
        <div className="relative z-10 text-center px-6 mt-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-6 tracking-wide shadow-sm">
            Our Philosophy
          </h1>
          <p className="text-stone-100 font-sans tracking-[0.2em] uppercase text-xs md:text-sm max-w-xl mx-auto leading-relaxed font-bold">
            Crafted with intention. Grounded in nature.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 max-w-4xl mx-auto px-6 lg:px-12 text-center text-stone-800 space-y-16">
        <div className="space-y-8">
          <h2 className="font-serif text-3xl md:text-4xl text-stone-900">
            A Return to Simplicity
          </h2>
          <div className="w-16 h-[1px] bg-stone-400 mx-auto" />
          <p className="font-sans text-stone-600 leading-loose text-[15px] font-light">
            At Terra & Lather, we believe that skincare should be an uncomplicated ritual. 
            We source our ingredients directly from the earth, stripping away the unnecessary synthetics, 
            artificial fragrances, and harsh chemicals that dominate modern cosmetics.
          </p>
          <p className="font-sans text-stone-600 leading-loose text-[15px] font-light">
            Our artisanal process is a labor of love. Every small batch is cured slowly to ensure 
            maximum potency and gentleness, resulting in a product that nourishes the skin and 
            respects the environment.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 pt-12 border-t border-stone-200">
          <div className="space-y-4">
            <h3 className="font-serif text-xl tracking-wide text-stone-800">Purity</h3>
            <p className="text-sm text-stone-500 leading-relaxed font-light">
              We exclusively use plant-based butters, cold-pressed oils, and pure essential oils. No compromises.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="font-serif text-xl tracking-wide text-stone-800">Sustainability</h3>
            <p className="text-sm text-stone-500 leading-relaxed font-light">
              From our minimal packaging to our ethically sourced ingredients, the earth comes first.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="font-serif text-xl tracking-wide text-stone-800">Craftsmanship</h3>
            <p className="text-sm text-stone-500 leading-relaxed font-light">
              Each bar is hand-poured, hand-cut, and cured for weeks. True quality takes time and cannot be rushed.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
