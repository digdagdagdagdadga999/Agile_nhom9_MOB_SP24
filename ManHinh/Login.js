import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  Image,
} from "react-native";
import React, { useState } from "react";

const Login = ({ navigation }) => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");

  const chuyenManHinh = () => {
    navigation.navigate("dangky");
  };

  const saveDangNhap = () => {
    // Kiểm tra nếu username hoặc password trống
    if (username.trim() === "" || password.trim() === "") {
      Alert.alert("Thông Báo", "Vui lòng nhập đầy đủ username và password");
      return;
    }

    console.log("Email:", username);
    console.log("Password:", password);
    let url_api = "https://651ea7d444a3a8aa4768be06.mockapi.io/taikhoan";

    fetch(url_api, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const foundUser = data.find(
          (user) => user.username === username && user.password === password
        );
        console.log("Found User:", foundUser);
        if (foundUser) {
          Alert.alert("Thông Báo", "Đăng Nhập thành công");
          navigation.navigate("TinTuc", { user: foundUser });
        }
        const foundUserSai = data.find(
          (user) => user.username != username || user.password != password
        );
        console.log("Found User:", foundUserSai);
        if (foundUserSai) {
          Alert.alert("Thông Báo", "Tên đăng nhập hoặc mật khẩu sai");
          return;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.containerLogin}>
      <View style={styles.logoContainer}>
        <Image
          source={{
            uri: "https://tse4.mm.bing.net/th?id=OIP.nDR4yc1FZaFpGBSLd-Pv1QHaE8&pid=Api&P=0&h=220",
          }}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <TextInput
        placeholder="Nhập tên đăng nhập"
        style={styles.textInput}
        onChangeText={(txt) => setusername(txt)}
      />
      <TextInput
        placeholder="Nhập password"
        style={styles.textInput}
        secureTextEntry
        onChangeText={(txt) => setPassword(txt)}
      />

      <Pressable style={styles.buttonDangNhap} onPress={() => saveDangNhap()}>
        <Text style={styles.textButton}>Đăng Nhập</Text>
      </Pressable>

      <View style={styles.viewDangKy}>
        <Text>Chưa có tài khoản?</Text>
        <Text
          style={{ color: "blue", marginStart: 5, fontWeight: "bold" }}
          onPress={chuyenManHinh}
        >
          Đăng ký
        </Text>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  containerLogin: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 30,
  },
  textInput: {
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
  },
  viewDangKy: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  buttonDangNhap: {
    borderRadius: 10,
    marginTop: 20,
    height: 48,
    backgroundColor: "#1877F2",
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  logo: {
    width: 150,
    height: 150,
  },
});
