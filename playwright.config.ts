import {defineConfig} from "@playwright/test";

export default defineConfig({
    testDir: 'src/tests/',
    fullyParallel: false,
    workers: 1,
    reporter: [["html"]],
    expect:{
        timeout:7000
    },
    use: {
        baseURL:"https://test.busnetwork.net",
        screenshot:"on",
        video:"on",
        headless: false,
        browserName: "chromium"
    }
})