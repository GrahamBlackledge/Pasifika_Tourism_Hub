import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import ScreenWrapper from "../layouts/ScreenWrapper";
import api from "../services/api";

const COUNTRY_DATA = {
  samoa: { name: "Samoa", flag: require("../assets/flags/sa.png") },
  fiji: { name: "Fiji", flag: require("../assets/flags/fi.png") },
  tonga: { name: "Tonga", flag: require("../assets/flags/to.png") },
};

const { width: screenWidth } = Dimensions.get("window");

interface Activity {
  _id: string;
  name: string;
  description: string;
  imageUrl?: string;
}

export default function ThingsToDoPage({ route }: any) {
  const { slug: initialSlug = "samoa" } = route?.params || {};
  const [slug, setSlug] = useState(initialSlug);
  const [data, setData] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActivities = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/countries/${slug}/activities`);
      setData(res.data);
    } catch (err: any) {
      setError(err.message || "Failed to load activities");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  if (loading) {
    return (
      <ScreenWrapper>
        <ActivityIndicator size="large" style={styles.center} />
      </ScreenWrapper>
    );
  }

  if (error) {
    return (
      <ScreenWrapper>
        <Text style={styles.error}>{error}</Text>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Things to Do</Text>
        <View style={styles.flagContainer}>
          {Object.entries(COUNTRY_DATA).map(([key, { name, flag }]) => (
            <TouchableOpacity
              key={key}
              onPress={() => setSlug(key)}
              style={[styles.flagBox, slug === key && styles.flagActive]}
            >
              <Image source={flag} style={styles.flagImage} />
              <Text style={styles.flagLabel}>{name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const uri =
            item.imageUrl?.trim?.() ||
            (item as any).imageURL?.trim?.() ||
            (item as any).image?.trim?.() ||
            "";
          return (
            <TouchableOpacity style={styles.card}>
              <Image
                source={{ uri: uri || "https://placehold.co/600x400?text=No+Image" }}
                resizeMode="cover"
                style={styles.image}
              />
              <View style={styles.body}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.desc} numberOfLines={3}>
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  error: {
    padding: 20,
    fontSize: 16,
    color: "crimson",
    textAlign: "center",
  },
  list: { padding: 16 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: "100%",
    height: 180,
    backgroundColor: "#ddd",
    zIndex: 0,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  body: { padding: 12 },
  title: { fontSize: 18, fontWeight: "600", marginBottom: 4 },
  desc: { fontSize: 14, color: "#555" },
  header: {
    alignItems: "center",
    marginVertical: 16,
    marginTop: -100,
    
  },
  pageTitle: {
    fontFamily: "GreatVibes",
    fontSize: 32,
    marginBottom: 8,
  },
  flagContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 12,
  },
  flagBox: {
    alignItems: "center",
    marginHorizontal: 20,
    opacity: 0.5,
  },
  flagActive: {
    opacity: 1,
  },
  flagImage: {
    width: 64,
    height: 40,
    resizeMode: "contain",
    marginBottom: 4,
  },
  flagLabel: {
    fontSize: 14,
    color: "#333",
  },
});
