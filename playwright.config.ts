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
    },
     projects: [
    {
      name: 'setup',
      testMatch: /.*global\.setup\.ts/,
      use: { 
        browserName: 'chromium',
        headless: false,
        baseURL: process.env.BASE_URL,
        screenshot:"on",
        video: "on"
       },
       teardown: 'teardown'
    },

     {
      name: 'teardown',
      testMatch: /.*global\.setup\.ts/,
      use: { 
        browserName: 'chromium',
        headless: false,
        baseURL: process.env.BASE_URL,
        screenshot:"on",
        video: "on"
       },
       teardown: 'teardown'
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
})