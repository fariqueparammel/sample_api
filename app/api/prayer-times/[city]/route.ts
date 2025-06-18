import { NextRequest, NextResponse } from 'next/server';
import { Coordinates, CalculationMethod, PrayerTimes } from 'adhan';
import { format } from 'date-fns';

// UAE cities with their coordinates
const UAE_CITIES = [
    { name: 'Abu Dhabi', latitude: 24.4539, longitude: 54.3773 },
    { name: 'Dubai', latitude: 25.2048, longitude: 55.2708 },
    { name: 'Sharjah', latitude: 25.3463, longitude: 55.4209 },
    { name: 'Ajman', latitude: 25.4052, longitude: 55.5136 },
    { name: 'Umm Al Quwain', latitude: 25.5653, longitude: 55.5553 },
    { name: 'Ras Al Khaimah', latitude: 25.7895, longitude: 55.9432 },
    { name: 'Fujairah', latitude: 25.1288, longitude: 56.3265 },
    { name: 'Al Ain', latitude: 24.2075, longitude: 55.7447 },
    { name: 'Khor Fakkan', latitude: 25.3313, longitude: 56.3417 },
    { name: 'Dibba Al-Fujairah', latitude: 25.5922, longitude: 56.2617 },
    { name: 'Kalba', latitude: 25.0755, longitude: 56.3550 },
    { name: 'Dhaid', latitude: 25.2881, longitude: 55.8817 },
    { name: 'Masafi', latitude: 25.3157, longitude: 56.1667 },
    { name: 'Hatta', latitude: 24.8000, longitude: 56.1167 },
    { name: 'Liwa Oasis', latitude: 23.1333, longitude: 53.7833 }
];

interface PrayerTimeData {
    city: string;
    date: string;
    prayerTimes: {
        fajr: string;
        dhuhr: string;
        asr: string;
        maghrib: string;
        isha: string;
    };
    coordinates: {
        latitude: number;
        longitude: number;
    };
}

export async function GET(
    request: NextRequest,
    { params }: { params: { city: string } }
) {
    try {
        const cityName = decodeURIComponent(params.city);
        const today = new Date();
        const formattedDate = format(today, 'yyyy-MM-dd');

        // Find the city in our list (case-insensitive)
        const city = UAE_CITIES.find(
            c => c.name.toLowerCase() === cityName.toLowerCase()
        );

        if (!city) {
            return NextResponse.json({
                success: false,
                error: 'City not found',
                message: `City '${cityName}' not found in UAE cities list`,
                availableCities: UAE_CITIES.map(c => c.name)
            }, {
                status: 404,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        const coordinates = new Coordinates(city.latitude, city.longitude);
        const params_calc = CalculationMethod.UmmAlQura();
        const prayerTimes = new PrayerTimes(coordinates, today, params_calc);

        const prayerTimeData: PrayerTimeData = {
            city: city.name,
            date: formattedDate,
            prayerTimes: {
                fajr: format(prayerTimes.fajr, 'HH:mm'),
                dhuhr: format(prayerTimes.dhuhr, 'HH:mm'),
                asr: format(prayerTimes.asr, 'HH:mm'),
                maghrib: format(prayerTimes.maghrib, 'HH:mm'),
                isha: format(prayerTimes.isha, 'HH:mm')
            },
            coordinates: {
                latitude: city.latitude,
                longitude: city.longitude
            }
        };

        return NextResponse.json({
            success: true,
            data: prayerTimeData,
            meta: {
                calculationMethod: 'Umm Al-Qura University, Makkah',
                timezone: 'Gulf Standard Time (GST)',
                generatedAt: new Date().toISOString()
            }
        }, {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=3600',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        });

    } catch (error) {
        console.error('Error calculating prayer times:', error);

        return NextResponse.json({
            success: false,
            error: 'Failed to calculate prayer times',
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
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    });
} 