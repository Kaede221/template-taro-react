import Taro, { showToast } from "@tarojs/taro";

const BASE_URL = "";

interface paramsType {
  url: string;
  data?: object;
  contentType?: string;
  responseType?: string;
}

interface ResType<T> {
  data?: T;
  msg: string;
  code: number;
  success: boolean;
}

interface ResultType<T> {
  data: ResType<T>;
  statusCode: number;
}

interface OptionType {
  url: string;
  data?: object;
  method?: any;
  header: TaroGeneral.IAnyObject;
  mode: any;
  responseType?: any;
}

// 跟踪是否已显示错误弹窗
let hasShownError = false;

function BaseOptions<T>(
  params: paramsType,
  method = "GET",
): Promise<ResultType<T>> {
  let { url, data } = params;
  let contentType = "application/json";
  contentType = params.contentType || contentType;

  const option: OptionType = params.responseType
    ? {
        url: BASE_URL + url,
        data: data,
        method: method,
        header: {
          "content-type": contentType,
        },
        mode: "cors",
        responseType: params.responseType,
      }
    : {
        url: BASE_URL + url,
        data: data,
        method: method,
        header: {
          "content-type": contentType,
        },
        mode: "cors",
      };

  return request<T>(option);
}

const request = <T>(option: OptionType): Promise<ResultType<T>> => {
  return new Promise((resolve, reject) => {
    Taro.request(option)
      .then(async (res: Taro.request.SuccessCallbackResult<ResType<T>>) => {
        // 开始判断状态
        if (!res) {
          await handleRequestError("请求失败，请确认环境");
          return;
        }

        const { data, statusCode } = res;
        if (statusCode >= 500) {
          await handleRequestError("服务器错误，请确认环境");
          return;
        }

        if (data.success) {
          resolve({ data, statusCode });
          return;
        }

        // TODO 对于Token进行特殊处理
        if (data.code === 99999) {
          await handleTokenNotExist();
          return;
        }

        if (data.code === 99998 || data.code === 99997) {
          await handleTokenInvalid();
          reject({ msg: "登录过期，请重新登录" });
          return;
        }

        if (data.code === 99996) {
          await handleTokenInvalid();
          reject({ msg: "刷新Token失效，请重新登录" });
          return;
        }

        resolve({ data, statusCode });
      })
      .catch((err: TaroGeneral.CallbackResult) => {
        console.log(err);
        showToast({
          title: err.errMsg || "请求失败",
          icon: "error",
          duration: 1000,
        }).finally(() => {
          reject(err);
        });
      });
  });
};

const handleRequestError = async (msg: string) => {
  if (hasShownError) return; // 如果已经显示过错误弹窗，则不再重复显示
  hasShownError = true;
  await Taro.showModal({
    title: "提示",
    content: msg,
    showCancel: false,
    success: (res) => {
      if (res.confirm) {
        // 执行错误弹窗确认的消息
        console.log("TODO 请完善错误弹窗点击确认的事件3");
      }
      hasShownError = false;
    },
  });
};

async function handleTokenNotExist() {
  console.log("TODO Token 不存在的处理方式");
}

const handleTokenInvalid = async () => {
  console.log("TODO 登录无效的时候的处理方式");
  await handleRequestError("登录状态无效，请重新登录");
};

export default {
  get<T = any>(url: string, data?: object) {
    const option = { url, data };
    return BaseOptions<T>(option);
  },
  post<T = any>(url: string, data?: object, contentType?: string) {
    const params = { url, data, contentType };
    return BaseOptions<T>(params, "POST");
  },
  put<T = any>(url: string, data?: object) {
    const option = { url, data };
    return BaseOptions<T>(option, "PUT");
  },
  delete<T = any>(url: string, data?: object) {
    const option = { url, data };
    return BaseOptions<T>(option, "DELETE");
  },
  getExcel<T = any>(url: any, data?: object, contentType?: string) {
    const params = { url, data, contentType, responseType: "arraybuffer" };
    return BaseOptions<T>(params, "POST");
  },
  putExcel<T = any>(url: any, data?: object, contentType?: string) {
    const params = { url, data, contentType, responseType: "arraybuffer" };
    return BaseOptions<T>(params, "PUT");
  },
};
