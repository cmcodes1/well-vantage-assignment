import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '@/screens/Home/HomeScreen';
import AddWorkoutPlanScreen from '@/screens/Workout/AddWorkoutPlanScreen';
import SetAvailabilityScreen from '@/screens/Availability/SetAvailabilityScreen';
import BookClientSlotsScreen from '@/screens/Availability/BookClientSlotsScreen';
import type {MainStackParamList} from '@/types/navigation';

const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainTabNavigator: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      animation: 'slide_from_right',
    }}>
    <Stack.Screen name="HomeTabs" component={HomeScreen} />
    <Stack.Screen name="AddWorkoutPlan" component={AddWorkoutPlanScreen} />
    <Stack.Screen name="SetAvailability" component={SetAvailabilityScreen} />
    <Stack.Screen name="BookClientSlots" component={BookClientSlotsScreen} />
  </Stack.Navigator>
);
