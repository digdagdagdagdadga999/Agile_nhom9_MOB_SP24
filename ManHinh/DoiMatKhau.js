import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

const DoiMatKhau = (props) => {
  const userLogin = props.route.params?.user;
  const [oldPass, setOldPass] = useState(props.route.params?.user?.password);
  const [newPass, setNewPass] = useState("");
  const [ReNewpass, setReNewpass] = useState("");
  // const [user, setUser] = useState(null);

  const SaveMatKhau = () => {
    let api_mk =
      "https://651ea7d444a3a8aa4768be06.mockapi.io/taikhoan/" + userLogin?.id;
    console.log(api_mk);

    if (oldPass === "" || newPass === "" || ReNewpass === "") {
      Alert.alert("Thông báo", "Không được để chống");
      return;
    }

    if (oldPass != userLogin?.password) {
      Alert.alert("Thông báo", "Mật khẩu cũ không đúng");
      return;
    }

    if (ReNewpass != newPass) {
      Alert.alert("Thông báo", "Mật khẩu mới không khớp");
      return;
    }

    let user = { name: userLogin?.name, password: newPass };
    fetch(api_mk, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        console.log(res.status);
        if (res.status == 200) {
          console.log(res.status);
          Alert.alert("Thông báo", "Đổi mật khẩu thành công");
          props.navigation.navigate("DangNhap");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.buttonNhap}
        placeholder="Nhập mật khẩu cũ"
        onChangeText={(txt) => setOldPass(txt)}
      />

      <TextInput
        style={styles.buttonNhap}
        placeholder="Nhập mật khẩu mới"
        onChangeText={(txt) => setNewPass(txt)}
      />

      <TextInput
        style={styles.buttonNhap}
        placeholder="Nhập lại mật khẩu mới"
        onChangeText={(txt) => setReNewpass(txt)}
      />

      <Pressable style={styles.buttonSave} onPress={SaveMatKhau}>
        <Text>Save</Text>
      </Pressable>
    </View>
  );
};

export default DoiMatKhau;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  buttonNhap: {
    borderRadius: 10,
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  buttonSave: {
    backgroundColor: "#1877F2",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    padding: 10,
  },
});
