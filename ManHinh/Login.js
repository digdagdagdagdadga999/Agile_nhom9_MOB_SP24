import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";

const Login = ({ navigation }) => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const chuyenManHinh = () => {
    navigation.navigate("dangky");
  };

  const saveDangNhap = () => {
    console.log("Email:", username);
    console.log("Password:", password);
    let url_api = "https://651ea7d444a3a8aa4768be06.mockapi.io/taikhoan";

    // Kiểm tra nếu username hoặc password trống
    if (username.trim() === "" || password.trim() === "") {
      Alert.alert("Thông Báo", "Vui lòng nhập đầy đủ username và password");
      return;
    }

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
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <View style={styles.containerLogin}>
      <Text style={styles.texts}>Đăng Nhập</Text>
      <Text style={styles.textUserName}>Tên Đăng Nhập:</Text>
      <TextInput
        placeholder="Nhập tên đăng nhập"
        style={styles.textInput}
        onChangeText={(txt) => setusername(txt)}
      />
      <Text style={styles.textUserName}>Password:</Text>
      <TextInput
        placeholder="Nhập password"
        style={styles.textInput}
        secureTextEntry
        onChangeText={(txt) => setPassword(txt)}
      />

      {/* Pressable là một thành phần (component) cho phép xử lý sự kiện nhấn (press) từ người dùng trên một phần tử (element) nhất định. 
      Pressable cũng hỗ trợ xử lý các sự kiện tương tác khác như hover, focus, và blur. 
      Bằng cách sử dụng Pressable, bạn có thể tạo ra các thành phần như nút (button) hoặc hình ảnh (image) có thể được nhấn để thực hiện một hành động nào đó. */}
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
    marginStart: 10,
    marginEnd: 10,
    flexDirection: "column",
    marginTop: 30,
  },
  texts: {
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "center",
    color: "#050505",
    marginBottom: 50,
  },
  textUserName: {
    fontSize: 15,
    fontWeight: "bold",
  },
  textInput: {
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    margin: 15,
    padding: 10,
  },
  viewDangKy: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  buttonDangNhap: {
    borderRadius: 10,
    marginTop: 30,
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
});
