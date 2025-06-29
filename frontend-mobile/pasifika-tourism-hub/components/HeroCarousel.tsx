import React, { useRef, useState } from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

type Props = { images: any[] };

export default function HeroCarousel({ images }: Props) {
  const scrollRef = useRef<ScrollView>(null);
  const [idx, setIdx] = useState(0);

  const go = (newIdx: number) => {
    const clamped = (newIdx + images.length) % images.length;
    scrollRef.current?.scrollTo({ x: clamped * screenWidth, animated: true });
    setIdx(clamped);
  };

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const page = Math.round(e.nativeEvent.contentOffset.x / screenWidth);
    if (page !== idx) setIdx(page);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {images.map((src, i) => (
          <Image key={i} source={src} style={styles.image} />
        ))}
      </ScrollView>

      <TouchableOpacity style={[styles.arrow, styles.left]} onPress={() => go(idx - 1)}>
        <Ionicons name="chevron-back" size={28} color="#333" />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.arrow, styles.right]} onPress={() => go(idx + 1)}>
        <Ionicons name="chevron-forward" size={28} color="#333" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenWidth * 0.5,
    position: 'relative',
    marginBottom: 24,
  },
  image: {
    width: screenWidth,
    height: '100%',
    resizeMode: 'cover',
  },
  arrow: {
    position: 'absolute',
    top: '50%',
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 20,
  },
  left: { left: 12, transform: [{ translateY: -14 }] },
  right: { right: 12, transform: [{ translateY: -14 }] },
});