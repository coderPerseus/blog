module.exports = {
  // preset: 'ts-jest', // Removing this to let babel-jest take precedence
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleNameMapper: {
    // Handle CSS imports (e.g., if you import CSS files directly)
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Handle image imports
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    // Handle Next.js path aliases
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/$1',
    // Handle contentlayer generated path
    '^contentlayer/generated$': '<rootDir>/.contentlayer/generated',
  },
  // transform: { // Removing this to let babel-jest handle transformations via babel.config.js
  //   '^.+\\.(ts|tsx|js|jsx)$': ['ts-jest', {
  //     tsconfig: 'tsconfig.json',
  //   }],
  // },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  verbose: true,
};
