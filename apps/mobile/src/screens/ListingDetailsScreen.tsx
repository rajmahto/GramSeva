
import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import {
  ArrowLeft,
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Tag,
  ShieldCheck,
} from 'lucide-react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/listing';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'ListingDetails'
>;

export default function ListingDetailsScreen({
  route,
  navigation,
}: Props) {
  const { listing } = route.params;

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* HEADER */}
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={22} color="#171717" />
          <Text style={styles.backText}>Back to Explore</Text>
        </Pressable>

        {/* BUSINESS PROFILE */}
        <View style={styles.profileSection}>
          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>
              {listing.name.charAt(0).toUpperCase()}
            </Text>
          </View>

          <Text style={styles.businessName}>
            {listing.name}
          </Text>

          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>
              {listing.category}
            </Text>
          </View>

          {listing.subcategory ? (
            <Text style={styles.subcategory}>
              {listing.subcategory}
            </Text>
          ) : null}
        </View>

        {/* ABOUT */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About this listing</Text>

          <Text style={styles.description}>
            {listing.description}
          </Text>
        </View>

        {/* LOCATION */}
        <View style={styles.infoCard}>
          <MapPin size={22} color="#525252" />

          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Location</Text>
            <Text style={styles.infoValue}>
              {listing.location}
            </Text>
          </View>
        </View>

        {/* PRICING */}
        <View style={styles.infoCard}>
          <Text style={styles.rupee}>₹</Text>

          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Pricing</Text>
            <Text style={styles.infoValue}>
              {listing.price}
            </Text>
          </View>
        </View>

        {/* AVAILABILITY */}
        <View style={styles.infoCard}>
          <Clock size={22} color="#525252" />

          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Availability</Text>
            <Text style={styles.infoValue}>
              Contact provider to confirm availability
            </Text>
          </View>
        </View>

        {/* REVIEWS */}
        <View style={styles.reviewSection}>
          <View style={styles.reviewHeading}>
            <ShieldCheck size={21} color="#525252" />
            <Text style={styles.sectionTitle}>
              Customer Reviews
            </Text>
          </View>

          <View style={styles.reviewEmpty}>
            <Text style={styles.reviewEmptyTitle}>
              No verified reviews yet
            </Text>

            <Text style={styles.reviewEmptyText}>
              Reviews will be available after customers complete
              and confirm their bookings.
            </Text>
          </View>
        </View>

        {/* ACTIONS */}
        <View style={styles.actionSection}>
          <Pressable
            style={styles.callButton}
            onPress={() =>
              Alert.alert(
                'Call Provider',
                'Provider contact details will be available soon.'
              )
            }
          >
            <Phone size={19} color="#FFFFFF" />
            <Text style={styles.callButtonText}>
              Call Provider
            </Text>
          </Pressable>

          <Pressable
            style={styles.enquiryButton}
            onPress={() =>
              Alert.alert(
                'Send Enquiry',
                'Enquiry feature will be available soon.'
              )
            }
          >
            <MessageCircle size={19} color="#171717" />
            <Text style={styles.enquiryButtonText}>
              Send Enquiry
            </Text>
          </Pressable>
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
    padding: 20,
    paddingBottom: 40,
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    marginBottom: 25,
  },

  backText: {
    fontSize: 14,
    color: '#171717',
    fontWeight: '600',
  },

  profileSection: {
    alignItems: 'center',
    paddingVertical: 22,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },

  iconContainer: {
    width: 85,
    height: 85,
    borderRadius: 25,
    backgroundColor: '#F1F1EF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 17,
  },

  iconText: {
    fontSize: 35,
    fontWeight: '700',
    color: '#171717',
  },

  businessName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#171717',
    textAlign: 'center',
  },

  categoryBadge: {
    backgroundColor: '#F1F1EF',
    paddingHorizontal: 13,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 12,
  },

  categoryText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#404040',
  },

  subcategory: {
    fontSize: 13,
    color: '#737373',
    marginTop: 9,
  },

  section: {
    marginTop: 25,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#171717',
  },

  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#737373',
    marginTop: 9,
  },

  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 15,
    marginBottom: 12,
    gap: 13,
  },

  infoContent: {
    flex: 1,
  },

  infoTitle: {
    fontSize: 12,
    color: '#737373',
  },

  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#171717',
    marginTop: 4,
  },

  rupee: {
    width: 22,
    fontSize: 23,
    fontWeight: '700',
    color: '#525252',
    textAlign: 'center',
  },

  reviewSection: {
    marginTop: 18,
  },

  reviewHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    marginBottom: 13,
  },

  reviewEmpty: {
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 15,
    padding: 18,
  },

  reviewEmptyTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#171717',
  },

  reviewEmptyText: {
    fontSize: 12,
    lineHeight: 19,
    color: '#737373',
    marginTop: 7,
  },

  actionSection: {
    marginTop: 25,
    gap: 12,
  },

  callButton: {
    height: 52,
    backgroundColor: '#171717',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
  },

  callButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  enquiryButton: {
    height: 52,
    borderWidth: 1,
    borderColor: '#DCDCDC',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
  },

  enquiryButtonText: {
    color: '#171717',
    fontSize: 14,
    fontWeight: '700',
  },
});
