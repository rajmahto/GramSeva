
import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
    Pressable,
   Modal,
} from 'react-native';

import {
  Search,
  SlidersHorizontal,
  Wrench,
  CarFront,
  Store,
  MapPin,
  Star,
} from 'lucide-react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList, Listing } from '../types/listing';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { RootTabParamList } from '../types/listing';

// Available filters
const filters = ['All', 'Services', 'Rentals', 'Shops'] as const;

type FilterType = (typeof filters)[number];

// Temporary demo listings for GramSeva
const listings: Listing[] = [
  // SERVICES
  {
    id: '1',
    name: 'Raj Electrician Services',
    category: 'Services',
    subcategory: 'Electrician',
    keywords: ['electrician', 'electrical', 'wiring', 'fan', 'light', 'repair'],
    description: 'Home wiring, repairs and installation',
    location: 'Chandrapura, Bokaro',
    price: 'Starting ₹300',
    rating: '4.8',
  },
  {
    id: '2',
    name: 'Ramesh Plumbing Services',
    category: 'Services',
    subcategory: 'Plumber',
    keywords: ['plumber', 'plumbing', 'pipe', 'water', 'bathroom', 'tap'],
    description: 'Plumber for bathroom and water pipe repairs',
    location: 'Telo, Bokaro',
    price: 'Starting ₹250',
    rating: '4.6',
  },
  {
    id: '3',
    name: 'Wedding & Events Management',
    category: 'Services',
    subcategory: 'Wedding Planning',
    keywords: ['wedding', 'marriage', 'event', 'planner', 'party', 'function'],
    description: 'Wedding planning and event management',
    location: 'Chandrapura, Bokaro',
    price: 'On request',
    rating: '4.7',
  },
  {
    id: '4',
    name: 'Food & Catering Services',
    category: 'Services',
    subcategory: 'Catering',
    keywords: ['food', 'catering', 'cook', 'cooking', 'marriage', 'party'],
    description: 'Food catering for weddings and parties',
    location: 'Bokaro, Jharkhand',
    price: 'Starting ₹150 / plate',
    rating: '4.5',
  },
  {
    id: '5',
    name: 'DJ & Sound Services',
    category: 'Services',
    subcategory: 'DJ and Sound',
    keywords: ['dj', 'music', 'speaker', 'sound', 'dance', 'light', 'baraat'],
    description: 'DJ, speakers and sound system for events',
    location: 'Telo, Bokaro',
    price: 'Starting ₹3,000',
    rating: '4.6',
  },
  {
    id: '6',
    name: 'Tent & Decoration Services',
    category: 'Services',
    subcategory: 'Tent and Decoration',
    keywords: ['tent', 'decoration', 'decorator', 'lighting', 'wedding', 'marriage'],
    description: 'Tent, lighting and wedding decoration',
    location: 'Chandrapura, Bokaro',
    price: 'On request',
    rating: '4.7',
  },

  // RENTALS
  {
    id: '7',
    name: 'Mahadev Tractor Rental',
    category: 'Rentals',
    subcategory: 'Agriculture Equipment',
    keywords: [
      'tractor',
      'tractors',
      'farming',
      'agriculture',
      'farm',
      'kheti',
      'equipment',
      'rotavator',
    ],
    description: 'Tractors for agriculture and field work',
    location: 'Telo, Bokaro',
    price: '₹800 / hour',
    rating: '4.7',
  },
  {
    id: '8',
    name: 'Village Car Rental',
    category: 'Rentals',
    subcategory: 'Cars and SUVs',
    keywords: [
      'car',
      'cars',
      'suv',
      'suvs',
      'scorpio',
      'bolero',
      'vehicle',
      'wedding car',
      'baraat',
    ],
    description: 'Cars & SUVs including Scorpio and Bolero',
    location: 'Bokaro, Jharkhand',
    price: 'Starting ₹1,500',
    rating: '4.6',
  },
  {
    id: '9',
    name: 'Bharat Goods Vehicles Rental',
    category: 'Rentals',
    subcategory: 'Goods Vehicles',
    keywords: [
      'goods vehicle',
      'pickup',
      'pickups',
      'truck',
      'trucks',
      'mini truck',
      'transport',
      'loading',
    ],
    description: 'Goods Vehicles, pickup and mini truck rental',
    location: 'Chandrapura, Bokaro',
    price: 'Starting ₹700',
    rating: '4.4',
  },

  // SHOPS
  {
    id: '10',
    name: 'Sharma Hardware Store',
    category: 'Shops',
    subcategory: 'Hardware',
    keywords: [
      'hardware',
      'cement',
      'tools',
      'building',
      'construction',
      'paint',
      'materials',
    ],
    description: 'Cement, tools and building materials',
    location: 'Chandrapura, Bokaro',
    price: 'View products',
    rating: '4.5',
  },
  {
    id: '11',
    name: 'Gupta Kirana Store',
    category: 'Shops',
    subcategory: 'Grocery',
    keywords: [
      'kirana',
      'grocery',
      'groceries',
      'ration',
      'food',
      'household',
      'daily needs',
    ],
    description: 'Daily groceries, food and household products',
    location: 'Telo, Bokaro',
    price: 'View products',
    rating: '4.3',
  },
  {
    id: '12',
    name: 'Maa Electrical Store',
    category: 'Shops',
    subcategory: 'Electrical Shop',
    keywords: [
      'electrical',
      'electric',
      'wire',
      'wires',
      'switch',
      'switches',
      'bulb',
      'lights',
      'fan',
    ],
    description: 'Electrical wires, switches, lights and fans',
    location: 'Chandrapura, Bokaro',
    price: 'View products',
    rating: '4.6',
  },
];

type ExploreScreenProps = BottomTabScreenProps<
  RootTabParamList,
  'Explore'
>;

// Normalize search words to handle common plural variations
const normalizeWord = (word: string) => {
  const cleaned = word.toLowerCase().trim();

  if (cleaned.length > 4 && cleaned.endsWith('ies')) {
    return cleaned.slice(0, -3) + 'y';
  }

  if (cleaned.length > 4 && cleaned.endsWith('es')) {
    return cleaned.slice(0, -2);
  }

  if (cleaned.length > 3 && cleaned.endsWith('s') && !cleaned.endsWith('ss')) {
    return cleaned.slice(0, -1);
  }

  return cleaned;
};

const normalizeText = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').trim();

const getNumericPrice = (price: string): number | null => {
  const match = price.replace(/,/g, '').match(/\d+(?:\.\d+)?/);

  return match ? Number(match[0]) : null;
};

export default function ExploreScreen({ route }: ExploreScreenProps) {
  const [selectedFilter, setSelectedFilter] =
    useState<FilterType>(route.params?.category ?? 'All');

  const [searchQuery, setSearchQuery] =
        useState(route.params?.searchQuery ?? '');
    
    const [filterVisible, setFilterVisible] = useState(false);

const [minPrice, setMinPrice] = useState('');
const [maxPrice, setMaxPrice] = useState('');

const [sortBy, setSortBy] = useState<
  'Recommended' | 'LowToHigh' | 'HighToLow'
>('Recommended');

const [appliedMinPrice, setAppliedMinPrice] = useState('');
const [appliedMaxPrice, setAppliedMaxPrice] = useState('');

const [appliedSortBy, setAppliedSortBy] = useState<
  'Recommended' | 'LowToHigh' | 'HighToLow'
>('Recommended');

  useEffect(() => {
    setSelectedFilter(route.params?.category ?? 'All');
    setSearchQuery(route.params?.searchQuery ?? '');
  }, [route.params]);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Smart search: category + name + description + location + keywords
  
const filteredListings = listings
  .filter((item) => {
    const matchesCategory =
      selectedFilter === 'All' ||
      item.category === selectedFilter;

    const searchableText = normalizeText(
      [
        item.name,
        item.category,
        item.subcategory ?? '',
        item.description,
        item.location,
        ...(item.keywords ?? []),
      ].join(' ')
    );

    const searchWords = normalizeText(searchQuery)
      .split(/\s+/)
      .filter(Boolean);

    const matchesSearch = searchWords.every((word) => {
      const normalizedWord = normalizeWord(word);

      const searchableWords = searchableText
        .split(/\s+/)
        .map(normalizeWord);

      return searchableWords.some(
        (searchableWord) =>
          searchableWord.includes(normalizedWord) ||
          normalizedWord.includes(searchableWord)
      );
    });

    const price = getNumericPrice(item.price);

    const hasPriceFilter =
      appliedMinPrice.trim() !== '' ||
      appliedMaxPrice.trim() !== '';

    const matchesMinPrice =
      appliedMinPrice.trim() === '' ||
      (price !== null && price >= Number(appliedMinPrice));

    const matchesMaxPrice =
      appliedMaxPrice.trim() === '' ||
      (price !== null && price <= Number(appliedMaxPrice));

    const matchesPrice =
      !hasPriceFilter ||
      (price !== null && matchesMinPrice && matchesMaxPrice);

    return matchesCategory && matchesSearch && matchesPrice;
  })
  .sort((a, b) => {
    const priceA = getNumericPrice(a.price);
    const priceB = getNumericPrice(b.price);

    if (appliedSortBy === 'LowToHigh') {
      return (priceA ?? Infinity) - (priceB ?? Infinity);
    }

    if (appliedSortBy === 'HighToLow') {
      return (priceB ?? -Infinity) - (priceA ?? -Infinity);
    }

    return 0;
  });

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Explore</Text>
            <Text style={styles.subtitle}>
              Discover what's around you
            </Text>
          </View>

          <View style={styles.location}>
            <MapPin size={15} color="#525252" />
            <Text style={styles.locationText}>Bokaro</Text>
          </View>
        </View>

        {/* SEARCH */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#737373" />

          <TextInput
            style={styles.searchInput}
            placeholder="Search services, rentals, shops..."
            placeholderTextColor="#A3A3A3"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

         <Pressable onPress={() => setFilterVisible(true)}>
  <SlidersHorizontal size={20} color="#525252" />
</Pressable>
              </View>
              



<Modal
  visible={filterVisible}
  transparent
  animationType="slide"
  onRequestClose={() => setFilterVisible(false)}
>
  <View style={styles.modalOverlay}>
    <Pressable
      style={styles.modalBackground}
      onPress={() => setFilterVisible(false)}
    />

    <View style={styles.filterSheet}>
      <View style={styles.sheetHeader}>
        <Text style={styles.sheetTitle}>Filters</Text>

        <Pressable onPress={() => setFilterVisible(false)}>
          <Text style={styles.closeButton}>✕</Text>
        </Pressable>
      </View>

      <Text style={styles.filterHeading}>Price Range (₹)</Text>

      <View style={styles.priceInputs}>
        <TextInput
          style={styles.priceInput}
          placeholder="Min price"
          placeholderTextColor="#A3A3A3"
          keyboardType="numeric"
          value={minPrice}
          onChangeText={setMinPrice}
        />

        <Text style={styles.priceSeparator}>to</Text>

        <TextInput
          style={styles.priceInput}
          placeholder="Max price"
          placeholderTextColor="#A3A3A3"
          keyboardType="numeric"
          value={maxPrice}
          onChangeText={setMaxPrice}
        />
      </View>

      <Text style={styles.filterHeading}>Sort By</Text>

      {[
        { label: 'Recommended', value: 'Recommended' },
        { label: 'Price: Low to High', value: 'LowToHigh' },
        { label: 'Price: High to Low', value: 'HighToLow' },
      ].map((option) => (
        <Pressable
          key={option.value}
          style={styles.sortOption}
          onPress={() =>
            setSortBy(
              option.value as
                | 'Recommended'
                | 'LowToHigh'
                | 'HighToLow'
            )
          }
        >
          <Text style={styles.sortText}>{option.label}</Text>

          <View style={styles.radioOuter}>
            {sortBy === option.value && (
              <View style={styles.radioInner} />
            )}
          </View>
        </Pressable>
      ))}

      <View style={styles.sheetButtons}>
        <Pressable
          style={styles.clearButton}
          onPress={() => {
            setMinPrice('');
            setMaxPrice('');
            setSortBy('Recommended');

            setAppliedMinPrice('');
            setAppliedMaxPrice('');
            setAppliedSortBy('Recommended');
          }}
        >
          <Text style={styles.clearButtonText}>Clear All</Text>
        </Pressable>

        <Pressable
          style={styles.applyButton}
          onPress={() => {
            const min = Number(minPrice);
            const max = Number(maxPrice);

            const invalidPrice =
              (minPrice.trim() !== '' &&
                (!Number.isFinite(min) || min < 0)) ||
              (maxPrice.trim() !== '' &&
                (!Number.isFinite(max) || max < 0)) ||
              (minPrice.trim() !== '' &&
                maxPrice.trim() !== '' &&
                min > max);

            if (invalidPrice) {
              return;
            }

            setAppliedMinPrice(minPrice);
            setAppliedMaxPrice(maxPrice);
            setAppliedSortBy(sortBy);
            setFilterVisible(false);
          }}
        >
          <Text style={styles.applyButtonText}>Apply Filters</Text>
        </Pressable>
      </View>
    </View>
  </View>
</Modal>


        {/* CATEGORY FILTERS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterList}
        >
          {filters.map((filter) => {
            const isActive = selectedFilter === filter;

            return (
              <Text
                key={filter}
                onPress={() => setSelectedFilter(filter)}
                style={[
                  styles.filterItem,
                  isActive && styles.activeFilter,
                  isActive && styles.activeFilterText,
                ]}
              >
                {filter}
              </Text>
            );
          })}
        </ScrollView>

        {/* LISTING COUNT */}
        <View style={styles.resultHeader}>
          <Text style={styles.resultTitle}>
            {selectedFilter === 'All'
              ? 'Nearby listings'
              : selectedFilter}
          </Text>

          <Text style={styles.resultCount}>
            {filteredListings.length} results
          </Text>
        </View>

        {/* LISTING CARDS */}
        <View style={styles.listingList}>
          {filteredListings.map((item) => {
            const Icon =
              item.category === 'Services'
                ? Wrench
                : item.category === 'Rentals'
                  ? CarFront
                  : Store;

            return (
              <Pressable
                key={item.id}
                style={styles.card}
                onPress={() =>
                  navigation.navigate('ListingDetails', {
                    listing: item,
                  })
                }
              >
                <View style={styles.cardTop}>
                  <View style={styles.cardIcon}>
                    <Icon size={25} color="#262626" />
                  </View>

                  <View style={styles.rating}>
                    <Star
                      size={14}
                      color="#D69B24"
                      fill="#D69B24"
                    />
                    <Text style={styles.ratingText}>
                      {item.rating}
                    </Text>
                  </View>
                </View>

                <Text style={styles.businessName}>
                  {item.name}
                </Text>

                <Text style={styles.categoryLabel}>
                  {item.category} · {item.subcategory}
                </Text>

                <Text style={styles.description}>
                  {item.description}
                </Text>

                <View style={styles.cardFooter}>
                  <View style={styles.cardLocation}>
                    <MapPin size={14} color="#737373" />
                    <Text style={styles.locationLabel}>
                      {item.location}
                    </Text>
                  </View>

                  <Text style={styles.price}>
                    {item.price}
                  </Text>
                </View>
              </Pressable>
            );
          })}

          {filteredListings.length === 0 && (
            <View style={styles.emptyState}>
              <Search size={30} color="#A3A3A3" />

              <Text style={styles.emptyTitle}>
                No listings found
              </Text>

              <Text style={styles.emptySubtitle}>
                Try another search or category.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 35,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },

  title: {
    fontSize: 27,
    fontWeight: '800',
    color: '#171717',
  },

  subtitle: {
    fontSize: 13,
    color: '#737373',
    marginTop: 4,
  },

  location: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 11,
    paddingVertical: 9,
    borderRadius: 12,
  },

  locationText: {
    fontSize: 12,
    color: '#525252',
    fontWeight: '600',
  },

  searchContainer: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 15,
    paddingHorizontal: 14,
    backgroundColor: '#FAFAFA',
    gap: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#171717',
  },

  filterList: {
    gap: 10,
    paddingVertical: 20,
  },

  filterItem: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
    color: '#525252',
    fontSize: 13,
    fontWeight: '600',
  },

  activeFilter: {
    backgroundColor: '#171717',
  },

  activeFilterText: {
    color: '#FFFFFF',
  },

  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },

  resultTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#171717',
  },

  resultCount: {
    fontSize: 12,
    color: '#737373',
  },

  listingList: {
    gap: 13,
  },

  card: {
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 17,
    padding: 15,
    backgroundColor: '#FFFFFF',
  },

  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 13,
  },

  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#F1F1EF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#525252',
  },

  businessName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#171717',
  },

  categoryLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#737373',
    marginTop: 5,
  },

  description: {
    fontSize: 12,
    color: '#737373',
    marginTop: 8,
  },

  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    marginTop: 13,
    paddingTop: 12,
    gap: 7,
  },

  cardLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  locationLabel: {
    fontSize: 11,
    color: '#737373',
  },

  price: {
    fontSize: 13,
    fontWeight: '700',
    color: '#171717',
  },

  emptyState: {
    alignItems: 'center',
    paddingVertical: 55,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#171717',
    marginTop: 12,
  },

  emptySubtitle: {
    fontSize: 12,
    color: '#737373',
    marginTop: 5,
    },
  
  
modalOverlay: {
  flex: 1,
  justifyContent: 'flex-end',
  backgroundColor: 'rgba(0,0,0,0.35)',
},

modalBackground: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
},

filterSheet: {
  backgroundColor: '#FFFFFF',
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
  padding: 22,
  paddingBottom: 35,
},

sheetHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 25,
},

sheetTitle: {
  fontSize: 21,
  fontWeight: '800',
  color: '#171717',
},

closeButton: {
  fontSize: 20,
  color: '#525252',
  padding: 5,
},

filterHeading: {
  fontSize: 15,
  fontWeight: '700',
  color: '#171717',
  marginBottom: 13,
  marginTop: 10,
},

priceInputs: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,
  marginBottom: 22,
},

priceInput: {
  flex: 1,
  height: 48,
  borderWidth: 1,
  borderColor: '#E5E5E5',
  borderRadius: 12,
  paddingHorizontal: 12,
  color: '#171717',
},

priceSeparator: {
  color: '#737373',
},

sortOption: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 13,
  borderBottomWidth: 1,
  borderBottomColor: '#F0F0F0',
},

sortText: {
  fontSize: 14,
  color: '#404040',
},

radioOuter: {
  width: 20,
  height: 20,
  borderRadius: 10,
  borderWidth: 2,
  borderColor: '#171717',
  alignItems: 'center',
  justifyContent: 'center',
},

radioInner: {
  width: 10,
  height: 10,
  borderRadius: 5,
  backgroundColor: '#171717',
},

sheetButtons: {
  flexDirection: 'row',
  gap: 12,
  marginTop: 25,
},

clearButton: {
  flex: 1,
  height: 50,
  borderWidth: 1,
  borderColor: '#D4D4D4',
  borderRadius: 13,
  alignItems: 'center',
  justifyContent: 'center',
},

clearButtonText: {
  fontSize: 14,
  fontWeight: '700',
  color: '#171717',
},

applyButton: {
  flex: 1.5,
  height: 50,
  backgroundColor: '#171717',
  borderRadius: 13,
  alignItems: 'center',
  justifyContent: 'center',
},

applyButtonText: {
  fontSize: 14,
  fontWeight: '700',
  color: '#FFFFFF',
},

});
