import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Image from "next/image";
import PropertyWhyChoose from "@/components/property/PropertyWhyChoose";
import PropertyFeatured from "@/components/property/PropertyFeatured";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="relative h-[500px] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <Image
            src="/assets/hero-image-1.avif"
            alt="Hero background"
            fill
            className="object-cover"
          />
          <div className="relative z-20 text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Find Your Perfect Stay
            </h1>
            <p className="text-xl mb-8">
              Discover amazing places to stay around the world
            </p>
          </div>
        </section>
        <PropertyFeatured />
        <PropertyWhyChoose />
      </main>

      <Footer />
    </div>
  );
}
