// eslint-disable-next-line no-undef
module.exports = {
  verbose: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  collectCoverage: false,
  coverageReporters: ['json', 'html', 'text'],
  coverageDirectory: 'coverage',
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(tsx?)$',
  coveragePathIgnorePatterns: ['<rootDir>/test/', '<rootDir>/node_modules'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/file.js',
    '\\.(css)$': '<rootDir>/node_modules/jest-css-modules',
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  testURL: 'http://localhost/', // https://github.com/facebook/jest/issues/6769
}
