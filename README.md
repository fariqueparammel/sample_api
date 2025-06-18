# UAE Prayer Times API

A Next.js API that provides prayer times for cities across the United Arab Emirates (UAE). The API calculates accurate prayer times using the Umm Al-Qura University method and returns data in a clean JSON format.

## Features

- **15 UAE Cities**: Includes major cities like Abu Dhabi, Dubai, Sharjah, and more
- **City IDs**: Each city has a unique ID for easy API access
- **Basic Authentication**: Secure access with username and password
- **Accurate Calculations**: Uses the adhan library with Umm Al-Qura University method
- **Real-time Data**: Calculates prayer times for the current date
- **RESTful API**: Clean JSON responses with proper HTTP status codes
- **CORS Enabled**: Ready for frontend and mobile app integration
- **Beautiful UI**: Modern, responsive frontend to display prayer times

## Authentication

The API uses Basic Authentication with the following credentials:
- **Username**: `fazil`
- **Password**: `fazil@123`

Include the Authorization header in your requests:
```
Authorization: Basic ZmF6aWw6ZmF6aWxAMTIz
```

## Prayer Times Included

- **Fajr** (Dawn prayer)
- **Dhuhr** (Noon prayer)
- **Asr** (Afternoon prayer)
- **Maghrib** (Sunset prayer)
- **Isha** (Night prayer)

## API Endpoints

### 1. Get All Cities List
```
GET /api/cities
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalCities": 15,
    "cities": [
      {
        "id": 1,
        "name": "Abu Dhabi",
        "coordinates": {
          "latitude": 24.4539,
          "longitude": 54.3773
        }
      }
    ]
  },
  "meta": {
    "generatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### 2. Get All Cities Prayer Times
```
GET /api/prayer-times
```

**Response:**
```json
{
  "success": true,
  "data": {
    "date": "2024-01-15",
    "totalCities": 15,
    "cities": [
      {
        "cityId": 1,
        "city": "Abu Dhabi",
        "date": "2024-01-15",
        "prayerTimes": {
          "fajr": "05:45",
          "dhuhr": "12:15",
          "asr": "15:30",
          "maghrib": "17:45",
          "isha": "19:15"
        },
        "coordinates": {
          "latitude": 24.4539,
          "longitude": 54.3773
        }
      }
    ]
  },
  "meta": {
    "calculationMethod": "Umm Al-Qura University, Makkah",
    "timezone": "Gulf Standard Time (GST)",
    "generatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### 3. Get Specific City Prayer Times
```
GET /api/prayer-times/[city]
```

**Examples:**
- `/api/prayer-times/dubai` (by name)
- `/api/prayer-times/2` (by ID)

**Response:**
```json
{
  "success": true,
  "data": {
    "cityId": 2,
    "city": "Dubai",
    "date": "2024-01-15",
    "prayerTimes": {
      "fajr": "05:42",
      "dhuhr": "12:12",
      "asr": "15:27",
      "maghrib": "17:42",
      "isha": "19:12"
    },
    "coordinates": {
      "latitude": 25.2048,
      "longitude": 55.2708
    }
  },
  "meta": {
    "calculationMethod": "Umm Al-Qura University, Makkah",
    "timezone": "Gulf Standard Time (GST)",
    "generatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

## Available Cities

| ID | City Name |
|----|-----------|
| 1  | Abu Dhabi |
| 2  | Dubai |
| 3  | Sharjah |
| 4  | Ajman |
| 5  | Umm Al Quwain |
| 6  | Ras Al Khaimah |
| 7  | Fujairah |
| 8  | Al Ain |
| 9  | Khor Fakkan |
| 10 | Dibba Al-Fujairah |
| 11 | Kalba |
| 12 | Dhaid |
| 13 | Masafi |
| 14 | Hatta |
| 15 | Liwa Oasis |

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd uae-prayer-times-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage Examples

### JavaScript/TypeScript
```javascript
// Create base64 encoded credentials
const credentials = btoa('fazil:fazil@123');

// Get all cities
const response = await fetch('/api/cities', {
  headers: {
    'Authorization': `Basic ${credentials}`
  }
});
const data = await response.json();

// Get all prayer times
const prayerResponse = await fetch('/api/prayer-times', {
  headers: {
    'Authorization': `Basic ${credentials}`
  }
});
const prayerData = await prayerResponse.json();

// Get specific city by ID
const cityResponse = await fetch('/api/prayer-times/2', {
  headers: {
    'Authorization': `Basic ${credentials}`
  }
});
const cityData = await cityResponse.json();
```

### cURL
```bash
# Get all cities
curl -H "Authorization: Basic ZmF6aWw6ZmF6aWxAMTIz" http://localhost:3000/api/cities

# Get all prayer times
curl -H "Authorization: Basic ZmF6aWw6ZmF6aWxAMTIz" http://localhost:3000/api/prayer-times

# Get specific city by ID
curl -H "Authorization: Basic ZmF6aWw6ZmF6aWxAMTIz" http://localhost:3000/api/prayer-times/2

# Get specific city by name
curl -H "Authorization: Basic ZmF6aWw6ZmF6aWxAMTIz" http://localhost:3000/api/prayer-times/dubai
```

## Technical Details

- **Framework**: Next.js 14 with App Router
- **Prayer Calculation**: adhan library with Umm Al-Qura University method
- **Authentication**: Basic Authentication
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Timezone**: Gulf Standard Time (GST)

## Error Handling

The API returns appropriate HTTP status codes:

- `200`: Success
- `401`: Authentication required
- `404`: City not found (for specific city endpoint)
- `500`: Server error

Error responses include helpful messages and available cities list.

## Caching

The API includes cache headers:
- Prayer times: 1 hour
- Cities list: 24 hours

```
Cache-Control: public, max-age=3600
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please open an issue on the repository. 