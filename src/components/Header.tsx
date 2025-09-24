import { useState, useEffect } from "react";
import { Menu, X, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoBlender from "@/assets/blender-logo.jpg";
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/95 backdrop-blur-md shadow-lg" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
                  <img 
          src={logoBlender} 
          alt="Logo blender"
          className="w-10 h-10 rounded-full object-cover mr-3"
        />

          <nav className="hidden md:flex items-center gap-8">
            
            <button 
              onClick={() => scrollToSection("clima")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              El Clima
            </button>
           
            <Button 
              className="bg-primary hover:bg-primary-dark text-primary-foreground font-semibold"
              onClick={() => window.open('https://www.youtube.com/@estoesblender', '_blank')}
            >
              EN VIVO
            </Button>
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        

        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4">
          
            <button 
              onClick={() => scrollToSection("clima")}
              className="text-foreground hover:text-primary transition-colors font-medium text-left"
            >
              El Clima
            </button>
            
            <Button 
              className="bg-primary hover:bg-primary-dark text-primary-foreground font-semibold w-full"
              onClick={() => window.open('https://www.youtube.com/@estoesblender', '_blank')}
            >
              EN VIVO
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;