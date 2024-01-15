import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";

const UpdateBaiViet = (props) => {
  const [tieude, setTieuDe] = useState(props.route.params?.item_sp.title);
  const [noidung, setNoiDung] = useState(props.route.params?.item_sp.content);
  const [hinhanh, setHinhAnh] = useState(props.route.params?.item_sp.image);

  const SaveBaiViet = () => {
    let id = props.route.params?.item_sp.id;
    let objBaiViet = { title: tieude, content: noidung, image: hinhanh };
    let url_baiviet =
      "https://651ea7d444a3a8aa4768be06.mockapi.io/baiviet/" + id;
    fetch(url_baiviet, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objBaiViet),
    })
      .then((res) => {
        if (res.status == 200) {
          Alert.alert("Thông báo", "Sửa thành công bài viết");
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
        value={tieude}
      />
      <Text style={styles.texts}>Nội dung</Text>
      <TextInput
        placeholder="Nhập nội dung"
        style={styles.inputNhap}
        onChangeText={(txt) => setNoiDung(txt)}
        value={noidung}
      />
      <Text style={styles.texts}>Hình ảnh</Text>
      <TextInput
        placeholder="Nhập url hình ảnh"
        style={styles.inputNhap}
        onChangeText={(txt) => setHinhAnh(txt)}
        value={hinhanh}
      />
      <Pressable style={styles.buttonSave} onPress={() => SaveBaiViet()}>
        <Text style={styles.textSave}>Save</Text>
      </Pressable>
    </View>
  );
};

export default UpdateBaiViet;

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
