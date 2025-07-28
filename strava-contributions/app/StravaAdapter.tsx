let instance: StravaAdapter | null;
class StravaAdapter {
  access_token: string;

  constructor() {
    this.access_token = localStorage.getItem("strava_token") || "";
  }

  refeshAccessToken() {
    return;
  }

  async getAllActivities() {
    try {
      const response = await fetch('/api/activities', {
        headers: {
          Authorization: `Bearer ${this.access_token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error fetching activities:", error);
      return [];
    }
  }

  // Keep for backward compatibility
  getActivitiesPage(page?: number) {
    return fetch(
      `https://www.strava.com/api/v3/athlete/activities?per_page=100${
        page ? `&page=${page}` : ""
      }`,
      {
        headers: {
          Authorization: `Bearer ${this.access_token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch(() => {
        console.log("Error fetching activities");
      });
  }
}

export function getStravaAdapter() {
  if (instance) return instance;
  else {
    instance = new StravaAdapter();
    return instance;
  }
}
