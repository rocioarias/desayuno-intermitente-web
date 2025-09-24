import WeatherSearch from "./WeatherSearch";
import { Cloud } from "lucide-react";

const Weather = () => {
  return (
    <section id="clima" className="min-h-screen py-20 px-4 bg-gradient-warm">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-4 mb-6">
            <Cloud className="w-16 h-16 text-primary animate-pulse" />
            <h1 className="font-display text-6xl md:text-8xl text-primary-foreground">
              EL CLIMA DE FEDE
            </h1>
            <Cloud className="w-16 h-16 text-primary animate-pulse" />
          </div>
          <p className="text-3xl font-bold text-primary-foreground/90 mb-4">
            ⭐ La única verdad meteorológica ⭐
          </p>
        </div>
        
        <WeatherSearch />
      </div>
    </section>
  );
};

export default Weather;