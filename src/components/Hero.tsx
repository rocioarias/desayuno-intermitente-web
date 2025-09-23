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
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-6 animate-fade-in">
          <Coffee className="text-secondary w-10 h-10 animate-pulse" />
          <Mic className="text-primary w-12 h-12" />
          <Coffee className="text-secondary w-10 h-10 animate-pulse" />
        </div>
        
        <h1 className="font-display text-7xl md:text-9xl text-primary-foreground mb-4 tracking-tight animate-fade-in drop-shadow-2xl">
          DESAYUNO INTERMITENTE
        </h1>
        
        <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 font-medium animate-fade-in animation-delay-200">
          Tu dosis de actualidad y humor para arrancar la mañana
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animation-delay-400">
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary-dark text-primary-foreground font-semibold px-8 py-6 text-lg shadow-warm hover:shadow-glow transition-all hover:scale-105"
            onClick={() => window.open('https://www.youtube.com/@blenderok', '_blank')}
          >
            <Youtube className="mr-2 h-5 w-5" />
            Ver último programa
          </Button>
          
          <Button 
            size="lg"
            variant="outline"
            className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 font-semibold px-8 py-6 text-lg"
          >
            EN VIVO DE LUNES A VIERNES
          </Button>
        </div>
        
        <div className="mt-8 text-primary-foreground/80 font-medium animate-fade-in animation-delay-600">
          <p className="text-lg">🔴 9:00 AM - 12:00 PM</p>
        </div>
      </div>
      
      {/* Animated sun rays */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-secondary/20 to-transparent rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-radial from-primary/20 to-transparent rounded-full blur-3xl animate-pulse animation-delay-1000" />
    </section>
  );
};

export default Hero;