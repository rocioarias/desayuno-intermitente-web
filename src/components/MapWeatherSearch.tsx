import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Search, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix para los iconos de Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

interface MapWeatherSearchProps {
  onLocationSelect: (latitude: number, longitude: number, placeName?: string) => void;
}

interface SearchResult {
  place_id: number;
  lat: string;
  lon: string;
  display_name: string;
}

// Componente para manejar clicks en el mapa
function MapClickHandler({ onLocationClick }: { onLocationClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click: (e) => {
      onLocationClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

const MapWeatherSearch = ({ onLocationSelect }: MapWeatherSearchProps) => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const mapRef = useRef<L.Map | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Cerrar resultados al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Buscar lugares con Nominatim (OpenStreetMap)
  const searchPlace = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchTerm)}&limit=5`
      );
      const data = await response.json();
      
      if (data && data.length > 0) {
        setSearchResults(data);
        setShowResults(true);
      } else {
        toast({
          title: "Sin resultados",
          description: "No se encontraron lugares con ese nombre",
        });
      }
    } catch (error) {
      console.error("Error buscando lugar:", error);
      toast({
        title: "Error",
        description: "No se pudo buscar el lugar",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Seleccionar un resultado de búsqueda
  const selectSearchResult = (result: SearchResult) => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);
    
    setPosition([lat, lng]);
    setShowResults(false);
    setSearchTerm("");
    
    // Centrar el mapa en la nueva posición
    if (mapRef.current) {
      mapRef.current.setView([lat, lng], 12);
    }
    
    onLocationSelect(lat, lng, result.display_name);
    toast({
      title: "Ubicación seleccionada",
      description: `Obteniendo clima para: ${result.display_name}`,
    });
  };

  // Manejar click en el mapa
  const handleMapClick = async (lat: number, lng: number) => {
    setPosition([lat, lng]);
    
    // Geocoding reverso para obtener el nombre del lugar
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      
      const placeName = data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      onLocationSelect(lat, lng, placeName);
      
      toast({
        title: "Ubicación seleccionada",
        description: `Obteniendo clima para: ${placeName}`,
      });
    } catch (error) {
      onLocationSelect(lat, lng);
      toast({
        title: "Ubicación seleccionada",
        description: `Coordenadas: ${lat.toFixed(4)}, ${lng.toFixed(4)}`,
      });
    }
  };

  return (
    <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
      <h3 className="text-2xl font-display mb-4 text-white">
        🗺️ Búsqueda por Mapa 
      </h3>
      <p className="font-display mb-4 text-2xl ">
        Como sugerencia del chat, agregué un mapa interactivo donde podes pinchar en el mapa y te dice la temperatura de la locación exacta. Asi que ahora ya no hay excusasssss. 
      </p>
      
      <div className="space-y-4">
        {/* Buscador de lugares */}
        <div className="relative" ref={resultsRef}>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Buscar lugar en el mapa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && searchPlace()}
                className="pl-10"
              />
            </div>
            <Button 
              onClick={searchPlace}
              disabled={loading || !searchTerm.trim()}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Buscar"
              )}
            </Button>
          </div>
          
          {/* Resultados de búsqueda */}
          {showResults && searchResults.length > 0 && (
            <Card className="absolute top-full mt-2 w-full z-[1000] p-2 bg-card/95 backdrop-blur border-primary/20 max-h-60 overflow-y-auto">
              {searchResults.map((result) => (
                <button
                  key={result.place_id}
                  onClick={() => selectSearchResult(result)}
                  className="w-full text-left px-4 py-3 hover:bg-primary/10 rounded-lg transition-colors"
                >
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{result.display_name}</span>
                  </div>
                </button>
              ))}
            </Card>
          )}
        </div>
        
        {/* Mapa */}
        <div className="h-[400px] rounded-lg overflow-hidden border border-border">
          <MapContainer
            center={[-34.6037, -58.3816]} // Buenos Aires por defecto
            zoom={10}
            style={{ height: "100%", width: "100%" }}
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapClickHandler onLocationClick={handleMapClick} />
            {position && <Marker position={position} />}
          </MapContainer>
        </div>
        
        <div className="flex items-start gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <p>
            Haz clic en cualquier punto del mapa o usa el buscador para seleccionar una ubicación 
            y obtener el clima de ese lugar. Powered by OpenStreetMap (100% gratuito).
          </p>
        </div>
      </div>
    </Card>
  );
};

export default MapWeatherSearch;
