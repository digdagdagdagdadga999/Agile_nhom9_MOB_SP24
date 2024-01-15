import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Login from "./ManHinh/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ListNews from "./ManHinh/ListNews";
import SignUp from "./ManHinh/SignUp";
import Settings from "./ManHinh/Settings";
import { Ionicons } from "@expo/vector-icons";
import ListPerson from "./ManHinh/ListPerson";
import QuanLyBaiViet from "./ManHinh/QuanLyBaiViet";
import ThemBaiViet from "./ManHinh/ThemBaiViet";
import UpdateBaiViet from "./ManHinh/UpdateBaiViet";
import DoiMatKhau from "./ManHinh/DoiMatKhau";
import UpdateUser from "./ManHinh/UpdateUser";
import TinTucChiTiet from "./ManHinh/TinTucChiTiet";
import TinTucYeuThich from "./ManHinh/TinTucYeuThich";

// quản lý các màn hình
const stack = createNativeStackNavigator();
const tab = createBottomTabNavigator();

const App = (props) => {
  const user = props.route?.params?.user;
  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName="DangNhap">
        <stack.Screen
          name="DangNhap"
          component={Login}
          options={{ title: "Đăng Nhập" }}
        />
        <stack.Screen
          name="TinTuc"
          component={TabNavi}
          options={{ title: "Bản Tin", headerShown: false }}
        />
        <stack.Screen
          name="dangky"
          component={SignUp}
          options={{ title: "Đăng Ký", headerShown: false }}
        />
        <stack.Screen
          name="qlbaiviet"
          component={QuanLyBaiViet}
          initialParams={{ user: user }}
          options={{ title: "Quản lý bài viết" }}
        />
        <stack.Screen
          name="thembaiviet"
          component={ThemBaiViet}
          options={{ title: "Thêm bài viết" }}
        />
        <stack.Screen
          name="suabaiviet"
          component={UpdateBaiViet}
          options={{ title: "Sửa bài viết" }}
        />
        <stack.Screen
          name="doimk"
          component={DoiMatKhau}
          initialParams={{ user: user }}
          options={{ title: "Đổi mật khẩu" }}
        />
        <stack.Screen
          name="suanguoidung"
          component={UpdateUser}
          options={{ title: "Đổi mật khẩu" }}
        />
        <stack.Screen
          name="tintucct"
          component={TinTucChiTiet}
          initialParams={{ user: user }}
          options={{ title: "Tin Tức Chi Tiết" }}
        />
        <stack.Screen
          name="tintucyeuthich"
          component={TinTucYeuThich}
          initialParams={{ user: user }}
          options={{ title: "Tin Tức Yêu Thích" }}
        />
        <stack.Screen
          name="nguoidung"
          component={ListPerson}
          initialParams={{ user: user }}
          options={{
            title: "Quản lý Người Dùng",
          }}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});

const TabNavi = (props) => {
  const user = props.route?.params?.user;
  return (
    <tab.Navigator>
      <tab.Screen
        name="news"
        component={ListNews}
        initialParams={{ user: user }}
        options={{
          title: "Bản Tin",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="newspaper" size={size} color={color} />
          ),
        }}
      />

      <tab.Screen
        name="caidat"
        component={Settings}
        initialParams={{ user: user }}
        options={{
          title: "Cài đặt",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cog" size={size} color={color} />
          ),
        }}
      />
    </tab.Navigator>
  );
};
