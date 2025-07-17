// Location detection service with multiple fallback methods
export interface UserLocation {
  city: string;
  province: string;
  lat: number;
  lng: number;
  accuracy?: number;
}

// Ontario cities with their coordinates
export const ONTARIO_CITIES = {
  "Toronto": { lat: 43.6532, lng: -79.3832 },
  "Ottawa": { lat: 45.4215, lng: -75.6972 },
  "Mississauga": { lat: 43.5890, lng: -79.6441 },
  "Brampton": { lat: 43.6831, lng: -79.7663 },
  "Hamilton": { lat: 43.2557, lng: -79.8711 },
  "London": { lat: 42.9849, lng: -81.2453 },
  "Windsor": { lat: 42.3149, lng: -83.0364 },
  "Kitchener": { lat: 43.4516, lng: -80.4925 },
  "Richmond Hill": { lat: 43.8828, lng: -79.4403 },
  "Oakville": { lat: 43.4675, lng: -79.6877 },
  "Burlington": { lat: 43.3255, lng: -79.7990 },
  "Oshawa": { lat: 43.8971, lng: -78.8658 },
  "Barrie": { lat: 44.3894, lng: -79.6903 },
  "St. Catharines": { lat: 43.1594, lng: -79.2469 },
  "Guelph": { lat: 43.5448, lng: -80.2482 },
  "Cambridge": { lat: 43.3616, lng: -80.3144 },
  "Kingston": { lat: 44.2312, lng: -76.4860 },
  "Waterloo": { lat: 43.4643, lng: -80.5204 },
  "Whitby": { lat: 43.8975, lng: -78.9428 },
  "Ajax": { lat: 43.8509, lng: -79.0205 },
  "Pickering": { lat: 43.8384, lng: -79.0868 },
  "Vaughan": { lat: 43.8361, lng: -79.4987 },
  "Markham": { lat: 43.8561, lng: -79.3370 },
  "Scarborough": { lat: 43.7764, lng: -79.2318 },
  "Etobicoke": { lat: 43.6205, lng: -79.5132 },
  "North York": { lat: 43.7615, lng: -79.4111 },
  "York": { lat: 43.6896, lng: -79.4522 },
  "East York": { lat: 43.6947, lng: -79.3279 },
};

// Default location (Toronto)
export const DEFAULT_LOCATION: UserLocation = {
  city: 'Toronto',
  province: 'ON',
  lat: 43.6532,
  lng: -79.3832
};

class LocationService {
  /**
   * Detect user location using multiple methods
   */
  async detectLocation(): Promise<UserLocation> {
    try {
      // Method 1: Browser Geolocation API
      const geolocationResult = await this.getLocationFromGeolocation();
      if (geolocationResult) {
        return geolocationResult;
      }

      // Method 2: IP-based location (free APIs)
      const ipResult = await this.getLocationFromIP();
      if (ipResult) {
        return ipResult;
      }

      // Method 3: Timezone-based estimation
      const timezoneResult = await this.getLocationFromTimezone();
      if (timezoneResult) {
        return timezoneResult;
      }

      // Fallback to default location
      console.warn('All location detection methods failed, using default location');
      return DEFAULT_LOCATION;
    } catch (error) {
      console.error('Location detection failed:', error);
      return DEFAULT_LOCATION;
    }
  }

  /**
   * Get location using browser's Geolocation API
   */
  private async getLocationFromGeolocation(): Promise<UserLocation | null> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          
          try {
            // Try to get city name from coordinates
            const cityName = await this.reverseGeocode(latitude, longitude);
            
            if (cityName && this.isInOntario(latitude, longitude)) {
              resolve({
                city: cityName,
                province: 'ON',
                lat: latitude,
                lng: longitude,
                accuracy
              });
            } else {
              resolve(null);
            }
          } catch (error) {
            console.warn('Reverse geocoding failed:', error);
            resolve(null);
          }
        },
        (error) => {
          console.warn('Geolocation failed:', error);
          resolve(null);
        },
        { 
          timeout: 10000, 
          enableHighAccuracy: false,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  }

  /**
   * Get location using IP address (free APIs)
   */
  private async getLocationFromIP(): Promise<UserLocation | null> {
    try {
      // Try multiple free IP geolocation services
      const services = [
        'https://ipapi.co/json/',
        'https://api.ipify.org?format=json',
        'https://api.myip.com'
      ];

      for (const service of services) {
        try {
          const response = await fetch(service, { 
            method: 'GET',
            headers: { 'Accept': 'application/json' }
          });
          
          if (response.ok) {
            const data = await response.json();
            
            // Check if location is in Ontario, Canada
            if (this.isLocationInOntario(data)) {
              return {
                city: data.city || data.locality || 'Unknown',
                province: 'ON',
                lat: parseFloat(data.latitude) || DEFAULT_LOCATION.lat,
                lng: parseFloat(data.longitude) || DEFAULT_LOCATION.lng
              };
            }
          }
        } catch (error) {
          console.warn(`IP service ${service} failed:`, error);
          continue;
        }
      }
      
      return null;
    } catch (error) {
      console.warn('IP-based location detection failed:', error);
      return null;
    }
  }

  /**
   * Estimate location based on timezone
   */
  private async getLocationFromTimezone(): Promise<UserLocation | null> {
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      
      // Check if timezone indicates Eastern Time (Ontario)
      if (timezone.includes('America/Toronto') || 
          timezone.includes('America/New_York') ||
          timezone.includes('Eastern')) {
        
        // Get current time to determine if it's daylight saving time
        const now = new Date();
        const isDST = this.isDaylightSavingTime(now);
        
        // Return Toronto as default for Eastern Time
        return {
          city: 'Toronto',
          province: 'ON',
          lat: DEFAULT_LOCATION.lat,
          lng: DEFAULT_LOCATION.lng
        };
      }
      
      return null;
    } catch (error) {
      console.warn('Timezone-based location detection failed:', error);
      return null;
    }
  }

  /**
   * Reverse geocode coordinates to get city name
   */
  private async reverseGeocode(lat: number, lng: number): Promise<string | null> {
    try {
      // Try multiple free reverse geocoding services
      const services = [
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`,
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10`
      ];

      for (const service of services) {
        try {
          const response = await fetch(service);
          if (response.ok) {
            const data = await response.json();
            
            // Extract city name from different service formats
            const cityName = data.city || data.locality || data.address?.city || data.address?.town;
            
            if (cityName) {
              return cityName;
            }
          }
        } catch (error) {
          console.warn(`Reverse geocoding service ${service} failed:`, error);
          continue;
        }
      }
      
      return null;
    } catch (error) {
      console.warn('Reverse geocoding failed:', error);
      return null;
    }
  }

  /**
   * Check if coordinates are in Ontario
   */
  private isInOntario(lat: number, lng: number): boolean {
    // Rough bounding box for Ontario
    return lat >= 41.0 && lat <= 57.0 && lng >= -95.0 && lng <= -74.0;
  }

  /**
   * Check if location data indicates Ontario
   */
  private isLocationInOntario(data: any): boolean {
    return (
      data.country_code === 'CA' && 
      (data.region_code === 'ON' || data.region === 'Ontario')
    ) || (
      data.country === 'Canada' && 
      (data.region === 'ON' || data.region === 'Ontario')
    );
  }

  /**
   * Check if current date is during daylight saving time
   */
  private isDaylightSavingTime(date: Date): boolean {
    const jan = new Date(date.getFullYear(), 0, 1);
    const jul = new Date(date.getFullYear(), 6, 1);
    return Math.min(jan.getTimezoneOffset(), jul.getTimezoneOffset()) === date.getTimezoneOffset();
  }

  /**
   * Calculate distance between two coordinates using Haversine formula
   */
  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  /**
   * Get nearest Ontario city to given coordinates
   */
  getNearestOntarioCity(lat: number, lng: number): { city: string; distance: number } {
    let nearestCity = 'Toronto';
    let minDistance = Infinity;

    for (const [city, coords] of Object.entries(ONTARIO_CITIES)) {
      const distance = this.calculateDistance(lat, lng, coords.lat, coords.lng);
      if (distance < minDistance) {
        minDistance = distance;
        nearestCity = city;
      }
    }

    return { city: nearestCity, distance: minDistance };
  }
}

export const locationService = new LocationService(); 