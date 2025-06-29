import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import ScreenWrapper from '../layouts/ScreenWrapper';
import HeroCarousel from '../components/HeroCarousel';
import SectionCard  from '../components/SectionCard';

const { width: screenWidth } = Dimensions.get('window');

export default function TongaHome() {
  const router = useRouter();

  const heroes = [
    require('../assets/images/TongaCarousel1.jpg'),
    require('../assets/images/TongaCarousel2.jpg'),
    require('../assets/images/TongaCarousel3.jpg'),
  ];

  const sections = [
    {
      title: 'Activities',
      image: require('../assets/images/TongaActivity.jpg'),
      href: '/things',
    },
    {
      title: 'History',
      image: require('../assets/images/TongaHistory.jpg'),
      href: '/history',
    },
    {
      title: 'Language',
      image: require('../assets/images/TongaLanguage.jpg'),
      href: '/language',
    },
  ] as const;

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.container}>

        <Text style={styles.countryTitle}>Tonga</Text>

        <HeroCarousel images={heroes} />

        <View style={styles.grid}>
          {sections.map((sec) => (
            <TouchableOpacity
              key={sec.title}
              onPress={() => router.push(sec.href)}
              activeOpacity={0.8}
              style={styles.cardWrapper}
            >
              <SectionCard title={sec.title} image={sec.image} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems:     'center',
    paddingVertical: 24,
    backgroundColor: 'transparent',           
  },
  countryTitle: {
    fontSize:     36,
    fontWeight:  '600',
    color:        '#0B5968',
    marginVertical: 16,
    textAlign:   'center',
    // fontFamily: 'GreatVibes',        
  },
  grid: {
    width:           screenWidth * 0.92,
    flexDirection:  'row',
    flexWrap:       'nowrap',
    justifyContent: 'space-between',
    marginBottom:   32,
  },
  cardWrapper: {
    width:        (screenWidth * 0.92 - 32) / 3,  
    marginBottom: 16,
  },
});