export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',

    // To fix "Cannot find module ‘msw/node’ (JSDOM), set the testEnvironmentOptions.customExportConditions option in your jest.config.js to [''] => https://mswjs.io/docs/migrations/1.x-to-2.x#requestresponsetextencoder-is-not-defined-jest
    testEnvironmentOptions: {
        customExportConditions: [''],
    },

    // To process `*.tsx` files with `ts-jest`
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },

    // This specifies a list of files that should be run after setting up the testing framework but before running the tests.
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

    // To fix R"equest/Response/TextEncoder is not defined (Jest)"
    setupFiles: ['<rootDir>/jest.polyfills.ts'],

    // This configuration tells Jest to use jest-transform-stub for SVG (and other static file) imports. Now, when you import an SVG file in your tests, Jest will replace it with a stub and won't throw an error.
    moduleNameMapper: {
        "\\.(css|less|scss|sss|styl)$": "jest-css-modules",
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "jest-transform-stub"
    },

    testPathIgnorePatterns: ['/node_modules/', '/dist/', '/.yarn/'],
}