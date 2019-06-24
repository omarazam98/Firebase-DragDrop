module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
   "setupFilesAfterEnv": ["<rootDir>/src/tests/setupTests.js"],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  "reporters": ["default", "jest-junit"]
}
