import { Instagram, Twitter, Youtube, Facebook, Mail, Mic } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-card to-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Mic className="text-primary w-6 h-6" />
              <span className="font-display text-2xl text-foreground">
                DESAYUNO INTERMITENTE
              </span>
            </div>
            <p className="text-muted-foreground">
              De lunes a viernes, 9:00 a 12:00 hs por Blender.
              Tu dosis matutina de actualidad, humor y el clima más confiable de Argentina.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-display text-xl text-foreground">BLENDER</h3>
            <div className="space-y-2">
              <a 
                href="https://blender.com.ar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Sitio Web
              </a>
              <a 
                href="https://www.youtube.com/@blenderok" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Canal de YouTube
              </a>
              <a 
                href="#" 
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Programación
              </a>
            </div>
          </div>
          
          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="font-display text-xl text-foreground">SEGUINOS</h3>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com/blenderok" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-primary/10 hover:bg-primary/20 p-3 rounded-lg transition-colors group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="https://twitter.com/blenderok" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-primary/10 hover:bg-primary/20 p-3 rounded-lg transition-colors group"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="https://youtube.com/@blenderok" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-primary/10 hover:bg-primary/20 p-3 rounded-lg transition-colors group"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="https://facebook.com/blenderok" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-primary/10 hover:bg-primary/20 p-3 rounded-lg transition-colors group"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              </a>
            </div>
            <div className="pt-4">
              <a 
                href="mailto:desayuno@blender.com.ar"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                desayuno@blender.com.ar
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © 2024 Desayuno Intermitente - Blender. Todos los derechos reservados.
            </p>
            <p className="text-muted-foreground text-sm italic">
              "El único programa donde el clima es más impredecible que la política"
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;