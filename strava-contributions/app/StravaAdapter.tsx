let instance: StravaAdapter | null;
class StravaAdapter {
  access_token: string;

  constructor() {
    this.access_token = localStorage.getItem("strava_token") || "";
  }

  refeshAccessToken() {
    return;
  }

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
