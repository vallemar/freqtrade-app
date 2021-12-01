module.exports = {
  verbose: true,
  moduleFileExtensions: ["ts", "js", "json", "vue"],
  transform: {
    ".*\\.(vue)$": "@vue/vue2-jest",
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "^@/(.*)": "<rootDir>/app/$1",
    "^~/(.*)": "<rootDir>/app/$1",
  },
  roots: ["<rootDir>/tests/"],
  testEnvironment: "jsdom",
  setupFiles: ["<rootDir>/tests/setup.ts"],
};

/*  collectCoverage: false,
collectCoverageFrom: ["app/!**!/!*.{js,vue,ts}", "!**!/node_modules/!**"],
coverageReporters: ["html", "text-summary"],*/
/*  preset: "ts-jest/presets/js-with-ts",
transformIgnorePatterns: ["node_modules/(?!(bootstrap-vue)/)"],*/
