import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";

const ThemBaiViet = (props) => {
  const [tieude, setTieuDe] = useState("");
  const [noidung, setNoiDung] = useState("");
  const [hinhanh, setHinhAnh] = useState("");

  const SaveBaiViet = () => {
    let objBaiViet = { title: tieude, content: noidung, image: hinhanh };
    let url_baiviet = "https://651ea7d444a3a8aa4768be06.mockapi.io/baiviet";

    fetch(url_baiviet, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objBaiViet),
    })
      .then((res) => {
        if (res.status == 201) {
          Alert.alert("Thông Báo", "Thêm bài viết thành công");
          props.navigation.navigate("qlbaiviet");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.texts}>Tiêu đề</Text>
      <TextInput
        placeholder="Nhập tiêu đề"
        style={styles.inputNhap}
        onChangeText={(txt) => setTieuDe(txt)}
      />
      <Text style={styles.texts}>Nội dung</Text>
      <TextInput
        placeholder="Nhập nội dung"
        style={styles.inputNhap}
        onChangeText={(txt) => setNoiDung(txt)}
      />
      <Text style={styles.texts}>Hình ảnh</Text>
      <TextInput
        placeholder="Nhập url hình ảnh"
        style={styles.inputNhap}
        onChangeText={(txt) => setHinhAnh(txt)}
      />
      <Pressable style={styles.buttonSave} onPress={() => SaveBaiViet()}>
        <Text style={styles.textSave}>Save</Text>
      </Pressable>
    </View>
  );
};

export default ThemBaiViet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  buttonSave: {
    backgroundColor: "#1877F2",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  inputNhap: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    margin: 20,
  },
  texts: {
    fontSize: 15,
    fontWeight: "bold",
  },
  textSave: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
});
