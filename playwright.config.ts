import {defineConfig} from "@playwright/test";
import * as dotenv from "dotenv";
import * as fs from "node:fs";
import * as path from "node:path";
import {parse} from "csv-parse/sync";

dotenv.config({path: ".env.test"});
export const jsonData = JSON.parse(fs.readFileSync(path.join(__dirname, './data/users.json'), 'utf-8'));
export const csvData = parse(fs.readFileSync(path.join(__dirname, './data/users.csv')), {
    columns: true,
    skip_empty_lines: true
});


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