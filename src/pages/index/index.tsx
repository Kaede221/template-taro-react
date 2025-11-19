import Taro from "@tarojs/taro";
import { View, Button } from "@tarojs/components";

import TestCom from "@/components/home/TestCom";
import useCounterStore from "@/store/counter";

import routes from "@/constants/routes";

import "./index.scss";

const Index = () => {
  const counterStore = useCounterStore();

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
      <View>Counter is {counterStore.counter}</View>
      <Button onClick={counterStore.increment}>Count++</Button>
    </View>
  );
};

export default Index;
