import fs from 'fs';
import path from 'path';

const CACHE_DIR = path.join(process.cwd(), '.cache');
const ACTIVITIES_CACHE_FILE = path.join(CACHE_DIR, 'activities.json');

export interface CachedData {
  activities: any[];
  timestamp: number;
  token: string;
}

export class ActivityCache {
  static ensureCacheDir() {
    if (!fs.existsSync(CACHE_DIR)) {
      fs.mkdirSync(CACHE_DIR, { recursive: true });
    }
  }

  static saveActivities(activities: any[], token: string) {
    this.ensureCacheDir();
    const cacheData: CachedData = {
      activities,
      timestamp: Date.now(),
      token
    };
    fs.writeFileSync(ACTIVITIES_CACHE_FILE, JSON.stringify(cacheData, null, 2));
  }

  static loadActivities(): CachedData | null {
    try {
      if (!fs.existsSync(ACTIVITIES_CACHE_FILE)) {
        return null;
      }
      const data = fs.readFileSync(ACTIVITIES_CACHE_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading cached activities:', error);
      return null;
    }
  }

  static isCacheValid(maxAgeHours = 24): boolean {
    const cached = this.loadActivities();
    if (!cached) return false;
    
    const ageHours = (Date.now() - cached.timestamp) / (1000 * 60 * 60);
    return ageHours < maxAgeHours;
  }

  static clearCache() {
    if (fs.existsSync(ACTIVITIES_CACHE_FILE)) {
      fs.unlinkSync(ACTIVITIES_CACHE_FILE);
    }
  }
}