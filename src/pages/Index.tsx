import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Team from "@/components/Team";
import Weather from "@/components/Weather";
import Highlights from "@/components/Highlights";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Team />
        <Weather />
        <Highlights />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
