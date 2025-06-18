'use client';

import { useState, useEffect } from 'react';

interface PrayerTimes {
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

interface CityData {
  city: string;
  date: string;
  prayerTimes: PrayerTimes;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

interface ApiResponse {
  success: boolean;
  data: {
    date: string;
    totalCities: number;
    cities: CityData[];
  };
  meta: {
    calculationMethod: string;
    timezone: string;
    generatedAt: string;
  };
}

export default function Home() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPrayerTimes();
  }, []);

  const fetchPrayerTimes = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/prayer-times');
      const result = await response.json();
      
      if (result.success) {
        setData(result);
      } else {
        setError(result.message || 'Failed to fetch prayer times');
      }
    } catch (err) {
      setError('Failed to fetch prayer times');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading prayer times...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">Error</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchPrayerTimes}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            UAE Prayer Times
          </h1>
          <p className="text-gray-600">
            Daily prayer times for cities across the United Arab Emirates
          </p>
          {data && (
            <div className="mt-4 text-sm text-gray-500">
              <p>Date: {data.data.date}</p>
              <p>Calculation Method: {data.meta.calculationMethod}</p>
              <p>Timezone: {data.meta.timezone}</p>
            </div>
          )}
        </header>

        {data && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.data.cities.map((city) => (
              <div
                key={city.city}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                  {city.city}
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Fajr</span>
                    <span className="text-lg font-semibold text-indigo-600">
                      {city.prayerTimes.fajr}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Dhuhr</span>
                    <span className="text-lg font-semibold text-indigo-600">
                      {city.prayerTimes.dhuhr}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Asr</span>
                    <span className="text-lg font-semibold text-indigo-600">
                      {city.prayerTimes.asr}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Maghrib</span>
                    <span className="text-lg font-semibold text-indigo-600">
                      {city.prayerTimes.maghrib}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium text-gray-700">Isha</span>
                    <span className="text-lg font-semibold text-indigo-600">
                      {city.prayerTimes.isha}
                    </span>
                  </div>
                </div>
                <div className="mt-4 text-xs text-gray-500 text-center">
                  {city.coordinates.latitude.toFixed(4)}, {city.coordinates.longitude.toFixed(4)}
                </div>
              </div>
            ))}
          </div>
        )}

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>
            Prayer times are calculated using the Umm Al-Qura University method
          </p>
          <p className="mt-2">
            API Endpoints: /api/prayer-times (all cities) | /api/prayer-times/[city] (specific city)
          </p>
        </footer>
      </div>
    </div>
  );
} 