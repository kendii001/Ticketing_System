import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      
    
      <Navbar />

      
      <main className="flex-1 w-full">
        <Hero />
      </main>

   
      <Footer />

    </div>
  );
}