import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import * as IntentLauncher from 'expo-intent-launcher';
import api from '../api/api';

const LOCATION_TASK_NAME = 'background-location-task';

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.log("BACKGROUND ERROR", error);
    return;
  }

  if (data) {
    const { locations } = data;
    const location = locations[0];

    if (location) {
      const employeeData = await AsyncStorage.getItem("employee");

      if (!employeeData) {
        return;
      }

      const employee = JSON.parse(employeeData);
      const latitude = location.coords.latitude;
      const longitude = location.coords.longitude;

      const addressData = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });

      let address = "Unknown";

      if (addressData.length > 0) {
        const place = addressData[0];
        address = [
          place.name,
          place.street,
          place.district,
          place.city,
          place.region
        ]
          .filter(Boolean)
          .join(", ");
      }

      await api.post("/locations/add", {
        employee_id: employee.id,
        latitude,
        longitude,
        address,
        type: "TRACKING"
      });

      console.log("BACKGROUND LOCATION SAVED");
    }
  }
});

export const startBackgroundTracking = async () => {
  const foreground = await Location.requestForegroundPermissionsAsync();

  if (foreground.status !== "granted") {
    console.log("FOREGROUND DENIED");
    return;
  }

  const background = await Location.requestBackgroundPermissionsAsync();

  if (background.status !== "granted") {
    console.log("BACKGROUND DENIED");
    return;
  }

  // Request battery optimization exemption
  if (Platform.OS === 'android') {
    try {
      await IntentLauncher.startActivityAsync(
        IntentLauncher.ActivityAction.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS,
        { data: 'com.siddzz.MobileFinal' } // replace with your package name
      );
    } catch (e) {
      console.log('Battery optimization request failed:', e);
    }
  }

  const started = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);

  if (!started) {
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.BestForNavigation,
      timeInterval: 900000, // 15 minutes
      distanceInterval: 0,
      pausesUpdatesAutomatically: false,
      foregroundService: {
        notificationTitle: "Workforce Tracking Active",
        notificationBody: "Location running in background",
        notificationColor: "#2563EB",
        killServiceOnDestroy: false
      }
    });

    console.log("BACKGROUND TRACKING STARTED");
  }
};

export const stopBackgroundTracking = async () => {
  const started = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);

  if (started) {
    await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
    console.log("BACKGROUND TRACKING STOPPED");
  }
};