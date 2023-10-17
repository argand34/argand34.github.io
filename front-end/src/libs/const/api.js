import axios from "axios";

// default 설정
const axiosInstance = axios.create({
  // setupProxy target설정으로 baseURL의 http://localhost:3001 제외하였음
  baseURL: "/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// interceptor(request, response)
// request 요청 인터셉터 설정
axiosInstance.interceptors.request.use(
  (request) => {
    // 요청 전에 수행할 로직, 예를 들어 웹스토리지에 토큰이 있다면 모든 API 요청 시에 헤더에 토큰을 추가하여 인증을 처리할 수 있음!
    if (request.data instanceof FormData) {
      request.headers["Content-Type"] = "multipart/form-data";
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
  (response) => {
    // 응답 상태가 성공인 경우
    // 응답 전에 수행할 로직, 예를 들어 에러라면 응답을 확인하고 에러코드에 따라 알림문구 설정하는 거! (서버에러인지 인증에러인지)
    return response;
  },
  (error) => {
    // 응답이 에러인 경우
    return Promise.reject(error);
  }
);

const requestMethod = ["get", "post", "put", "patch", "delete"];

// api 요청 함수
const requestApi = async (method, url, data = {}) => {
  if (!requestMethod.includes(method.toLowerCase())) {
    throw new Error("허용되지 않은 호출입니다.");
  }
  try {
    const response = await axiosInstance({
      method,
      url: url,
      data,
    });

    return response.data;
  } catch (error) {
    // console.error("API 요청 에러:", error.response.data);
    // alert("에러가 발생했습니다 : " + error.response.data.message);
    throw error;
  }
};

export default requestApi;

// 공통 api 함수선언, 호출 방법

// async function fetchData() {
//     try {
//       const response = await requestApi('get', '/end-point');
//       // 응답 데이터 처리
//       console.log(response);
//     } catch (error) {
//       // 에러 처리
//       console.log(error);
//     }
//   }

// fetchData();
