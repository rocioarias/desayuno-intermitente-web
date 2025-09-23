import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Youtube, Clock, TrendingUp, Laugh } from "lucide-react";

const videos = [
  {
    id: "dQw4w9WgXcQ",
    title: "El día que Fede predijo mal y llovió torrencialmente",
    category: "Humor",
    views: "45K vistas",
    duration: "8:42"
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Análisis: Las elecciones y el precio del dólar",
    category: "Política",
    views: "120K vistas",
    duration: "15:30"
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Manu explica la inflación con medialunas",
    category: "Economía",
    views: "89K vistas",
    duration: "12:15"
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Vale entrevista a Milei: Los mejores momentos",
    category: "Entrevista",
    views: "250K vistas",
    duration: "20:45"
  },
  {
    id: "dQw4w9WgXcQ",
    title: "El debate más picante sobre el asado perfecto",
    category: "Cultura",
    views: "67K vistas",
    duration: "10:20"
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Compilado de bloopers del mes",
    category: "Humor",
    views: "180K vistas",
    duration: "5:55"
  }
];

const Highlights = () => {
  return (
    <section id="destacados" className="py-20 px-4 bg-gradient-to-b from-background to-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl md:text-7xl text-foreground mb-4">
            MOMENTOS DESTACADOS
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Lo mejor del programa para que no te pierdas nada
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <Card 
              key={index}
              className="group overflow-hidden border-border hover:border-primary/30 transition-all duration-300 hover:shadow-warm animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <div className="absolute top-2 right-2 bg-black/70 text-primary-foreground px-2 py-1 rounded text-sm font-medium">
                  {video.duration}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                    {video.category}
                  </span>
                  <span className="text-muted-foreground text-sm flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {video.views}
                  </span>
                </div>
                
                <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {video.title}
                </h3>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary-dark text-primary-foreground font-semibold px-8 py-6 text-lg shadow-warm hover:shadow-glow transition-all hover:scale-105"
            onClick={() => window.open('https://www.youtube.com/@blenderok', '_blank')}
          >
            <Youtube className="mr-2 h-5 w-5" />
            Ver todos los videos en YouTube
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Highlights;