module.exports = {
    preset: 'react-native',
    setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
    setupFilesAfterEnv: [
      '@testing-library/jest-native/extend-expect',
      './jest.setup.js'
    ],
    transformIgnorePatterns: [
      'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|@react-native-community)'
    ],
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1'
    },
    testMatch: ['**/__tests__/**/*.test.js', '**/?(*.)+(spec|test).js']
  };
  