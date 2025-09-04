import {defineConfig} from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config({path: ".env.test"});

// console.log(process.env.BASE_URL)
// console.log(process.env.USER_EMAIL)
// console.log(process.env.USER_PASSWORD)

export default defineConfig({
    testDir: 'src/tests/',
    fullyParallel: false,
    workers: 1,
    reporter: [["html"]],
    expect: {
        timeout: 7000
    },
    use: {
        baseURL: process.env.BASE_URL,
        screenshot: "on",
        video: "on",
        headless: false,
        browserName: "chromium"
    }
})