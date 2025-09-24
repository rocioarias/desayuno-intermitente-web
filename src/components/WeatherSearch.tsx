import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Thermometer, Wind, Droplets, Cloud, Sun, CloudRain, CloudSnow, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface City {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

interface WeatherData {
  temperature: number;
  windspeed: number;
  humidity: number;
  weathercode: number;
  city: string;
  country: string;
}

const weatherCodeToIcon = (code: number) => {
  if (code === 0) return Sun;
  if (code <= 3) return Cloud;
  if (code <= 69) return CloudRain;
  if (code <= 79) return CloudSnow;
  return Cloud;
};

const weatherCodeToCondition = (code: number): string => {
  const conditions: { [key: number]: string } = {
    0: "Despejado como la mente de Fede",
    1: "Mayormente despejado",
    2: "Parcialmente nublado",
    3: "Nublado",
    45: "Niebla",
    48: "Niebla con escarcha",
    51: "Llovizna ligera",
    53: "Llovizna moderada",
    55: "Llovizna intensa",
    61: "Lluvia ligera",
    63: "Lluvia moderada",
    65: "Lluvia intensa",
    71: "Nevada ligera",
    73: "Nevada moderada",
    75: "Nevada intensa",
    77: "Granizo",
    80: "Chaparrones ligeros",
    81: "Chaparrones moderados",
    82: "Chaparrones intensos",
    85: "Nevada ligera",
    86: "Nevada intensa",
    95: "Tormenta",
    96: "Tormenta con granizo ligero",
    99: "Tormenta con granizo intenso"
  };
  return conditions[code] || "Clima indefinido";
};

const getFedeComment = (temp: number, code: number): string => {
  if (temp > 35) return "Totalmente Hooooooot";
  if (temp > 30) return "Se viene el verano eterno de Macri";
  if (temp > 25) return "Clima ideal para que Manu Jove vaya al gimnasio";
  if (temp > 20) return "Esta agradable como para ver TropoDolce";
  if (temp > 15) return "Fresco para 3 camperas";
  if (temp > 10) return "Clima perfecto para que Manu Jove compre Chipa";
  if (temp > 5) return "Más frío que culo de pinguino";
  if (temp > 0) return "Temperatura de freezer político";
  return "Más frío que la mirada de tu ex";
};

const WeatherSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Buscar ciudades
  useEffect(() => {
    const searchCities = async () => {
      if (searchTerm.length < 2) {
        setCities([]);
        return;
      }

      try {
        const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchTerm)}&count=5&language=es`
        );
        const data = await response.json();
        
        if (data.results) {
          setCities(data.results);
          setShowDropdown(true);
        } else {
          setCities([]);
        }
      } catch (error) {
        console.error("Error buscando ciudades:", error);
        toast({
          title: "Error",
          description: "No se pudieron buscar ciudades",
          variant: "destructive",
        });
      }
    };

    const debounceTimer = setTimeout(searchCities, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  // Obtener clima
  const fetchWeather = async (city: City) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`
      );
      const data = await response.json();
      
      setWeather({
        temperature: Math.round(data.current.temperature_2m),
        windspeed: Math.round(data.current.wind_speed_10m),
        humidity: data.current.relative_humidity_2m,
        weathercode: data.current.weather_code,
        city: city.name,
        country: city.country,
      });
      
      setSelectedCity(city);
      setShowDropdown(false);
      setSearchTerm("");
      
      toast({
        title: "¡Clima actualizado!",
        description: `Datos frescos de ${city.name}`,
      });
    } catch (error) {
      console.error("Error obteniendo clima:", error);
      toast({
        title: "Error",
        description: "No se pudo obtener el clima",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const WeatherIcon = weather ? weatherCodeToIcon(weather.weathercode) : Cloud;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Buscador */}
      <div className="relative" ref={dropdownRef}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="Buscá tu ciudad... (ej: Buenos Aires, Córdoba, Rosario)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-6 text-lg bg-card/50 backdrop-blur border-primary/20 focus:border-primary"
          />
        </div>

        {/* Dropdown de ciudades */}
        {showDropdown && cities.length > 0 && (
          <Card className="absolute top-full mt-2 w-full z-50 p-2 bg-card/95 backdrop-blur border-primary/20">
            {cities.map((city) => (
              <button
                key={city.id}
                onClick={() => fetchWeather(city)}
                className="w-full text-left px-4 py-3 hover:bg-primary/10 rounded-lg transition-colors flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <div>
                  <span className="font-medium">{city.name}</span>
                  {city.admin1 && <span className="text-muted-foreground"> - {city.admin1}</span>}
                  <span className="text-muted-foreground text-sm"> ({city.country})</span>
                </div>
              </button>
            ))}
          </Card>
        )}
      </div>

      {/* Resultado del clima */}
      {loading && (
        <Card className="p-8 text-center">
          <Loader2 className="w-12 h-12 mx-auto animate-spin text-primary" />
          <p className="mt-4 text-lg">Consultando el oráculo meteorológico...</p>
        </Card>
      )}

      {weather && !loading && (
        <Card className="overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="font-display text-4xl  mb-2">
                  {weather.city}
                </h3>
                <p className="text-muted-foreground text-lg">{weather.country}</p>
              </div>
              <WeatherIcon className="w-20 h-20 text-primary" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="flex items-center gap-3">
                <Thermometer className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-4xl font-bold ">{weather.temperature}°</p>
                  <p className="text-sm text-muted-foreground">Temperatura</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Wind className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-2xl font-semibold ">{weather.windspeed} km/h</p>
                  <p className="text-sm text-muted-foreground">Viento</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Droplets className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-2xl font-semibold">{weather.humidity}%</p>
                  <p className="text-sm text-muted-foreground">Humedad</p>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <p className="text-xl font-semibold  mb-2">
                {weatherCodeToCondition(weather.weathercode)}
              </p>
              <p className="text-lg italic text-primary">
                "{getFedeComment(weather.temperature, weather.weathercode)}"
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Ciudades destacadas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { name: "Buenos Aires", latitude: -34.6131, longitude: -58.3772, country: "Argentina" },
          { name: "Quilmes", latitude: -34.7242, longitude: -58.2526, country: "Argentina" },
          { name: "Rosario", latitude: -32.9442, longitude: -60.6505,  country: "Argentina" },
          { name: "Funes", latitude: -32.91, longitude: -60.8107, country: "Argentina" },
        ].map((city) => (
          <Button
            key={city.name}
            variant="outline"
            onClick={() => fetchWeather({ ...city, id: Math.random(), admin1: "" })}
            className="bg-card/50 hover:bg-primary/10 border-primary/20"
          >
            <MapPin className="w-4 h-4 mr-2" />
            {city.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default WeatherSearch;