import {
  Alert,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

const TinTucChiTiet = (props) => {
  const posts = props.route.params?.item_sp;
  const user = props.route.params?.users;
  const [arrCMT, setArrCMT] = useState([]);
  const [arrFollow, setArrFollow] = useState(user?.post);
  const [cmt, setCMT] = useState("");
  const [checkFollow, setCheckFollow] = useState(true);

  const getCMT = async () => {
    let url_cmt = "https://651ea7d444a3a8aa4768be06.mockapi.io/baiviet";
    try {
      const loadDuLieu = await fetch(url_cmt);
      const jsonBaiViet = await loadDuLieu.json();
      console.log(jsonBaiViet);
      setArrCMT(jsonBaiViet);
    } catch (error) {
      console.log(error);
    }
  };

  const checkfollow = () => {
    let arrTemp = arrFollow;
    let check = true;
    for (let i = 0; i < arrTemp?.length; i++) {
      //   console.log("arrTemp[i]:", arrTemp[i]);
      if (arrTemp[i] == posts?.id) {
        check = false;
        break;
      }
    }
    setCheckFollow(check);
  };

  const Follow = () => {
    let uri =
      "https://651ea7d444a3a8aa4768be06.mockapi.io/taikhoan/" + user?.id;
    console.log(uri);

    let arrTemp = arrFollow;

    let id = posts?.id;

    arrTemp?.push(id);

    setArrFollow(arrTemp);
    console.log(arrFollow);
    let userTemp = {
      username: user?.username,
      password: user?.password,
      phonenumber: user?.phonenumber,
      post: arrFollow,
      name: user?.name,
    };

    fetch(uri, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userTemp),
    })
      .then((res) => {
        console.log("OK");
        setCheckFollow(false);
      })
      .catch((ex) => {
        console.log(ex);
      });
  };

  const unFollow = () => {
    let uri =
      "https://651ea7d444a3a8aa4768be06.mockapi.io/taikhoan/" + user?.id;
    console.log(uri);

    let arrTemp = arrFollow;

    let id = posts?.id;
    let index = 0;
    for (let i = 0; i < arrTemp?.length; i++) {
      if (arrTemp[i] == id) {
        index = i;
        break;
      }
    }

    arrTemp?.splice(index, 1);

    setArrFollow(arrTemp);

    let userTemp = {
      username: user?.username,
      password: user?.password,
      phonenumber: user?.phonenumber,
      post: arrFollow,
      name: user?.name,
    };

    fetch(uri, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userTemp),
    })
      .then((res) => {
        console.log("OK");
        setCheckFollow(true);
      })
      .catch((ex) => {
        console.log(ex);
      });
  };

  const clickFollow = () => {
    console.log(checkFollow);
    if (checkFollow) {
      Follow();
      return;
    }
    unFollow();
  };

  React.useLayoutEffect(() => {
    getCMT();
    checkfollow();
  }, []);

  // React.useEffect(() => {
  //   const unsubscribe = props.navigation.addListener("focus", () => {
  //     getCMT();
  //     checkfollow();
  //   });
  //   return unsubscribe;
  // }, [props.navigation]);

  const AddComment = async () => {
    let url_comment =
      "https://651ea7d444a3a8aa4768be06.mockapi.io/baiviet/" + posts?.id;

    console.log(url_comment);
    if (cmt.length <= 0) {
      Alert.alert("Lỗi", "Không được để trống");
      return;
    }

    let objCMT = { user: user?.name, cmt: cmt };
    console.log(objCMT);
    let userCMT = {
      // title: posts?.title,
      // content: posts?.content,
      // image: posts?.image,
      conments: [objCMT],
    };
    console.log(userCMT);
    try {
      const res = await fetch(url_comment, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCMT),
      });

      if (res.status === 200) {
        // Update the state
        getCMT();
        console.log("thêm bình luận thành công");
      } else {
        console.log("Thêm bình luận không thành công");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const binhluanItem = ({ item }) => {
  //   return (
  //     <View>
  //       {item.conments.map((comment, index) => (
  //         <View key={index}>
  //           <Text style={{ fontWeight: "bold" }}>{comment.user}</Text>
  //           <Text>{comment.cmt}</Text>
  //         </View>
  //       ))}
  //     </View>
  //   );
  // };
  return (
    <>
      <ScrollView style={styles.contener}>
        <View style={styles.viewBanTin}>
          <Image
            style={{ width: "100%", height: 260 }}
            source={{ uri: posts?.image }}
          />
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            {posts?.title}
          </Text>
          <Text>{posts?.content}</Text>

          <TouchableOpacity
            style={{
              width: 100,
              height: 40,
              backgroundColor: checkFollow ? "aqua" : "red",
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
              marginBottom: 20,
            }}
            onPress={clickFollow}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              {checkFollow ? "Yêu Thích" : "Hủy Yêu Thích"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default TinTucChiTiet;

const styles = StyleSheet.create({
  viewBanTin: {
    width: "100%",
    marginBottom: 20,
  },
  contener: {
    flex: 0,
    padding: 10,
  },
  viewTitle: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 5,
  },
  viewCMT: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 20,
  },

  textInput: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
  },

  buttonDang: {
    backgroundColor: "#1877F2",
    borderRadius: 10,
    justifyContent: "center",
  },
});

{
  /* <View style={{ padding: 15 }}>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Bình luận</Text>

        <FlatList
          style={{ width: "100%", height: 100 }}
          data={arrCMT}
          renderItem={binhluanItem}
          keyExtractor={(item_bl) => item_bl.id.toString()} // Add keyExtractor
        />

        <View style={styles.viewCMT}>
          <TextInput
            value={cmt}
            style={styles.textInput}
            placeholder="Bình luận"
            maxLength={500}
            onChangeText={(value) => {
              setCMT(value);
            }}
          />
          <Pressable style={styles.buttonDang} onPress={AddComment}>
            <Text>Đăng</Text>
          </Pressable>
        </View>
      </View> */
}
