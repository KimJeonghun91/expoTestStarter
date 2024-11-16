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