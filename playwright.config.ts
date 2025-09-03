import {defineConfig} from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config({path: process.env.ENV ? `.env.${process.env.ENV}` : ".env.test"})

export default defineConfig({
    testDir: 'src/tests/',
    fullyParallel: false,
    workers: 1,
    reporter: [["html"]],
    expect: {
        timeout: 7000,
        toMatchAriaSnapshot: {
            pathTemplate: '__snapshots__/{testFilePath}/{arg}{ext}',
        },
    },

    projects: [
        {
            name: 'e2e',
            testMatch: 'e2e/**/*.spec.ts',
            use: {
                storageState: 'storageState.json',
                baseURL: process.env.BASE_URL || 'https://busnetwork.ferdia.com',
                headless: false,
            },
            dependencies: ['global-setup']
        },
        {
            name: 'global-setup',
            testMatch: 'e2e/global.setup.ts',
            use: {
                baseURL: process.env.BASE_URL || 'https://busnetwork.ferdia.com',
            },
            teardown: 'global-teardown',
        },
        {
            name: 'global-teardown',
            testMatch: 'e2e/global.teardown.ts',
        },
    ],
})