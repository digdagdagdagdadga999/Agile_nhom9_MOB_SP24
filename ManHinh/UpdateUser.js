import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";

const UpdateUser = (props) => {
  const [tenUser, setTenUser] = useState(props.route.params?.item_user.name);
  const [soDienThoai, setSoDienThoai] = useState(
    props.route.params?.item_user.phonenumber
  );

  const SaveUser = () => {
    let id = props.route.params?.item_user.id;
    let objUser = { name: tenUser, phonenumber: soDienThoai };
    let url_users =
      "https://651ea7d444a3a8aa4768be06.mockapi.io/taikhoan/" + id;
    fetch(url_users, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objUser),
    })
      .then((res) => {
        if (res.status == 200) {
          Alert.alert("Thông báo", "Cập nhật người dùng thành công");
          props.navigation.navigate("nguoidung");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputNhap}
        placeholder="Nhập tên của bạn"
        onChangeText={(txt) => setTenUser(txt)}
        value={tenUser}
      />
      <TextInput
        style={styles.inputNhap}
        placeholder="Nhập số điện thoại"
        onChangeText={(txt) => setSoDienThoai(txt)}
        value={soDienThoai}
      />

      <Pressable style={styles.buttonSave} onPress={() => SaveUser()}>
        <Text>Save</Text>
      </Pressable>
    </View>
  );
};

export default UpdateUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  inputNhap: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    margin: 10,
  },
  buttonSave: {
    backgroundColor: "#1877F2",
    borderRadius: 10,
    margin: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
