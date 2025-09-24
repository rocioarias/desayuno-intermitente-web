import { Button } from "@/components/ui/button";
import { Youtube, Mic, Coffee } from "lucide-react";
import heroImage from "@/assets/team-hero.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Equipo de Desayuno Intermitente"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-gradient-morning" />
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        
        <h1 className="font-display text-6xl md:text-8xl text-primary-foreground mb-4 tracking-tight animate-fade-in drop-shadow-2xl">
          DESAYUNO INTERMITENTE
        </h1>
        
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animation-delay-400">
          <Button 
            size="lg"
            variant="outline"
            className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 font-semibold px-8 py-6 text-lg"
            onClick={() => document.getElementById('clima')?.scrollIntoView({ behavior: 'smooth' })}
          >
            🌤️ VER EL CLIMA DE FEDE
          </Button>
        </div>
        
        <div className="mt-8 text-primary-foreground/80 font-medium animate-fade-in animation-delay-600">
          <p className="text-lg">🔴 EN VIVO DE LUNES A VIERNES | 9:00 AM - 10:00 AM</p>
        </div>
      </div>
      
      {/* Animated sun rays */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-secondary/20 to-transparent rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-radial from-primary/20 to-transparent rounded-full blur-3xl animate-pulse animation-delay-1000" />
    </section>
  );
};

export default Hero;