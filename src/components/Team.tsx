import { Card } from "@/components/ui/card";
import { Twitter, Instagram, Linkedin } from "lucide-react";
import fedeImg from "@/assets/fede-simonetti.jpg";
import elisaImg from "@/assets/elisa-sanchez.jpg";
import manuImg from "@/assets/manu-jove.jpg";
import tomasImg from "@/assets/tomas-quintin.jpg";
import valeImg from "@/assets/vale-sarra.jpg";

const teamMembers = [
  {
    name: "Fede Simonetti",
    role: "El meteorólogo del pueblo",
    description: "Experto en clima y en hacer que te importe el pronóstico. Sus predicciones son tan precisas como sus chistes malos.",
    image: fedeImg,
    social: {
      twitter: "#",
      instagram: "#"
    }
  },
  {
    name: "Elisa Sánchez",
    role: "La voz de la razón (a veces)",
    description: "Periodista aguda que equilibra el caos matutino. Le gusta el café fuerte y las preguntas incómodas.",
    image: elisaImg,
    social: {
      twitter: "#",
      instagram: "#"
    }
  },
  {
    name: "Manu Jove",
    role: "El filósofo del desayuno",
    description: "Analista político que puede conectar cualquier tema con Spinoza. Fanático del mate y las teorías conspirativas.",
    image: manuImg,
    social: {
      twitter: "#",
      instagram: "#"
    }
  },
  {
    name: "Tomás Quintín Palma",
    role: "El millennial sabio",
    description: "Aporta la perspectiva joven y los memes actualizados. Experto en explicar TikTok a los mayores de 30.",
    image: tomasImg,
    social: {
      twitter: "#",
      instagram: "#"
    }
  },
  {
    name: "Vale Sarra",
    role: "La energía del programa",
    description: "Comunicadora nata que puede hacer interesante hasta el informe del tráfico. Madrugadora profesional.",
    image: valeImg,
    social: {
      twitter: "#",
      instagram: "#",
      linkedin: "#"
    }
  }
];

const Team = () => {
  return (
    <section id="equipo" className="py-20 px-4 bg-gradient-to-b from-background to-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl md:text-7xl text-foreground mb-4">
            QUIÉNES SOMOS
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            El equipo que hace de tu mañana un momento único de información, humor y buena onda
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card 
              key={member.name}
              className="group bg-card hover:bg-card/80 border-border hover:border-primary/30 transition-all duration-300 hover:shadow-warm hover:-translate-y-2 overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-6">
                <h3 className="font-display text-2xl text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-primary font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-muted-foreground mb-4">
                  {member.description}
                </p>
                
                <div className="flex gap-3">
                  {member.social.twitter && (
                    <a 
                      href={member.social.twitter}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label={`Twitter de ${member.name}`}
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                  {member.social.instagram && (
                    <a 
                      href={member.social.instagram}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label={`Instagram de ${member.name}`}
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  )}
                  {member.social.linkedin && (
                    <a 
                      href={member.social.linkedin}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label={`LinkedIn de ${member.name}`}
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;