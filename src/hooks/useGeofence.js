import { useState } from 'react';

export const useGeofence = () => {
  const [isInside, setIsInside] = useState(false);
  
  // Example School Coordinates (Center of Campus)
  const SCHOOL_LAT = 4.1550; // Replace with your school Lat
  const SCHOOL_LNG = 9.2633; // Replace with your school Lng
  const RADIUS_METERS = 200; // Allowed distance (200 meters)

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    // Formula to calculate distance between two coordinates in meters
    const R = 6371e3; 
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; 
  };

  const verifyLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const dist = calculateDistance(
        pos.coords.latitude, 
        pos.coords.longitude, 
        SCHOOL_LAT, 
        SCHOOL_LNG
      );
      
      setIsInside(dist <= RADIUS_METERS);
    });
  };

  return { isInside, verifyLocation };
};