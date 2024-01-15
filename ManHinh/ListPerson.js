import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";

const ListPerson = (props) => {
  const [loadUser, setLoadUser] = useState(true);
  const [dsUser, setdsUser] = useState([]);

  const loadNguoiDung = async () => {
    let url_user = "https://651ea7d444a3a8aa4768be06.mockapi.io/taikhoan";
    try {
      const load = await fetch(url_user);
      const jsonUser = await load.json();
      setdsUser(jsonUser);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadUser(false);
    }
  };

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      loadNguoiDung();
    });
    return unsubscribe;
  }, [props.navigation]);

  const NguoiDungItem = ({ item }) => {
    const xoaUser = () => {
      let url_api_user =
        "https://651ea7d444a3a8aa4768be06.mockapi.io/taikhoan/" + item.id;
      fetch(url_api_user, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status == 200) {
            alert("Xóa người dùng thành công");
            loadNguoiDung();
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
              xoaUser();
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
      <View style={styles.container}>
        <View style={styles.viewBox}>
          <Text style={{ marginStart: 10, marginTop: 3 }}>
            Tên: {item.name}
          </Text>
          <Text style={styles.text}>Tên đăng nhập: {item.username}</Text>
          <Text style={styles.text}>Số điện thoại: {item.phonenumber}</Text>
        </View>

        <View style={styles.viewBox}>
          <View style={styles.containerUD}>
            <Pressable onPress={ShowAlert}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: "red",
                  margin: 10,
                }}
              >
                Xóa
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                props.navigation.navigate("suanguoidung", { item_user: item });
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: "#1877F2",
                  margin: 10,
                }}
              >
                Sửa
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View>
      {loadUser ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={dsUser}
          keyExtractor={(item_user) => {
            return item_user.id;
          }}
          renderItem={NguoiDungItem}
        />
      )}
    </View>
  );
};

export default ListPerson;

const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: "gray",
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
  },
  viewBox: {
    margin: 5,
    flexDirection: "column",
  },
  text: {
    marginStart: 10,
  },
  imgs: {
    width: 20,
    height: 20,
    margin: 5,
  },
  containerUD: {
    flexDirection: "row",
  },
});
