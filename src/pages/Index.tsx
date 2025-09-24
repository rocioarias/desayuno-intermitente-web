import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Weather from "@/components/Weather";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Weather />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
