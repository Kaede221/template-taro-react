import routes from "@/constants/routes";
import { getLastTwoSegments, getLastPathSegment } from "@/utils/common";

interface ISubPackageConfig {
  // 分包的根路径 没有前置 `/`.
  root: string;
  // 分包子路径对象
  pages: Record<string, string>;
}

// 定义分包(子页面)的配置对象
const subPackagesConfig: ISubPackageConfig[] = [
  {
    root: "pages/subPages/index",
    pages: routes.subPages.index,
  },
];

export default defineAppConfig({
  // 主页面列表
  pages: Object.values(routes.mainPages).map((item) => item.slice(1)),

  // 配置子页面部分
  subPackages: subPackagesConfig.map((subPackageConfig) => ({
    root: subPackageConfig.root,
    name: getLastPathSegment(subPackageConfig.root),
    pages: Object.values(subPackageConfig.pages).map((item) =>
      getLastTwoSegments(item),
    ),
  })),

  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
});
