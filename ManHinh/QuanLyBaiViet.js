import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  Image,
  View,
  Alert,
} from "react-native";
import React, { useState } from "react";

const QuanLyBaiViet = (props) => {
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
    const XoaBaiViet = () => {
      let url_baiviet =
        "https://651ea7d444a3a8aa4768be06.mockapi.io/baiviet/" + item.id;
      fetch(url_baiviet, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status == 200) {
            Alert.alert("Thông Báo", "Xóa thành công bài viết");
            getListBaiViet();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const ShowAlert = () => {
      Alert.alert(
        "Thông báo",
        "Bạn có đồng ý xóa bài viết này",
        [
          {
            text: "OK",
            onPress: () => {
              XoaBaiViet();
              console.log(" Đã bấm nút đồng ý");
            },
          },
          {
            text: "NO",
            onPress: () => {
              console.log("Không đồng ý");
            },
            style: "cancel",
          },
        ],
        {
          cancelable: true,
          onDismiss: () => {
            // hàm này được gọi khi bấm ra ngoài Dialog
            console.log("Đã tắt Dialog bằng cách bấm ra ngoài");
          },
        }
      );
    };

    return (
      <View style={styles.containerItem}>
        <Image
          style={{ width: 250, height: 150, marginStart: 13 }}
          source={{ uri: item.image }}
        />
        <View style={styles.containerSP}>
          <Text style={styles.text}>Tiêu đề: {item.title}</Text>

          <Text numberOfLines={3}>Nội dung: {item.content}</Text>
        </View>

        <View style={styles.containerUD}>
          <Pressable onPress={() => ShowAlert()}>
            <Text
              style={{
                color: "red",
                fontSize: 15,
                fontWeight: "bold",
                margin: 10,
              }}
            >
              Xóa
            </Text>
          </Pressable>

          <Pressable
            onPress={() => {
              props.navigation.navigate("suabaiviet", { item_sp: item });
            }}
          >
            <Text
              style={{
                color: "#1877F2",
                fontSize: 15,
                fontWeight: "bold",
                margin: 10,
              }}
            >
              Sửa
            </Text>
          </Pressable>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.buttonSave}
        onPress={() => {
          props.navigation.navigate("thembaiviet");
        }}
      >
        <Text>Thêm bài viết</Text>
      </Pressable>
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

export default QuanLyBaiViet;

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  buttonSave: {
    backgroundColor: "#1877F2",
    borderRadius: 10,
    margin: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  containerItem: {
    margin: 10,
    backgroundColor: "#CCCCCC",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,

    flexDirection: "column",
    justifyContent: "space-between",
  },
  imgs: {
    width: 20,
    height: 20,
    marginTop: 15,
    marginLeft: 10,
  },
  containerUD: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  containerSP: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  text: {
    textAlign: "left",
    padding: 5,
    fontWeight: "bold",
  },
});
