import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Store, Plus, ChevronRight } from 'lucide-react-native';

import type { RootStackParamList } from '../types/listing';

type ProfileNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export default function ProfileScreen() {
  const navigation = useNavigation<ProfileNavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.profileIcon}>
        <Store size={30} color="#171717" />
      </View>

      <Text style={styles.title}>My Profile</Text>
      <Text style={styles.subtitle}>
        Manage your account and business profiles here.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Business</Text>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('AddListing')}
          activeOpacity={0.75}
        >
          <View style={styles.actionIcon}>
            <Plus size={23} color="#171717" />
          </View>

          <View style={styles.actionText}>
            <Text style={styles.actionTitle}>Add a Listing</Text>
            <Text style={styles.actionSubtitle}>
              List your service, rental or shop
            </Text>
          </View>

          <ChevronRight size={22} color="#737373" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileIcon: {
    width: 70,
    height: 70,
    borderRadius: 22,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#171717',
  },

  subtitle: {
    fontSize: 14,
    color: '#737373',
    marginTop: 10,
    textAlign: 'center',
  },

  section: {
    width: '100%',
    marginTop: 45,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 14,
  },

  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 16,
    padding: 15,
  },

  actionIcon: {
    width: 46,
    height: 46,
    borderRadius: 13,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  actionText: {
    flex: 1,
    marginLeft: 13,
  },

  actionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#171717',
  },

  actionSubtitle: {
    fontSize: 12,
    color: '#737373',
    marginTop: 5,
  },
});