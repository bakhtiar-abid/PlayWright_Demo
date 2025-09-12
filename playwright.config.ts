import {defineConfig} from "@playwright/test";
import * as dotenv from "dotenv";
import * as fs from "node:fs";

import { parse } from "csv-parse/sync";

dotenv.config({path: ".env.test"});
export const testData = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'));
export const csvData = parse(fs.readFileSync('./data/users.csv', 'utf-8'), {
    columns: true,
    skip_empty_lines: true
});

// console.log(process.env.BASE_URL)
// console.log(process.env.USER_EMAIL)
// console.log(process.env.USER_PASSWORD)

export default defineConfig({
    timeout: 5 * 60 * 1000,
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