
import type { NavigatorScreenParams } from '@react-navigation/native';

export interface Listing {
  id: string;
  name: string;
  category: 'Services' | 'Rentals' | 'Shops';
  subcategory?: string;
  keywords?: string[];
  description: string;
  location: string;
  price: string;
  rating: string;
}

export type RootTabParamList = {
  Home: undefined;
  Explore: {
    category?: 'All' | 'Services' | 'Rentals' | 'Shops';
    searchQuery?: string;
  } | undefined;
  Bookings: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<RootTabParamList> | undefined;

  ListingDetails: {
    listing: Listing;
  };

  AddListing: undefined;
};
