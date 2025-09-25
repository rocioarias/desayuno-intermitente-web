import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Search, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface MapWeatherSearchProps {
  onLocationSelect: (latitude: number, longitude: number, placeName?: string) => void;
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const MapWeatherSearch = ({ onLocationSelect }: MapWeatherSearchProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const [searchBox, setSearchBox] = useState<any>(null);
  const [apiKey, setApiKey] = useState("");
  const [showApiInput, setShowApiInput] = useState(true);
  const [loading, setLoading] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const loadGoogleMaps = () => {
    if (!apiKey) return;
    
    setLoading(true);
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;
    
    window.initMap = () => {
      initializeMap();
      setLoading(false);
    };
    
    script.onerror = () => {
      toast({
        title: "Error",
        description: "No se pudo cargar Google Maps. Verifica tu API Key.",
        variant: "destructive",
      });
      setLoading(false);
    };
    
    document.head.appendChild(script);
  };

  const initializeMap = () => {
    if (!mapRef.current) return;

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: { lat: -34.6037, lng: -58.3816 }, // Buenos Aires
      zoom: 10,
      mapTypeControl: false,
      streetViewControl: false,
    });

    setMap(mapInstance);

    // Click listener en el mapa
    mapInstance.addListener("click", (event: any) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      
      placeMarker({ lat, lng });
      
      // Obtener nombre del lugar usando geocoding reverso
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results: any[], status: string) => {
        if (status === "OK" && results[0]) {
          const placeName = results[0].formatted_address;
          onLocationSelect(lat, lng, placeName);
          toast({
            title: "Ubicación seleccionada",
            description: `Obteniendo clima para: ${placeName}`,
          });
        } else {
          onLocationSelect(lat, lng);
          toast({
            title: "Ubicación seleccionada",
            description: `Coordenadas: ${lat.toFixed(4)}, ${lng.toFixed(4)}`,
          });
        }
      });
    });

    // Configurar search box
    if (searchInputRef.current) {
      const searchBoxInstance = new window.google.maps.places.SearchBox(searchInputRef.current);
      mapInstance.controls[window.google.maps.ControlPosition.TOP_LEFT].push(searchInputRef.current.parentElement);
      setSearchBox(searchBoxInstance);

      searchBoxInstance.addListener("places_changed", () => {
        const places = searchBoxInstance.getPlaces();
        if (!places || places.length === 0) return;

        const place = places[0];
        if (!place.geometry || !place.geometry.location) return;

        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        
        placeMarker({ lat, lng });
        mapInstance.setCenter({ lat, lng });
        mapInstance.setZoom(12);
        
        onLocationSelect(lat, lng, place.name || place.formatted_address);
        toast({
          title: "Lugar encontrado",
          description: `Obteniendo clima para: ${place.name || place.formatted_address}`,
        });
      });
    }
  };

  const placeMarker = (position: { lat: number; lng: number }) => {
    if (marker) {
      marker.setMap(null);
    }

    const newMarker = new window.google.maps.Marker({
      position,
      map,
      animation: window.google.maps.Animation.DROP,
      icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
      },
    });

    setMarker(newMarker);
  };

  return (
    <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
      <h3 className="text-2xl font-display mb-4 text-primary">
        🗺️ Búsqueda por Mapa
      </h3>
      
      {showApiInput ? (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Para usar el mapa, necesitas una API Key de Google Maps (gratuita con límites).
          </p>
          <p className="text-sm text-muted-foreground">
            Obtén tu API Key en{" "}
            <a 
              href="https://console.cloud.google.com/google/maps-apis/credentials" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              Google Cloud Console
            </a>
          </p>
          <div className="flex gap-2">
            <Input
              type="password"
              placeholder="Ingresa tu Google Maps API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={() => {
                if (apiKey) {
                  setShowApiInput(false);
                  loadGoogleMaps();
                } else {
                  toast({
                    title: "API Key requerida",
                    description: "Por favor ingresa tu API Key de Google Maps",
                    variant: "destructive",
                  });
                }
              }}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Cargar Mapa"
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {loading && (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}
          
          <div className="relative">
            <div className="absolute top-2 left-2 z-10 bg-card/95 rounded-lg p-2 hidden">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Buscar lugar en el mapa..."
                  className="pl-10 pr-4 min-w-[300px] bg-background"
                />
              </div>
            </div>
            
            <div 
              ref={mapRef} 
              className="w-full h-[400px] rounded-lg"
            />
          </div>
          
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p>
              Haz clic en cualquier punto del mapa o usa el buscador para seleccionar una ubicación 
              y obtener el clima de ese lugar.
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};

export default MapWeatherSearch;