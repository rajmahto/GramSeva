import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import {
  House,
  Compass,
  ClipboardList,
  UserRound,
} from 'lucide-react-native';

import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import BookingsScreen from '../screens/BookingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ListingDetailsScreen from '../screens/ListingDetailsScreen';
import AddListingScreen from '../screens/AddListingScreen';

import type { RootStackParamList } from '../types/listing';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#171717',
        tabBarInactiveTintColor: '#A3A3A3',

        tabBarStyle: {
          height: 68,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#EEEEEE',
          paddingBottom: 5,
          paddingTop: 5,
        },

        tabBarLabelStyle: {
          fontSize: 10,
        },

        tabBarIcon: ({ color, size }) => {
          const props = { size: size + 2, color, strokeWidth: 2 };

          switch (route.name) {
            case 'Home':
              return <House {...props} />;
            case 'Explore':
              return <Compass {...props} />;
            case 'Bookings':
              return <ClipboardList {...props} />;
            case 'Profile':
              return <UserRound {...props} />;
            default:
              return null;
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Bookings" component={BookingsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabs} />

        <Stack.Screen
          name="ListingDetails"
          component={ListingDetailsScreen}
        />

        <Stack.Screen
          name="AddListing"
          component={AddListingScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}