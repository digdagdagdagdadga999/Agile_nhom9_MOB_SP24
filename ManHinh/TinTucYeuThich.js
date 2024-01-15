import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useState } from "react";

const TinTucYeuThich = (props) => {
  const arr = props.route.params?.userss.post;
  const [arrPost, setPost] = useState([]);
  const [loading, setloading] = useState(true);

  const getListPost = async () => {
    let url_api_post = "https://651ea7d444a3a8aa4768be06.mockapi.io/baiviet";
    try {
      const listPost = await fetch(url_api_post);

      const postJson = await listPost.json();
      //setarrPostFL([...postJson]);

      let arrTemp = arrPost;

      for (let i = 0; i < postJson.length; i++) {
        for (let j = 0; j < arr.length; j++) {
          if (postJson[i].id == arr[j]) {
            arrTemp.push(postJson[i]);
          }
        }
      }
      console.log(arrTemp);
      setPost([...arrTemp]);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  React.useLayoutEffect(() => {
    getListPost();
  }, []);

  const tintucyeuthichItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.viewBanTin}
        onPress={() => {
          console.log(props.route);
          props.navigation.navigate("tintucct", { items: item });
        }}
      >
        <Image source={{ uri: item.image }} style={{ width: 60, height: 60 }} />
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            marginLeft: 10,
          }}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.contener}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          style={{ marginTop: 20 }}
          data={arrPost}
          renderItem={tintucyeuthichItem}
          keyExtractor={(item, index) => index + "1"}
        />
      )}
    </View>
  );
};

export default TinTucYeuThich;

const styles = StyleSheet.create({
  contener: {
    flex: 0,
  },
  viewItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    borderBottomWidth: 0.5,
    marginTop: 5,
  },
  viewBanTin: {
    flexDirection: "row",
    justifyContent: "flex-start",
    borderBottomWidth: 0.3,
  },
});
