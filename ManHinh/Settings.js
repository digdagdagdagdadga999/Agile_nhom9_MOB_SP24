import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
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
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    margin: 10,
  },
  buttons: {
    borderRadius: 10,
    marginTop: 30,
    height: 48,
    backgroundColor: "#1877F2",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});
