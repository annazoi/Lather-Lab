import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Collections } from "@/components/Collections";
import { Ingredients } from "@/components/Ingredients";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50 overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <Collections />
      <Ingredients />
      <Testimonials />
      <Footer />
    </main>
  );
}
