
import React, { ComponentType } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ArrowUpRight } from 'lucide-react-native';

interface CategoryCardProps {
  title: string;
  subtitle: string;
  icon: ComponentType<{
    size?: number;
    color?: string;
    strokeWidth?: number;
  }>;
  onPress?: () => void;
}

export default function CategoryCard({
  title,
  subtitle,
  icon: Icon,
  onPress,
}: CategoryCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.75}
      accessibilityRole="button"
    >
      <View style={styles.topRow}>
        <View style={styles.iconContainer}>
          <Icon size={25} color="#183B2C" strokeWidth={2} />
        </View>

        <ArrowUpRight size={21} color="#9AA39B" />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    minHeight: 145,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E9ECE6',
    borderRadius: 20,
    padding: 16,
    justifyContent: 'space-between',
    marginBottom: 14,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: '#F1F4EF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textContainer: {
    marginTop: 22,
  },

  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#183B2C',
  },

  subtitle: {
    fontSize: 12,
    color: '#7B8980',
    marginTop: 6,
  },
});
