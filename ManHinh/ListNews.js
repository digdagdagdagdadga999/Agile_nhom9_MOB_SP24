import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

const ListNews = (props) => {
  const arr = props.route.params?.user;
  const [loadBaiViet, SetLoadBaiViet] = useState(true);

  const [dsBaiViet, setdsBaiViet] = useState([]);

  const getListBaiViet = async () => {
    let url_baiviet = "https://651ea7d444a3a8aa4768be06.mockapi.io/baiviet";
    try {
      const loadDuLieu = await fetch(url_baiviet);
      const jsonBaiViet = await loadDuLieu.json();
      setdsBaiViet(jsonBaiViet);
    } catch (error) {
      console.log(error);
    } finally {
      SetLoadBaiViet(false);
    }
  };

  React.useEffect(() => {
    const unsucrible = props.navigation.addListener("focus", () => {
      getListBaiViet();
    });
    return unsucrible;
  }, [props.navigation]);

  const BaiVietItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.viewBanTin}
          onPress={() => {
            props.navigation.navigate("tintucct", {
              item_sp: item,
              users: arr,
            });
          }}
        >
          <Image style={styles.imageStyle} source={{ uri: item.image }} />
          <View style={styles.content}>
            <Text style={styles.tieude}>{item.title}</Text>
            <Text style={styles.noidung} numberOfLines={3}>
              {item.content}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View>
      {loadBaiViet ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={dsBaiViet}
          keyExtractor={(item_sp) => {
            return item_sp.id;
          }}
          renderItem={BaiVietItem}
        />
      )}
    </View>
  );
};

export default ListNews;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    margin: 5,
    backgroundColor: "#C0C0C0",
    borderRadius: 10,
  },
  imageStyle: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginStart: 30,
    marginTop: 10,
  },
  tieude: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },
  noidung: {
    fontSize: 10,
    fontStyle: "italic",
  },
  content: {
    width: Dimensions.get("window").width - 96 - 10,
    marginStart: 30,
  },
  chitiet: {
    textDecorationLine: "underline",
    fontSize: 10,
    color: "blue",
    fontStyle: "italic",
  },
  imageyeuthich: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginStart: 10,
    marginEnd: 10,
    marginTop: 20,
  },
  inputbinhluan: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 7,
    margin: 5,
    width: 240,
  },
  viewBanTin: {
    borderBottomWidth: 0.3,
  },
});
