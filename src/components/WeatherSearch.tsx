import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Thermometer, Wind, Droplets, Cloud, Sun, CloudRain, CloudSnow, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import MapWeatherSearch from "./MapWeatherSearch";

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
  temperatureMin: number;
  temperatureMax: number;
  windspeed: number;
  humidity: number;
  weathercode: number;
  city: string;
  country: string;
  admin1?: string;
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
    0: "Despejado",
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
  let quotes: string[] = [];

if (temp > 35) {
    quotes = [
      "⚠️ ¡Alerta Extrema de Calor! Evitá el sol entre las 10h y 16h. Buscá refugio fresco.",
      "💧 Hidratación es Clave: Tomá agua frecuentemente, incluso sin sed. Bebidas frescas sin alcohol.",
      "👕 Usá ropa muy ligera y de colores claros. Cubrite la cabeza con gorra o sombrero.",
      "❄️ Tomá duchas o baños fríos. Evitá esfuerzos físicos intensos al aire libre."
    ];
  } else if (temp > 30) {
    quotes = [
      "🔥 Calor Fuerte. Mantenete a la sombra. Un golpe de calor puede ser peligroso.",
      "🧴 Aplicá protector solar (SPF 30+) cada 2 horas si estás afuera.",
      "🍽️ Comé alimentos ligeros y frescos (frutas y verduras) para ayudar a tu cuerpo a regularse.",
      "🏠 Mantené las persianas y ventanas cerradas durante el día para conservar el fresco interior."
    ];
  } else if (temp > 25) {
    quotes = [
      "☀️ Día Caluroso. Es ideal para actividades al aire libre, pero con precaución. USA PROTECTOR.",
      "🥤 No olvides tu botella de agua. La hidratación sigue siendo importante.",
      "🕶️ Usá gafas de sol con protección UV. La vista también necesita cuidado.",
      "🌬️ Buscá la brisa, pero recordá que el sol quema; aplicá protector solar en la piel expuesta."
    ];
  } else if (temp > 20) {
    quotes = [
      "🌸 Clima Agradable. Ideal para disfrutar de unos mates abajo del sol. Podés usar ropa cómoda y liviana.",
      "🏃 Si hacés ejercicio, elegí las primeras o últimas horas del día. Mantenete hidratado.",
      "🌳 Un buen momento para ventilar tu casa y dejar entrar el aire fresco.",
      "👚 Manga corta y pantalón corto son perfectos. Considerá una camperita ligera por si refresca al bajar el sol."
    ];
  } else if (temp > 15) {
    quotes = [
      "⛅ Media Estación. Un clima muy confortable, sali a pasear sin problema.",
      "🧥 Llevá un buzo o campera fina que puedas quitar si sube la temperatura. Vestite en capas.",
      "🧣 No es necesario, pero un saquito ligero puede ser útil contra el viento fresco.",
      "🏠 Abrí las ventanas al mediodía para ventilar y cerralas por la tarde para conservar el calor."
    ];
  } else if (temp > 10) {
    quotes = [
      "🌬️ Fresquito Moderado. Se siente el cambio. Necesitás un abrigo de media estación.",
      "🧤 Usá una campera o un sweater grueso. Las manos y el cuello pueden sentir el frío.",
      "☕ Disfrutá de bebidas calientes (té, café, mate) para mantener la temperatura corporal.",
      "👟 Elegí calzado cerrado y medias; el suelo frío puede bajar tu temperatura."
    ];
  } else if (temp > 5) {
    quotes = [
      "🥶 Frío Leve. El frío ya se nota. Es momento de abrigarse bien, especialmente al salir.",
      "🧢 Cubrite la cabeza, orejas y manos. Usá gorro y guantes ligeros.",
      "🧣 No olvides un buen abrigo, campera gruesa y una bufanda para proteger el cuello.",
      "🏡 Revisá los cierres de ventanas y puertas para evitar que entre aire frío a la casa."
    ];
  } else if (temp > 0) {
    quotes = [
      "❄️ Frío Intenso. El riesgo de resfrío e hipotermia aumenta. La protección es esencial.",
      "🧤 Capas de ropa son tu mejor aliado (térmica, polar, campera). El aire entre ellas aísla.",
      "♨️ Mantené la calefacción a una temperatura confortable (idealmente entre 19°C y 21°C).",
      "👟 Usá medias gruesas y, si vas a estar mucho tiempo afuera, calzado impermeable."
    ];
  } else { // temp <= 0
    quotes = [
      "🧊 ¡Peligro de Heladas! Temperatura bajo cero. Minimizá la exposición al exterior.",
      "🛡️ Abrigo total: Doble capa de medias, guantes, gorro de lana, bufanda y campera invernal.",
      "♨️ Si usás estufas, ventilá brevemente cada tanto para renovar el aire y evitar la acumulación de gases.",
      "🚗 En caso de nieve o hielo, conducí con extrema precaución y verificá el estado de los neumáticos."
    ];
  }

  return quotes.length > 0 ? quotes[Math.floor(Math.random() * quotes.length)] : "El clima es un misterio.";
}

const WeatherSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  // 1. Crear la referencia para la card de resultados
  const weatherCardRef = useRef<HTMLDivElement>(null);

  // 2. Efecto para hacer scroll cuando se actualiza el clima
  useEffect(() => {
    if (weather && weatherCardRef.current) {
      weatherCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [weather]);

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
        `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
      );
      const data = await response.json();
      
      setWeather({
        temperature: Math.round(data.current.temperature_2m),
        temperatureMin: Math.round(data.daily.temperature_2m_min[0]),
        temperatureMax: Math.round(data.daily.temperature_2m_max[0]),
        windspeed: Math.round(data.current.wind_speed_10m),
        humidity: data.current.relative_humidity_2m,
        weathercode: data.current.weather_code,
        city: city.name,
        country: city.country,
        admin1: city.admin1,
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
      setWeather(null); // Limpiar el clima en caso de error
    } finally {
      setLoading(false);
    }
  };

  // Obtener clima por coordenadas (para el mapa)
  const fetchWeatherByCoordinates = async (latitude: number, longitude: number, placeName?: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
      );
      const data = await response.json();
      
      // Intentar obtener el nombre completo para la visualización del clima
      const weatherCityName = placeName || `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
      
      setWeather({
        temperature: Math.round(data.current.temperature_2m),
        temperatureMin: Math.round(data.daily.temperature_2m_min[0]),
        temperatureMax: Math.round(data.daily.temperature_2m_max[0]),
        windspeed: Math.round(data.current.wind_speed_10m),
        humidity: data.current.relative_humidity_2m,
        weathercode: data.current.weather_code,
        city: weatherCityName,
        country: "Coordenadas",
      });
      
      // Limpiar búsqueda si se usa el mapa
      setSearchTerm("");
      
      toast({
        title: "¡Clima actualizado!",
        description: `Datos del clima en ${weatherCityName}`,
      });
    } catch (error) {
      console.error("Error obteniendo clima:", error);
      toast({
        title: "Error",
        description: "No se pudo obtener el clima para esas coordenadas",
        variant: "destructive",
      });
      setWeather(null); // Limpiar el clima en caso de error
    } finally {
      setLoading(false);
    }
  };

  const WeatherIcon = weather ? weatherCodeToIcon(weather.weathercode) : Cloud;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Buscador y Mapa */}
      <div className="relative" ref={dropdownRef}>
        <div className="relative">
          {/* Aquí iría la barra de búsqueda de ciudades si se mantuviera */}
          {/* Pero para simplificar con el mapa, lo dejamos centrado en el mapa */}
          <MapWeatherSearch onLocationSelect={fetchWeatherByCoordinates} />
        </div>

        {/* Dropdown de ciudades (Mantenido por si se agrega la barra de búsqueda superior) */}
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
                  <span className="text-muted-foreground text-sm">
                    {city.admin1 && ` - ${city.admin1},`} {city.country}
                  </span>
                </div>
              </button>
            ))}
          </Card>
        )}
      </div>

      {/* Resultado del clima - 3. Aplicar la referencia al div contenedor */}
      <div ref={weatherCardRef}>
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
                  <p className="text-muted-foreground text-lg">
                    {weather.admin1 && `${weather.admin1}, `}{weather.country}
                  </p>
                </div>
                <WeatherIcon className="w-20 h-20 text-primary" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="flex items-center gap-3">
                  <Thermometer className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">
                      <span className="text-blue-500">{weather.temperatureMin}°</span>
                      <span className="text-muted-foreground mx-2">/</span>
                      <span className="text-red-500">{weather.temperatureMax}°</span>
                    </p>
                    <p className="text-sm text-muted-foreground">Mín / Máx de hoy</p>
                    <p className="text-lg font-medium mt-1">Actual: {weather.temperature}°</p>
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
                <p className="text-lg text-muted-foreground">
                  {getFedeComment(weather.temperature, weather.weathercode)}
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>

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
