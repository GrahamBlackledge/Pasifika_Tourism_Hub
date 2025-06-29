import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

export type SectionCardProps = {
  title: string;
  image: any;   // require()’d image
};

export default function SectionCard({ title, image }: SectionCardProps) {
  const { width } = Dimensions.get('window');
  const CARD_W = (width * 0.92 - 32) / 3;  // match the grid logic

  return (
    <View style={[styles.card, { width: CARD_W }]}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 16,
    marginVertical: 8,
    color: '#0B5968',
    fontWeight: '500',
  },
});