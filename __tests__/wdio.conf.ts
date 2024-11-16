import path from 'path';

export const config: WebdriverIO.Config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    runner: 'local',

    //
    // ==================
    // Specify Test Files
    // ==================
    specs: [
        './__e2e__/specs/**/*.e2e.ts'
    ],
    exclude: [],

    //
    // ============
    // Capabilities
    // ============
    maxInstances: 1,
    capabilities: [{
        // Android 설정
        platformName: 'Android',
        'appium:deviceName': 'qemu-system-aarch64', // 'SM_G950N'
        // 실기기 테스트시 필수 (adb devices -l)
        // 'appium:udid': 'ce11182b71c6613705',
        'appium:automationName': 'UiAutomator2',
        'appium:autoGrantPermissions': true,
        'appium:newCommandTimeout': 240,
        'appium:noReset': false,
        'appium:fullReset': false,
        'appium:dontStopAppOnReset': true,
        'appium:locationServicesEnabled': true,
        'appium:locationServicesAuthorized': true,

        // 앱 정보
        'appium:appPackage': 'com.yourPackageName.expoTestWithAppiumAndJest',
        'appium:appActivity': '.MainActivity',
        // 'appium:app': path.join(process.cwd(), './android/app/build/outputs/apk/debug/app-debug.apk'),
    }],

    //
    // ===================
    // Test Configurations
    // ===================
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 0,

    // Appium 서버 설정
    hostname: '127.0.0.1',
    port: 4723,
    path: '/',
    protocol: 'http',

    // 서비스 설정
    services: [
        ['appium', {
            args: {
                address: '127.0.0.1',
                port: 4723,
                relaxedSecurity: true
            },
            logPath: './__tests__/logs'
        }]
    ],

    // 프레임워크 설정
    framework: 'mocha',
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }]
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    //
    // =====
    // Hooks
    // =====
    before: async function (capabilities, specs) {
        // TypeScript 지원 설정
        // await import('ts-node').then(tsNode => {
        //     tsNode.register({ files: true });
        // });

        // 테스트 시작 전 설정
        await browser.updateSettings({
            waitForIdleTimeout: 0,
            // Android 설정
            'appium:ignoreUnimportantViews': true,
            'appium:disableAndroidWatchers': true
        });
    },

    beforeTest: async function (test, context) {
        // 각 테스트 케이스 실행 전 설정
        await browser.setTimeout({
            implicit: 5000,
            pageLoad: 10000,
            // script: 10000
        });
    },

    afterTest: async function (test, context, { error, result, duration, passed, retries }) {

        if (!passed) {
            const screenshotPath = path.join(process.cwd(), '__tests__/screenshots');
            const videoPath = path.join(process.cwd(), '__tests__/videos');

            // 테스트 실패 시 스크린샷 저장
            await browser.saveScreenshot(
                path.join(screenshotPath, `${test.parent}-${test.title}-${new Date().getTime()}.png`)
            );
        }
    },

    // iOS 테스트를 위한 조건부 설정
    // ...process.env.PLATFORM === 'ios' ? {
    //     capabilities: [{
    //         platformName: 'iOS',
    //         'appium:deviceName': 'iPhone 13',
    //         'appium:platformVersion': '15.0',
    //         'appium:automationName': 'XCUITest',
    //         'appium:app': path.join(process.cwd(), './ios/build/Build/Products/Debug-iphonesimulator/YourApp.app'),
    //         'appium:noReset': false,
    //         'appium:fullReset': false,
    //         'appium:dontStopAppOnReset': true,
    //         'appium:newCommandTimeout': 240,
    //         'appium:wdaLocalPort': 8100,
    //         'appium:usePrebuiltWDA': true,
    //         'appium:includeSafariInWebviews': true
    //     }]
    // } : {}
};