import { StyleSheet, Text, View, Pressable, Alert, Image } from "react-native";
import React from "react";

const Settings = (props) => {
  const userlogin = props.route.params?.user;

  const Chuyenmanhinh = () => {
    if (!(userlogin?.username === "admin")) {
      Alert.alert("Thông báo", "Chức năng này chỉ dành cho admin");
    } else {
      props.navigation.navigate("qlbaiviet");
    }
  };

  const ChuyenmanhinhNguoiDung = () => {
    if (!(userlogin?.username === "admin")) {
      Alert.alert("Thông báo", "Chức năng này chỉ dành cho admin");
    } else {
      props.navigation.navigate("nguoidung");
    }
  };

  const ChuyenmanhinhDoiMK = () => {
    if (userlogin?.username === "admin") {
      Alert.alert("Thông báo", "Chức năng này chỉ dành cho người dùng");
    } else {
      props.navigation.navigate("doimk", {
        nguoidung: props.route.params?.user,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri:
              "https://tse4.mm.bing.net/th?id=OIP.nDR4yc1FZaFpGBSLd-Pv1QHaE8&pid=Api&P=0&h=220",
          }}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.buttons}
          onPress={() => {
            props.navigation.navigate("DangNhap");
          }}
        >
          <Text style={styles.buttonText}>Đăng xuất</Text>
        </Pressable>

        <Pressable style={styles.buttons} onPress={ChuyenmanhinhDoiMK}>
          <Text style={styles.buttonText}>Đổi mật khẩu</Text>
        </Pressable>

        <Pressable style={styles.buttons} onPress={Chuyenmanhinh}>
          <Text style={styles.buttonText}>Quản lý bài viết</Text>
        </Pressable>

        <Pressable
          style={styles.buttons}
          onPress={() => {
            props.navigation.navigate("tintucyeuthich", {
              userss: props.route.params?.user,
            });
          }}
        >
          <Text style={styles.buttonText}>Tin Tức Yêu Thích</Text>
        </Pressable>

        <Pressable style={styles.buttons} onPress={ChuyenmanhinhNguoiDung}>
          <Text style={styles.buttonText}>Quản lý người dùng</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  imageContainer: {
    marginBottom: 30,
  },
  logo: {
    width: 200,
    height: 200,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  buttons: {
    width: "70%",
    borderRadius: 10,
    marginBottom: 20,
    height: 50,
    backgroundColor: "#1877F2",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
