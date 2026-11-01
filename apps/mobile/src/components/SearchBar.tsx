
import { StyleSheet, TextInput, View } from 'react-native';
import { Search, SlidersHorizontal } from 'lucide-react-native';

interface SearchBarProps {
  placeholder?: string;
}

export default function SearchBar({
  placeholder = 'What are you looking for?',
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Search size={21} color="#737373" />

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#A3A3A3"
      />

      <View style={styles.filterButton}>
        <SlidersHorizontal size={19} color="#FFFFFF" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 57,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 17,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#FAFAFA',
    marginBottom: 24,
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: '#171717',
    marginLeft: 11,
    paddingVertical: 10,
  },

  filterButton: {
    width: 37,
    height: 37,
    borderRadius: 12,
    backgroundColor: '#171717',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
