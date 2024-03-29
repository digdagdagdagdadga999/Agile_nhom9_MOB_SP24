import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

const SignUp = ({ navigation }) => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [sodienthoai, setSoDienThoai] = useState("");
  const [tenUser, setTenUser] = useState("");

  const saveDangKy = () => {
    // Kiểm tra nếu bất kỳ trường nào trống
    if (
      username.trim() === "" ||
      password.trim() === "" ||
      sodienthoai.trim() === "" ||
      tenUser.trim() === ""
    ) {
      Alert.alert("Thông báo!!!", "Vui lòng điền đầy đủ thông tin đăng ký");
      return;
    }

    // Kiểm tra số điện thoại theo định dạng Việt Nam
    const phoneRegex =
      /^(0[2-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])\d{8}$/;
    if (!phoneRegex.test(sodienthoai)) {
      Alert.alert("Thông báo!!!", "Số điện thoại không hợp lệ");
      return;
    }

    let objUser = {
      username: username,
      password: password,
      phonenumber: sodienthoai,
      name: tenUser,
    };
    let url_api = "https://651ea7d444a3a8aa4768be06.mockapi.io/taikhoan";

    fetch(url_api, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objUser),
    })
      .then((res) => {
        if (res.status == 201) {
          Alert.alert("Thông báo!!!", "Đăng ký thành công");
          navigation.navigate("DangNhap");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.dangky}>Đăng ký</Text>

      <Text style={styles.textUPR}>Tên đăng nhập: </Text>
      <TextInput
        placeholder="Nhập tên đăng nhập của bạn"
        style={styles.textinput}
        onChangeText={(txt) => {
          setusername(txt);
        }}
      />

      <Text style={styles.textUPR}>Name: </Text>
      <TextInput
        placeholder="Nhập tên của bạn"
        style={styles.textinput}
        onChangeText={(txt) => {
          setTenUser(txt);
        }}
      />

      <Text style={styles.textUPR}>Số điện thoại: </Text>
      <TextInput
        placeholder="Nhập số điện thoại"
        style={styles.textinput}
        onChangeText={(txt) => {
          setSoDienThoai(txt);
        }}
      />

      <Text style={styles.textUPR}>Password: </Text>
      <TextInput
        placeholder="Nhập mật khẩu"
        style={styles.textinput}
        secureTextEntry
        onChangeText={(txt) => {
          setPassword(txt);
        }}
      />

      <Pressable style={styles.buttons} onPress={() => saveDangKy()}>
        <Text style={styles.buttonText}>Đăng ký</Text>
      </Pressable>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
    flexDirection: "column",
  },
  dangky: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },
  textinput: {
    borderRadius: 10,
    height: 50,
    borderWidth: 1,
    margin: 15,
    padding: 10,
  },
  textUPR: {
    fontSize: 12,
    fontWeight: "bold",
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
