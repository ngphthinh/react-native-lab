import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

import Header from './Header';
import Avatar from './Avatar';
import InfoRow from './InfoRow';
import SearchField from './SearchField';
import ActionButton from './ActionButton';
import { SafeAreaView } from 'react-native-safe-area-context';

const profile = {
  name: "Nguyễn Phước Thịnh",
  id: "23642651",
  email: "nguyenphuocthinh020@gmail.com",
  class: "DHKTPM19A"
}

export default function SmartCampusScreen() {
  const [query, setQuery] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1200);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileRow}>
          <Avatar initials="SV" />
          <View style={styles.profileText}>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.subtext}>Mã SV: {profile.id}</Text>
          </View>
        </View>

        <SearchField value={query} onChangeText={setQuery} />

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Thông tin sinh viên</Text>
          <InfoRow label="Email" value={profile.email} />
          <InfoRow label="Lớp" value={profile.name} />
        </View>

        <ActionButton
          label={saving ? 'ĐANG LƯU...' : 'LƯU HỒ SƠ'}
          onPress={handleSave}
          disabled={saving}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  scroll: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 40 },

  profileRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  profileText: { marginLeft: 12, flexShrink: 1 },
  name: { fontSize: 16, fontWeight: '700', color: '#1A1A1A' },
  subtext: { fontSize: 13, color: '#5A6472', marginTop: 2 },

  infoCard: {
    backgroundColor: '#EAF2FD',
    borderRadius: 10,
    padding: 14,
    marginBottom: 24,
  },
  infoTitle: { fontWeight: '700', fontSize: 14, marginBottom: 8, color: '#1A1A1A' },
});