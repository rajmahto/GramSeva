import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {
  MapPin,
  Bell,
  UserRound,
} from 'lucide-react-native';

export default function AppHeader() {
  return (
    <View style={styles.container}>

      {/* BRAND AND LOCATION */}
      <View style={styles.brand}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>G</Text>
        </View>

        <View>
          <Text style={styles.brandName}>GramSeva</Text>

          <TouchableOpacity
            style={styles.location}
            activeOpacity={0.7}
            onPress={() =>
              Alert.alert(
                'Select Location',
                'Location selection will be available soon.'
              )
            }
          >
            <MapPin size={13} color="#737373" />

            <Text style={styles.locationText}>
              Your village, India
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* HEADER ACTIONS */}
      <View style={styles.actions}>

        <TouchableOpacity
          style={styles.iconButton}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Notifications"
          onPress={() =>
            Alert.alert(
              'Notifications',
              'Your notifications will appear here.'
            )
          }
        >
          <Bell size={21} color="#262626" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Profile"
          onPress={() =>
            Alert.alert(
              'Profile',
              'Your profile will be available soon.'
            )
          }
        >
          <UserRound size={21} color="#262626" />
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },

  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },

  logo: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#171717',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoText: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: '700',
  },

  brandName: {
    color: '#171717',
    fontSize: 19,
    fontWeight: '700',
  },

  location: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 3,
  },

  locationText: {
    color: '#737373',
    fontSize: 12,
  },

  actions: {
    flexDirection: 'row',
    gap: 9,
  },

  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
});