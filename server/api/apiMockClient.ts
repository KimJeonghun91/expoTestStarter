import axios from 'axios';
import { Platform } from 'react-native';

// * 실기기 사용시 json-server가 실행중인 PC의 IP 입력.
const BASE_URL = Platform.select({
  ios: 'http://localhost:3000',
  android: 'http://10.0.2.2:3000', // 안드로이드 에뮬레이터의 경우
});

const apiMockClient = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiMockClient;