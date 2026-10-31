import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const services = [
  { icon: '📄', title: 'सरकारी योजनाएँ', detail: 'पात्रता और आवेदन', color: '#EAF3FF' },
  { icon: '💧', title: 'पानी की समस्या', detail: 'शिकायत दर्ज करें', color: '#E7F7F7' },
  { icon: '💡', title: 'बिजली की समस्या', detail: 'कनेक्शन और शिकायत', color: '#FFF4DF' },
  { icon: '🩺', title: 'स्वास्थ्य सेवाएँ', detail: 'नज़दीकी सुविधा', color: '#FDEBE8' },
];

export default function App() {
  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.brandMark}><Text style={styles.brandIcon}>🌾</Text></View>
          <View style={styles.brandText}>
            <Text style={styles.brandName}>ग्रामसेवा</Text>
            <Text style={styles.location}>📍 आपका गाँव, भारत</Text>
          </View>
          <TouchableOpacity style={styles.profileButton} accessibilityLabel="प्रोफ़ाइल">
            <Text style={styles.profileIcon}>👤</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.greeting}>
          <Text style={styles.eyebrow}>आपकी पंचायत, आपकी सेवा</Text>
          <Text style={styles.heading}>नमस्ते! 👋</Text>
          <Text style={styles.subheading}>गाँव की ज़रूरी सेवाएँ, अब आपके पास।</Text>
        </View>

        <TouchableOpacity style={styles.searchBox} accessibilityRole="button">
          <Text style={styles.searchIcon}>⌕</Text>
          <Text style={styles.searchText}>सेवा या योजना खोजें</Text>
          <Text style={styles.searchArrow}>›</Text>
        </TouchableOpacity>

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>सेवाएँ</Text>
          <TouchableOpacity><Text style={styles.seeAll}>सभी देखें  ›</Text></TouchableOpacity>
        </View>
        <View style={styles.serviceGrid}>
          {services.map((service) => (
            <TouchableOpacity key={service.title} style={styles.serviceCard} accessibilityRole="button">
              <View style={[styles.serviceIconWrap, { backgroundColor: service.color }]}>
                <Text style={styles.serviceIcon}>{service.icon}</Text>
              </View>
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text style={styles.serviceDetail}>{service.detail}</Text>
              <Text style={styles.cardArrow}>↗</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>पंचायत से जुड़ी खबरें</Text>
          <TouchableOpacity><Text style={styles.seeAll}>और पढ़ें  ›</Text></TouchableOpacity>
        </View>
        <View style={styles.noticeCard}>
          <View style={styles.noticeTop}>
            <View style={styles.noticeTag}><Text style={styles.noticeTagText}>📣  सूचना</Text></View>
            <Text style={styles.noticeDate}>आज</Text>
          </View>
          <Text style={styles.noticeTitle}>ग्राम सभा की अगली बैठक</Text>
          <Text style={styles.noticeBody}>बैठक की तारीख और जगह की जानकारी यहाँ मिलेगी।</Text>
          <View style={styles.noticeFooter}>
            <Text style={styles.noticeLink}>पूरी सूचना पढ़ें</Text>
            <Text style={styles.noticeLink}>→</Text>
          </View>
        </View>

        <View style={styles.helpBanner}>
          <Text style={styles.helpIcon}>🤝</Text>
          <View style={styles.helpCopy}>
            <Text style={styles.helpTitle}>मदद चाहिए?</Text>
            <Text style={styles.helpText}>पंचायत सहायक से संपर्क करें</Text>
          </View>
          <Text style={styles.helpArrow}>›</Text>
        </View>
      </ScrollView>

      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}><Text style={styles.tabIconActive}>⌂</Text><Text style={styles.tabLabelActive}>होम</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}><Text style={styles.tabIcon}>▦</Text><Text style={styles.tabLabel}>सेवाएँ</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}><Text style={styles.tabIcon}>▤</Text><Text style={styles.tabLabel}>सूचनाएँ</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}><Text style={styles.tabIcon}>◉</Text><Text style={styles.tabLabel}>प्रोफ़ाइल</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F7F8F4' },
  content: { paddingHorizontal: 22, paddingTop: 14, paddingBottom: 26 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
  brandMark: { width: 46, height: 46, borderRadius: 16, backgroundColor: '#E7F1E5', alignItems: 'center', justifyContent: 'center' },
  brandIcon: { fontSize: 24 },
  brandText: { marginLeft: 11, flex: 1 },
  brandName: { color: '#183B2C', fontSize: 20, fontWeight: '800' },
  location: { color: '#7B8980', fontSize: 12, marginTop: 2 },
  profileButton: { width: 42, height: 42, borderRadius: 15, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#EEF0EA' },
  profileIcon: { fontSize: 19 },
  greeting: { marginBottom: 20 },
  eyebrow: { color: '#5C8A62', fontSize: 12, fontWeight: '700', letterSpacing: 0.5, marginBottom: 7 },
  heading: { color: '#183B2C', fontSize: 30, fontWeight: '800', letterSpacing: -0.5 },
  subheading: { color: '#7B8980', fontSize: 14, marginTop: 6 },
  searchBox: { height: 54, borderRadius: 17, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E9ECE6', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginBottom: 28 },
  searchIcon: { color: '#64806C', fontSize: 26, marginRight: 10 },
  searchText: { color: '#9AA39B', fontSize: 14, flex: 1 },
  searchArrow: { color: '#819084', fontSize: 24 },
  sectionHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  sectionTitle: { color: '#20392C', fontSize: 18, fontWeight: '800' },
  seeAll: { color: '#5C8A62', fontSize: 12, fontWeight: '700' },
  serviceGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 28 },
  serviceCard: { width: '48%', minHeight: 150, borderRadius: 20, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EDF0EA', padding: 14, marginBottom: 12, position: 'relative' },
  serviceIconWrap: { width: 43, height: 43, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  serviceIcon: { fontSize: 21 },
  serviceTitle: { color: '#263D30', fontSize: 14, fontWeight: '800' },
  serviceDetail: { color: '#879188', fontSize: 11, marginTop: 5 },
  cardArrow: { position: 'absolute', right: 14, top: 15, color: '#9AA69B', fontSize: 17 },
  noticeCard: { backgroundColor: '#FFFFFF', borderRadius: 20, borderWidth: 1, borderColor: '#EDF0EA', padding: 16, marginBottom: 16 },
  noticeTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  noticeTag: { backgroundColor: '#FFF3DC', borderRadius: 8, paddingHorizontal: 9, paddingVertical: 5 },
  noticeTagText: { color: '#986F25', fontSize: 11, fontWeight: '700' },
  noticeDate: { color: '#9AA39B', fontSize: 11 },
  noticeTitle: { color: '#263D30', fontSize: 16, fontWeight: '800' },
  noticeBody: { color: '#7B8980', fontSize: 12, lineHeight: 18, marginTop: 6 },
  noticeFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 14, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F0F2ED' },
  noticeLink: { color: '#5C8A62', fontSize: 12, fontWeight: '700' },
  helpBanner: { backgroundColor: '#EAF2E7', borderRadius: 18, padding: 15, flexDirection: 'row', alignItems: 'center' },
  helpIcon: { fontSize: 24, marginRight: 12 },
  helpCopy: { flex: 1 },
  helpTitle: { color: '#244331', fontSize: 14, fontWeight: '800' },
  helpText: { color: '#708274', fontSize: 11, marginTop: 3 },
  helpArrow: { color: '#5C8A62', fontSize: 25 },
  tabBar: { height: 68, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#ECEFE9', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 5 },
  tabItem: { minWidth: 60, alignItems: 'center', justifyContent: 'center' },
  tabIconActive: { color: '#477D53', fontSize: 23, fontWeight: '700' },
  tabIcon: { color: '#A2AAA3', fontSize: 21 },
  tabLabelActive: { color: '#477D53', fontSize: 10, fontWeight: '800', marginTop: 3 },
  tabLabel: { color: '#9AA39B', fontSize: 10, marginTop: 3 },
});
