import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  Wrench,
  CarFront,
  Store,
  Camera,
  Check,
} from 'lucide-react-native';

import type { RootStackParamList } from '../types/listing';

type NavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const listingTypes = [
  {
    id: 'Services',
    title: 'Services',
    description: 'Offer your skills and services',
    icon: Wrench,
  },
  {
    id: 'Rentals',
    title: 'Rentals',
    description: 'Rent out vehicles and equipment',
    icon: CarFront,
  },
  {
    id: 'Shops',
    title: 'Shops',
    description: 'List your shop and products',
    icon: Store,
  },
] as const;

export default function AddListingScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [selectedType, setSelectedType] =
    useState<'Services' | 'Rentals' | 'Shops'>('Services');

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');

  const handleContinue = () => {
    if (!name.trim() || !description.trim() || !location.trim()) {
      Alert.alert(
        'Missing information',
        'Please fill in the listing name, description and location.',
      );
      return;
    }

    Alert.alert(
      'Details captured',
      'Your listing form is ready. We will connect it to the backend in a later step.',
    );
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={22} color="#171717" />
        </TouchableOpacity>

        <View>
          <Text style={styles.headerTitle}>Add a Listing</Text>
          <Text style={styles.headerSubtitle}>
            Let people discover what you offer
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>
        What would you like to list?
      </Text>

      <View style={styles.typeContainer}>
        {listingTypes.map((item) => {
          const Icon = item.icon;
          const isSelected = selectedType === item.id;

          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.typeCard,
                isSelected && styles.selectedTypeCard,
              ]}
              onPress={() => setSelectedType(item.id)}
              activeOpacity={0.75}
            >
              <View style={styles.typeLeft}>
                <View style={styles.typeIcon}>
                  <Icon size={23} color="#171717" />
                </View>

                <View style={styles.typeText}>
                  <Text style={styles.typeTitle}>
                    {item.title}
                  </Text>
                  <Text style={styles.typeDescription}>
                    {item.description}
                  </Text>
                </View>
              </View>

              <View
                style={[
                  styles.radio,
                  isSelected && styles.radioSelected,
                ]}
              >
                {isSelected && (
                  <Check size={13} color="#FFFFFF" />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.sectionTitle}>Listing details</Text>

      <Text style={styles.label}>Listing name *</Text>
      <TextInput
        style={styles.input}
        placeholder={
          selectedType === 'Services'
            ? 'e.g. Raj Electrician Services'
            : selectedType === 'Rentals'
              ? 'e.g. Mahadev Tractor Rental'
              : 'e.g. Sharma Hardware Store'
        }
        placeholderTextColor="#A3A3A3"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Description *</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Describe what you offer..."
        placeholderTextColor="#A3A3A3"
        value={description}
        onChangeText={setDescription}
        multiline
        textAlignVertical="top"
      />

      <Text style={styles.label}>Village / Location *</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Telo, Chandrapura, Bokaro"
        placeholderTextColor="#A3A3A3"
        value={location}
        onChangeText={setLocation}
      />

      <Text style={styles.label}>Price (optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. ₹500 per day or On request"
        placeholderTextColor="#A3A3A3"
        value={price}
        onChangeText={setPrice}
      />

      <Text style={styles.sectionTitle}>Listing photos</Text>

      <TouchableOpacity
        style={styles.photoUpload}
        activeOpacity={0.75}
        onPress={() =>
          Alert.alert(
            'Photo upload',
            'Camera and gallery upload will be connected in the next step.',
          )
        }
      >
        <Camera size={27} color="#171717" />
        <Text style={styles.photoTitle}>Add photos</Text>
        <Text style={styles.photoSubtitle}>
          Show customers your work, products or equipment
        </Text>
        <Text style={styles.photoHint}>Camera / Gallery</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.continueButton}
        onPress={handleContinue}
        activeOpacity={0.8}
      >
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>

      <Text style={styles.footerNote}>
        You can review your listing before publishing it.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  content: {
    padding: 20,
    paddingBottom: 45,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 10,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#171717',
  },

  headerSubtitle: {
    fontSize: 12,
    color: '#737373',
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 15,
    marginTop: 12,
  },

  typeContainer: {
    gap: 11,
    marginBottom: 28,
  },

  typeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 15,
    padding: 14,
  },

  selectedTypeCard: {
    borderColor: '#171717',
    backgroundColor: '#FAFAFA',
  },

  typeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  typeIcon: {
    width: 45,
    height: 45,
    borderRadius: 13,
    backgroundColor: '#F1F1F1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  typeText: {
    marginLeft: 12,
    flex: 1,
  },

  typeTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#171717',
  },

  typeDescription: {
    fontSize: 11,
    color: '#737373',
    marginTop: 4,
  },

  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: '#A3A3A3',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },

  radioSelected: {
    backgroundColor: '#171717',
    borderColor: '#171717',
  },

  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#404040',
    marginBottom: 8,
    marginTop: 14,
  },

  input: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#171717',
    backgroundColor: '#FFFFFF',
  },

  textArea: {
    height: 105,
    paddingTop: 14,
  },

  photoUpload: {
    borderWidth: 1,
    borderColor: '#D4D4D4',
    borderStyle: 'dashed',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },

  photoTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#171717',
    marginTop: 12,
  },

  photoSubtitle: {
    fontSize: 12,
    color: '#737373',
    textAlign: 'center',
    marginTop: 6,
  },

  photoHint: {
    fontSize: 12,
    fontWeight: '600',
    color: '#404040',
    marginTop: 12,
  },

  continueButton: {
    height: 54,
    backgroundColor: '#171717',
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 28,
  },

  continueText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },

  footerNote: {
    fontSize: 11,
    color: '#A3A3A3',
    textAlign: 'center',
    marginTop: 13,
  },
});