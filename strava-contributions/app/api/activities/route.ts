import { NextRequest, NextResponse } from 'next/server';
import { ActivityCache } from '../../../utils/cache';

export async function GET(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  try {
    // Check if we have valid cached data
    const cached = ActivityCache.loadActivities();
    if (cached && ActivityCache.isCacheValid() && cached.token === token) {
      console.log('Returning cached activities');
      return NextResponse.json(cached.activities);
    }

    console.log('Fetching fresh activities from Strava API');
    
    // Fetch fresh data from Strava
    let allActivities: any[] = [];
    
    for (let page = 1; page <= 5; page++) {
      const response = await fetch(
        `https://www.strava.com/api/v3/athlete/activities?per_page=100&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Strava API error: ${response.status}`);
      }

      const activities = await response.json();
      
      if (activities.length === 0) {
        break; // No more activities
      }
      
      allActivities = allActivities.concat(activities);
    }

    // Cache the activities
    ActivityCache.saveActivities(allActivities, token);
    
    return NextResponse.json(allActivities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    
    // Try to return cached data as fallback
    const cached = ActivityCache.loadActivities();
    if (cached) {
      console.log('API failed, returning cached activities');
      return NextResponse.json(cached.activities);
    }
    
    return NextResponse.json({ error: 'Failed to fetch activities' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    ActivityCache.clearCache();
    return NextResponse.json({ message: 'Cache cleared' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to clear cache' }, { status: 500 });
  }
}