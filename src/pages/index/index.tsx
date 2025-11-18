import Taro from "@tarojs/taro";
import { View, Button } from "@tarojs/components";

import TestCom from "@/components/home/TestCom";

import routes from "@/constants/routes";

import "./index.scss";

const Index = () => {
  return (
    <View>
      <View>欢迎来到主页!</View>
      <Button
        onClick={() => {
          Taro.navigateTo({ url: routes.subPages.index.likePage });
        }}
      >
        前往子页面 LikePage
      </Button>
      <TestCom />
    </View>
  );
};

export default Index;
