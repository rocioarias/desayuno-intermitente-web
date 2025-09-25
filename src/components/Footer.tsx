import { Instagram, Twitter, Youtube, Facebook, Mail, Mic } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black from-card to-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Mic className="text-primary w-6 h-6" />
              <span className="font-display text-2xl text-foreground">
                DESAYUNO INTERMITENTE
              </span>
            </div>
            <p className="text-muted-foreground">
              Chicos este proyecto lo armé con amor, IA y cariño. Soy una desarrolladora que los mira todas las mañanas
              sin falta y Blender en general es mi lugar seguro. Los quiero ❤️.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-display text-xl text-foreground">BLENDER</h3>
            <div className="space-y-2">
              <a 
                href="https://www.youtube.com/@estoesblender" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Canal de YouTube
              </a>
            
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-display text-xl text-foreground">SEGUINOS</h3>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/estoesblender/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-primary/10 hover:bg-primary/20 p-3 rounded-lg transition-colors group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="https://www.youtube.com/@estoesblender" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-primary/10 hover:bg-primary/20 p-3 rounded-lg transition-colors group"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm italic">
              "El clima de Fedeeeeeee, el clima de Fedeeeeeee..."
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;