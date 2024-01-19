import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Share,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ListNews = (props) => {
  const arr = props.route.params?.user;
  const [loading, setLoading] = useState(true);
  const [newsList, setNewsList] = useState([]);
  const [likedItems, setLikedItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "https://651ea7d444a3a8aa4768be06.mockapi.io/baiviet";
        const response = await fetch(url);
        const data = await response.json();
        setNewsList(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLike = (itemId) => {
    const isLiked = likedItems.includes(itemId);

    if (!isLiked) {
      setLikedItems([...likedItems, itemId]);
    } else {
      setLikedItems(likedItems.filter((id) => id !== itemId));
    }
  };

  const handleShare = async (itemId) => {
    try {
      const item = newsList.find((news) => news.id === itemId);

      if (!item) {
        console.error(`Item with ID ${itemId} not found.`);
        return;
      }

      const shareOptions = {
        title: item.title,
        message: item.content,
        url: item.image,
      };

      await Share.share(shareOptions);
    } catch (error) {
      console.error('Error sharing:', error.message);
    }
  };

  const NewsItem = ({ item }) => {
    const isLiked = likedItems.includes(item.id);

    return (
      <TouchableOpacity
        style={styles.newsContainer}
        onPress={() => {
          props.navigation.navigate("tintucct", {
            item_sp: item,
            users: arr,
          });
        }}
      >
        <Image style={styles.imageStyle} source={{ uri: item.image }} />
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description} numberOfLines={3}>
            {item.content}
          </Text>
          <View style={styles.interactions}>
            <TouchableOpacity
              style={[styles.action, isLiked && styles.likedAction]}
              onPress={() => handleLike(item.id)}
            >
              <Ionicons name="ios-thumbs-up" size={20} color="#555" />
              <Text>Like</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.action}
              onPress={() => handleShare(item.id)}
            >
              <Ionicons name="ios-share" size={20} color="#555" />
              <Text>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={newsList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={NewsItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  newsContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
  interactions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  likedAction: {
    borderColor: "red",
    backgroundColor: "#FFD6D6", // Màu nền khi đã like
  },
});

export default ListNews;
