
# Expo Jest & Appium Starter Kit

이 프로젝트는 EXPO에서 `jest`와 `appium`을 사용해 테스트를 시작할 수 있는 보일러플레이트입니다.
유닛 테스트(Unit Test)와 엔드투엔드 테스트(E2E Test)를 설정하고 실행할 수 있습니다.

https://github.com/user-attachments/assets/18479a64-6c24-452f-94ca-5b59cb53be2d


### 실제 환경에 맞게 변경 필요.

- `__tests__/wdio.config.ts` :  `appium:deviceName`을 실제 디바이스 이름으로 변경
- `server/api/apiMockClient.ts` : 실제 디바이스 테스트 시 `json-server`의 IP 주소 입력 필요


### 폴더 구조

프로젝트의 폴더 구조는 다음과 같습니다

```bash
root/
├── app/
│   ├── _layout.jsx
│   └── (tabs)/
│       ├── advance.tsx
│       └── index.tsx (basicScreen)
│ 
├── __tests__/
│   ├── __unit__/                     # Unit Test 폴더
│   │   └── basicScreen.test.tsx
│   │
│   ├── __e2e__/                       # E2E Test 폴더
│   │   ├── specs/ 
│   │   │   ├── advanceScreen.e2e.ts
│   │   │   └── basicScreen.e2e.ts
│   │   └── helper/
│   │       └── browserElementUtils.ts
│   │
│   ├── coverage/
│   ├── logs/
│   ├── screenshots/
│   └── wdio.conf.ts                   # WebDriverIO 설정
│ 
├── server/                            # json-server MOCK 서버 
│
├── jest.config.js                     # jest 설정
├── package.json
└── tsconfig.json
```


- .gitignore

  ```bash
  __tests__/logs
  __tests__/screenshots
  __tests__/videos
  __tests__/coverage

  allure-report/
  allure-results/
  ```

## 1. 설치

**Homebrew 설치**
  
먼저, Allure 리포트를 생성하기 위해 Homebrew를 사용하여 Allure를 설치합니다.

```bash
brew install allure
```

**프로젝트 의존성 설치**

```bash
yarn add -D appium @wdio/cli @wdio/appium-service @wdio/mocha-framework @wdio/spec-reporter @wdio/allure-reporter
```

## 2. 설정 파일 생성

- **package.json**
  
  개발 의존성이 설치되면 아래와 같은 형태입니다.

  ```json
  {
      "devDependencies": {
          "@babel/core": "^7.20.0",
          "@testing-library/react-native": "^12.8.0",
          "@types/jest": "^29.5.12",
          "@types/react": "~18.2.45",
          "@types/react-test-renderer": "^18.0.7",
          "@wdio/allure-reporter": "^9.2.2",
          "@wdio/appium-service": "^9.2.1",
          "@wdio/cli": "^9.2.4",
          "@wdio/local-runner": "^9.2.1",
          "@wdio/mocha-framework": "^9.1.3",
          "@wdio/spec-reporter": "^9.1.3",
          "@wdio/visual-service": "^6.2.1",
          "appium": "^2.12.1",
          "appium-uiautomator2-driver": "^3.8.0",
          "jest": "^29.2.1",
          "jest-expo": "~51.0.3",
          "react-test-renderer": "18.2.0",
          "typescript": "~5.3.3"
      },
  }
  ```
    
- **tsconfig.json**
  
  타입스크립트 컴파일러 옵션에 필요한 타입들을 추가합니다.

  ```bash
    "compilerOptions": {
      "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework", "@types/jest"],
    ...
  ```
    
- **jest.config.js**
  
  ```js
  module.exports = {
    preset: "jest-expo",
    transformIgnorePatterns: [
        "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)"
    ],
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "jsx"
    ],
    // coverage 폴더 경로
    coverageDirectory: '__tests__/coverage',

    // 테스트 파일 경로 지정
    testMatch: [
        "<rootDir>/__tests__/__unit__/**/*.test.(ts|tsx|js|jsx)"
    ]
  };
  ```

- `__tests__/wdio.conf.ts`

  Appium E2E 설정 파일입니다. `npx wdio config` 명령어로 직접 설정하거나, 본 프로젝트에 있는 설정 파일을 복사하여 사용할 수 있습니다.

## 3. 테스트 실행

- **Unit Test**
  
  유닛 테스트는 컴포넌트의 기능을 개별적으로 검증합니다.
  
  ```bash
  # 모든 유닛 테스트 실행
  yarn test
  
  # 테스트 감시 모드로 실행 (파일 변경시 자동 재실행)
  yarn test:watch
  
  # 특정 테스트 파일만 실행
  yarn test basicScreen.test.tsx
  
  # 커버리지 리포트와 함께 실행
  yarn test:coverage
  ```
    
- **엔드투엔드 테스트(E2E Test)**
  
  엔드투엔드 테스트는 애플리케이션의 전체 흐름을 검증합니다.
  
  ```bash
  # 0. appium 서버실행
  appium
  
  # 1. Android apk 생성 (expo run:android)
  yarn android
  
  # 1-1. 패키지명 , apk 경로를 wdio.config.ts 입력
  
  # 2. Metro 서버 시작
  yarn start
  
  # 4. 새 터미널에서 E2E 테스트 실행
  yarn test:e2e:basic
  ```

- **리포트**

  ```bash
  # 유닛 테스트
  yarn report:unit

  # e2e 테스트
  yarn report:e2e
  ```


<br/>

---


# Advance

`advanceScreen.e2e.ts`를 실행하기 위해서는 Mock 서버가 필요합니다.

이를 위해 json-server를 사용하여 Mock 서버를 설정합니다.

**Mock 서버 ( json-server )**

```bash
root/
├── server/
│   ├── api/
│   │   ├── services/
│   │   │   └── userService.ts
│   │   └── apiMockClient.ts
│   ├── db.json
│   └── routes.json
└── package.json
```

- **설치**
  ```bash
  # json-server 설치
  npm install -g json-server

  # 프로젝트 의존성 설치
  npm install axios
  ```

- **실행**
  ```bash
  # "start:mock": "cd server && json-server --watch db.json --host 0.0.0.0 --port 3000"
  yarn start:mock
  ```

- **mock 데이터 생성 (server/db.json)**
  
  ```json
    {
        "users": [
            {
                "uuid": "550e8400-e29b-41d4-a716-446655440000",
                "name": "김정훈",
                "userId": "kjh1234",
                "userPw": "sfjAelskdf@lsd"
            },
            {
                "uuid": "67d03a33-7b22-4fd8-9d31-8a4648bb32a6",
                "name": "홍길동",
                "userId": "redwayeast",
                "userPw": "bm!@vsdDFjj"
            },
            {
                "uuid": "a385bcd6-c902-4251-af14-2c7c5c27348c",
                "name": "이철수",
                "userId": "twoironnumber",
                "userPw": "63kliz%Klsv2"
            }
        ]
    }
  ```

- **API 클라이언트 설정 (server/api/apiMockClient.ts)**
  
  ```ts
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
  ```

- **서비스 레이어 생성 (server/api/services/userService.ts)**
  ```ts
    import apiMockClient from '../apiMockClient';
    import { User, SafeUser, LoginResult } from '../types/user';
    import { AxiosError } from 'axios';

    export class userService {
        static async userLogin(userId: string, userPw: string): Promise<LoginResult> {
            ...
        }
    ...
    }
  ```



<br/>

---

# TODO

- [ ]  iOS 테스트 환경 설정
  현재 프로젝트는 Android를 기준으로 설정되어 있습니다. iOS 기기에서 테스트를 수행하기 위해서는 추가적인 설정이 필요합니다.


