"use client";

import React, { useEffect, useMemo, useState } from "react";
import { getStravaAdapter } from "../StravaAdapter";

interface Activity {
  start_date: string;
  distance: string;
}

function isLeapYear(date: Date) {
  const year = date.getFullYear();
  return year % 4 === 0
    ? year % 100 === 0
      ? year % 400 === 0
        ? true
        : false
      : true
    : false;
}

/**
 *
 * @param date the date to compute from
 * @param weekAgo the week number
 * @param dayOfWeek
 * @returns
 */
const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function lastDayOfMonth(monthIdx: number, leapYear = false) {
  if (monthIdx == 1 && leapYear) {
    return 29;
  }
  return monthDays[monthIdx];
}
const computeDateFromDiff = (date: Date, diff: number): Date => {
  // console.assert(diff < 0);

  if (diff > date.getDate()) {
    let newMonth = date.getMonth() - 1;
    let newYear = date.getFullYear();
    if (date.getMonth() == 0) {
      newMonth = 11;
      newYear--;
    }
    return computeDateFromDiff(
      new Date(newYear, newMonth, lastDayOfMonth(newMonth, isLeapYear(date))),
      diff - date.getDate()
    );
  } else {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - diff);
  }
};

const getMaxValue = (metric: keyof Activity, activities: Activity[]) => {
  return Math.max(
    ...activities.map((activity) => parseFloat(activity[metric]))
  );
};
const calculateNormalizedWeight = (
  activity: Activity,
  activities: Activity[],
  metric: keyof Activity
) => {
  const dayValue = parseFloat(activity[metric]);
  const maxValue = getMaxValue(metric, activities);
  return dayValue / maxValue;
};

const ActivityGraph = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchActivities = async () => {
    setLoading(true);
    
    try {
      const activities = await getStravaAdapter().getAllActivities();
      setActivities(activities || []);
    } catch (error) {
      console.error("Failed to fetch activities:", error);
      setActivities([]);
    }
    
    setLoading(false);
  };
  useEffect(() => {
    fetchActivities();
  }, []);

  const tableRows = useMemo(() => {
    const today = new Date();
    const rows = [];
    for (let day = 0; day < 7; day++) {
      const cells = [];
      for (let week = 0; week < 52; week++) {
        const dayOffset = today.getDay() - day;
        if (week === 0 && dayOffset < 0) {
          continue;
        }
        const dayDiff = week * 7 + dayOffset;
        const cellDay = computeDateFromDiff(today, dayDiff);
        console.log(cellDay, activities);
        const matchingActivityDays = activities.filter(
          (ad) =>
            new Date(ad.start_date).toDateString() == cellDay.toDateString()
        );
        console.log(matchingActivityDays);

        const getDayColor = (activity: Activity) => {
          const normalizedWeight = calculateNormalizedWeight(
            activity,
            activities,
            "distance"
          );
          return `hsl(200, 100%, ${50 - normalizedWeight * 90}%)`;
        };

        cells.unshift(
          <td
            key={week}
            title={cellDay.toDateString()}
            className="w-3 h-3 rounded-sm m-1"
            style={{
              backgroundColor:
                matchingActivityDays.length > 0
                  ? getDayColor(matchingActivityDays[0])
                  : "rgba(131, 131, 131, 0.5)",
            }}
          ></td>
        );
      }
      rows.push(
        <tr className="" key={day}>
          {cells}
        </tr>
      );
    }
    return rows;
  }, [activities]);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="border-spacing-1 border-separate">
          <tbody className="">{tableRows}</tbody>
        </table>
      )}
    </div>
  );
};

export default ActivityGraph;
