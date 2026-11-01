import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
    TextInput,
   Alert,
} from 'react-native';

import {
  ChevronRight,
  ArrowUpRight,
  Wrench,
  CarFront,
  Store,
  Tractor,
  PartyPopper,
  Utensils,
  Music2,
  Tent,
  Home,
  Compass,
  ClipboardList,
  UserRound,
    Truck,
   Search,
  SlidersHorizontal,
} from 'lucide-react-native';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/listing';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../components/AppHeader';
import SearchBar from '../components/SearchBar';
import CategoryCard from '../components/CategoryCard';

// Main categories
const categories = [
  {
    title: 'Services',
    subtitle: 'Local professionals',
    icon: Wrench,
  },
  {
    title: 'Rentals',
    subtitle: 'Vehicles & equipment',
    icon: CarFront,
  },
  {
    title: 'Shops',
    subtitle: 'Products near you',
    icon: Store,
  },
];

// Popular rural services
const popularServices = [
  {
    title: 'Wedding & Events',
    subtitle: 'Make your occasion special',
    icon: PartyPopper,
    color: '#FDF1E5',
  },
  {
    title: 'Food & Catering',
    subtitle: 'Food for every occasion',
    icon: Utensils,
    color: '#F1F0FA',
  },
  {
    title: 'DJ & Sound',
    subtitle: 'Music and sound systems',
    icon: Music2,
    color: '#EAF3F8',
  },
  {
    title: 'Tent & Decoration',
    subtitle: 'Setup for your celebrations',
    icon: Tent,
    color: '#F7EFEA',
  },
];

// Example rental listings
const rentalItems = [
  {
    title: 'Cars & SUVs',
    subtitle: 'Scorpio, Bolero and more',
    icon: CarFront,
  },
  {
    title: 'Tractors',
    subtitle: 'Agriculture and field work',
    icon: Tractor,
  },
  {
    title: 'Goods Vehicles',
    subtitle: 'Pickup, mini truck and more',
    icon: Truck,
  },
];

export default function HomeScreen() {
    const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [searchQuery, setSearchQuery] = useState('');

  const openExplore = (
    category: 'All' | 'Services' | 'Rentals' | 'Shops' = 'All',
    query = '',
  ) => {
    navigation.navigate('MainTabs', {
      screen: 'Explore',
      params: {
        category,
        searchQuery: query,
      },
    });
  };
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}
        <AppHeader />

        {/* GREETING */}
        <View style={styles.greeting}>
          <Text style={styles.eyebrow}>
            YOUR LOCAL MARKETPLACE
          </Text>

          <Text style={styles.heading}>
            Everything nearby.
            {'\n'}
            <Text style={styles.headingLight}>
              Just a tap away.
            </Text>
          </Text>

          <Text style={styles.description}>
            Find local services, rent vehicles and equipment,
            and discover shops around your village.
          </Text>
        </View>

        {/* SEARCH BAR */}
        <View style={styles.homeSearch}>
  <Search size={20} color="#737373" />

  <TextInput
    style={styles.homeSearchInput}
    placeholder="What are you looking for?"
    placeholderTextColor="#A3A3A3"
    value={searchQuery}
    onChangeText={setSearchQuery}
    returnKeyType="search"
    onSubmitEditing={() => openExplore('All', searchQuery)}
  />

  <Pressable onPress={() => openExplore('All', searchQuery)}>
    <SlidersHorizontal size={19} color="#525252" />
  </Pressable>
</View>

        {/* MAIN CATEGORIES */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>
                Explore GramSeva
              </Text>

              <Text style={styles.sectionSubtitle}>
                What do you need today?
              </Text>
            </View>
          </View>

          <View style={styles.categoryGrid}>
            {categories.map((category) => (
              <CategoryCard
                key={category.title}
                title={category.title}
                subtitle={category.subtitle}
                icon={category.icon}
               onPress={() =>
  openExplore(
    category.title as 'Services' | 'Rentals' | 'Shops'
  )
}
              />
            ))}
          </View>
        </View>

        {/* WEDDING AND EVENTS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>
                For your special occasions
              </Text>

              <Text style={styles.sectionSubtitle}>
                Plan everything in one place
              </Text>
            </View>

            <Pressable style={styles.seeAll}>
              <Text style={styles.seeAllText}>Explore</Text>
              <ChevronRight size={16} color="#171717" />
            </Pressable>
          </View>

          <View style={styles.serviceList}>
            {popularServices.map((service) => {
              const Icon = service.icon;

              return (
                <Pressable
  key={service.title}
  style={styles.serviceCard}
  onPress={() => openExplore('Services', service.title)}
>
                  <View
                    style={[
                      styles.serviceIcon,
                      { backgroundColor: service.color },
                    ]}
                  >
                    <Icon size={23} color="#262626" />
                  </View>

                  <View style={styles.serviceInfo}>
                    <Text style={styles.serviceTitle}>
                      {service.title}
                    </Text>

                    <Text style={styles.serviceSubtitle}>
                      {service.subtitle}
                    </Text>
                  </View>

                  <ChevronRight
                    size={20}
                    color="#A3A3A3"
                  />
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* RENTALS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>
                Rentals around you
              </Text>

              <Text style={styles.sectionSubtitle}>
                Vehicles and equipment for every need
              </Text>
            </View>

            <Pressable style={styles.seeAll}>
              <Text style={styles.seeAllText}>See all</Text>
              <ChevronRight size={16} color="#171717" />
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.rentalList}
          >
            {rentalItems.map((item) => {
              const Icon = item.icon;

              return (
                <Pressable
  key={item.title}
  style={styles.rentalCard}
  onPress={() => openExplore('Rentals', item.title)}
>
                  <View style={styles.rentalIcon}>
                    <Icon size={25} color="#171717" />
                  </View>

                  <Text style={styles.rentalTitle}>
                    {item.title}
                  </Text>

                  <Text style={styles.rentalSubtitle}>
                    {item.subtitle}
                  </Text>

                  <View style={styles.rentalArrow}>
                    <ArrowUpRight
                      size={17}
                      color="#525252"
                    />
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* LOCAL BUSINESS CTA */}
        <View style={styles.businessBanner}>
          <View style={styles.businessIcon}>
            <Store size={24} color="#FFFFFF" />
          </View>

          <View style={styles.businessInfo}>
            <Text style={styles.businessTitle}>
              Have a service or shop?
            </Text>

            <Text style={styles.businessSubtitle}>
              List your business on GramSeva.
            </Text>
          </View>

          <ChevronRight size={21} color="#FFFFFF" />
        </View>

        {/* FOOTER */}
        <Text style={styles.footer}>
          MADE FOR LOCAL COMMUNITIES
        </Text>
      </ScrollView>

     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    },
    homeSearch: {
  height: 57,
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#E5E5E5',
  borderRadius: 15,
  paddingHorizontal: 14,
  backgroundColor: '#FAFAFA',
  gap: 10,
  marginBottom: 24,
},

homeSearchInput: {
  flex: 1,
  fontSize: 13,
  color: '#171717',
},

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 45,
  },

  greeting: {
    marginTop: 27,
    marginBottom: 22,
  },

  eyebrow: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: '#737373',
    marginBottom: 12,
  },

  heading: {
    fontSize: 32,
    lineHeight: 39,
    fontWeight: '800',
    color: '#171717',
    letterSpacing: -1,
  },

  headingLight: {
    color: '#737373',
    fontWeight: '500',
  },

  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#737373',
    marginTop: 12,
  },

  section: {
    marginBottom: 32,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#171717',
    letterSpacing: -0.4,
  },

  sectionSubtitle: {
    fontSize: 12,
    color: '#737373',
    marginTop: 5,
  },

  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  seeAll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },

  seeAllText: {
    fontSize: 12,
    color: '#171717',
    fontWeight: '600',
  },

  serviceList: {
    gap: 10,
  },

  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 13,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    backgroundColor: '#FFFFFF',
  },

  serviceIcon: {
    width: 49,
    height: 49,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  serviceInfo: {
    flex: 1,
    marginLeft: 13,
  },

  serviceTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#171717',
  },

  serviceSubtitle: {
    fontSize: 11,
    color: '#737373',
    marginTop: 4,
  },

  rentalList: {
    gap: 12,
    paddingRight: 5,
  },

  rentalCard: {
    width: 165,
    minHeight: 142,
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    backgroundColor: '#FAFAFA',
  },

  rentalIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },

  rentalTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#171717',
  },

  rentalSubtitle: {
    fontSize: 11,
    lineHeight: 16,
    color: '#737373',
    marginTop: 5,
  },

  rentalArrow: {
    position: 'absolute',
    top: 15,
    right: 13,
  },

  businessBanner: {
    backgroundColor: '#171717',
    borderRadius: 19,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },

  businessIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: '#383838',
    alignItems: 'center',
    justifyContent: 'center',
  },

  businessInfo: {
    flex: 1,
    marginLeft: 12,
  },

  businessTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  businessSubtitle: {
    fontSize: 11,
    color: '#BDBDBD',
    marginTop: 4,
  },

  footer: {
    textAlign: 'center',
    color: '#A3A3A3',
    fontSize: 10,
    letterSpacing: 1.5,
    marginBottom: 8,
  },

});