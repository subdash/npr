export default {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "./src",
  collectCoverageFrom: ["**/*.ts"],
  transform: {},
  moduleDirectories: ["node_modules", "src", "scripts"],
};
