import { NextRequest, NextResponse } from 'next/server';

// UAE cities with their coordinates and IDs
const UAE_CITIES = [
    { id: 1, name: 'Abu Dhabi', latitude: 24.4539, longitude: 54.3773 },
    { id: 2, name: 'Dubai', latitude: 25.2048, longitude: 55.2708 },
    { id: 3, name: 'Sharjah', latitude: 25.3463, longitude: 55.4209 },
    { id: 4, name: 'Ajman', latitude: 25.4052, longitude: 55.5136 },
    { id: 5, name: 'Umm Al Quwain', latitude: 25.5653, longitude: 55.5553 },
    { id: 6, name: 'Ras Al Khaimah', latitude: 25.7895, longitude: 55.9432 },
    { id: 7, name: 'Fujairah', latitude: 25.1288, longitude: 56.3265 },
    { id: 8, name: 'Al Ain', latitude: 24.2075, longitude: 55.7447 },
    { id: 9, name: 'Khor Fakkan', latitude: 25.3313, longitude: 56.3417 },
    { id: 10, name: 'Dibba Al-Fujairah', latitude: 25.5922, longitude: 56.2617 },
    { id: 11, name: 'Kalba', latitude: 25.0755, longitude: 56.3550 },
    { id: 12, name: 'Dhaid', latitude: 25.2881, longitude: 55.8817 },
    { id: 13, name: 'Masafi', latitude: 25.3157, longitude: 56.1667 },
    { id: 14, name: 'Hatta', latitude: 24.8000, longitude: 56.1167 },
    { id: 15, name: 'Liwa Oasis', latitude: 23.1333, longitude: 53.7833 }
];

// Basic authentication function
function authenticateRequest(request: NextRequest): boolean {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Basic ')) {
        return false;
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    return username === 'fazil' && password === 'fazil@123';
}

export async function GET(request: NextRequest) {
    try {
        // Check authentication
        if (!authenticateRequest(request)) {
            return NextResponse.json({
                success: false,
                error: 'Authentication required',
                message: 'Please provide valid username and password in Authorization header'
            }, {
                status: 401,
                headers: {
                    'Content-Type': 'application/json',
                    'WWW-Authenticate': 'Basic realm="UAE Prayer Times API"'
                }
            });
        }

        return NextResponse.json({
            success: true,
            data: {
                totalCities: UAE_CITIES.length,
                cities: UAE_CITIES.map(city => ({
                    id: city.id,
                    name: city.name,
                    coordinates: {
                        latitude: city.latitude,
                        longitude: city.longitude
                    }
                }))
            },
            meta: {
                generatedAt: new Date().toISOString()
            }
        }, {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            }
        });

    } catch (error) {
        console.error('Error fetching cities:', error);

        return NextResponse.json({
            success: false,
            error: 'Failed to fetch cities',
            message: 'An error occurred while processing the request'
        }, {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
    });
} 