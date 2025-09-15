import Taro from "@tarojs/taro";
import { View, Button } from "@tarojs/components";

import "./index.scss";

const Index = () => {
  return (
    <View>
      <View>Index Page</View>
      <Button
        onClick={() => {
          Taro.navigateTo({ url: "/pages/about/index" });
        }}
      >
        Click Me
      </Button>
    </View>
  );
};

export default Index;
