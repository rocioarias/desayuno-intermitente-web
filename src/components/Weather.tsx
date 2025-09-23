import { Card } from "@/components/ui/card";
import { Cloud, CloudRain, Sun, Wind, Snowflake, CloudDrizzle, Zap } from "lucide-react";

const weatherData = [
  {
    city: "Buenos Aires",
    temp: "28°",
    condition: "Soleado con chances de quilombo",
    icon: Sun,
    ranking: 1,
    comment: "Perfecto para tomarse un Aperol en Puerto Madero"
  },
  {
    city: "Córdoba",
    temp: "31°",
    condition: "Calor de fernet",
    icon: Sun,
    ranking: 2,
    comment: "Se viene el cuartetazo bajo el sol"
  },
  {
    city: "Rosario",
    temp: "26°",
    condition: "Nublado con olor a Paraná",
    icon: Cloud,
    ranking: 3,
    comment: "Ideal para comer un Carlitos en la costanera"
  },
  {
    city: "Mendoza",
    temp: "22°",
    condition: "Despejado como un Malbec",
    icon: Sun,
    ranking: 4,
    comment: "Los Andes se ven espectaculares"
  },
  {
    city: "La Plata",
    temp: "25°",
    condition: "Lluvia de estudiantes",
    icon: CloudRain,
    ranking: 5,
    comment: "Paraguas obligatorio en diagonal 74"
  },
  {
    city: "Bariloche",
    temp: "8°",
    condition: "Frío de chocolate caliente",
    icon: Snowflake,
    ranking: 6,
    comment: "Nieve en el Cerro Catedral confirmada"
  },
  {
    city: "Ushuaia",
    temp: "-2°",
    condition: "Pingüino mode: ON",
    icon: Snowflake,
    ranking: 7,
    comment: "Más frío que la mirada de tu ex"
  },
  {
    city: "Misiones",
    temp: "35°",
    condition: "Humedad del 200%",
    icon: CloudDrizzle,
    ranking: 8,
    comment: "Las Cataratas sudan más que vos"
  }
];

const Weather = () => {
  return (
    <section id="clima" className="py-20 px-4 bg-gradient-warm">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl md:text-7xl text-primary-foreground mb-4">
            EL CLIMA DE FEDE
          </h2>
          <p className="text-2xl font-bold text-primary-foreground/90 mb-2">
            ⭐ La única verdad meteorológica ⭐
          </p>
          <p className="text-lg text-primary-foreground/80">
            Ranking oficial de ciudades según el criterio supremo de Simonetti
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {weatherData.map((city, index) => {
            const Icon = city.icon;
            return (
              <Card 
                key={city.city}
                className={`
                  relative overflow-hidden border-2 transition-all duration-300 hover:scale-105
                  ${city.ranking <= 3 
                    ? 'bg-gradient-to-br from-secondary/90 to-primary/90 border-primary-foreground/30 hover:shadow-glow' 
                    : 'bg-card/95 backdrop-blur border-border hover:shadow-warm'
                  }
                  animate-fade-in
                `}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {city.ranking <= 3 && (
                  <div className="absolute top-2 right-2">
                    <span className="text-3xl">
                      {city.ranking === 1 ? '🥇' : city.ranking === 2 ? '🥈' : '🥉'}
                    </span>
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className={`font-display text-2xl ${
                        city.ranking <= 3 ? 'text-primary-foreground' : 'text-foreground'
                      }`}>
                        #{city.ranking} {city.city}
                      </h3>
                      <p className={`text-3xl font-bold mt-2 ${
                        city.ranking <= 3 ? 'text-primary-foreground' : 'text-primary'
                      }`}>
                        {city.temp}
                      </p>
                    </div>
                    <Icon className={`w-12 h-12 ${
                      city.ranking <= 3 ? 'text-primary-foreground/80' : 'text-primary'
                    }`} />
                  </div>
                  
                  <p className={`font-semibold mb-2 ${
                    city.ranking <= 3 ? 'text-primary-foreground/90' : 'text-foreground'
                  }`}>
                    {city.condition}
                  </p>
                  
                  <p className={`text-sm italic ${
                    city.ranking <= 3 ? 'text-primary-foreground/80' : 'text-muted-foreground'
                  }`}>
                    "{city.comment}"
                  </p>
                </div>
                
                {city.ranking <= 3 && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-foreground/50 via-primary-foreground to-primary-foreground/50" />
                )}
              </Card>
            );
          })}
        </div>
        
        <div className="mt-12 text-center">
          <Card className="inline-block bg-accent/10 border-accent/30 p-6">
            <p className="text-lg font-semibold text-accent">
              ⚡ ALERTA METEOROLÓGICA ⚡
            </p>
            <p className="text-foreground mt-2">
              Se esperan lluvias de memes en toda la región pampeana
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Weather;