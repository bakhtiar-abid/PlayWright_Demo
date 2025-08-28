import {defineConfig} from "@playwright/test";

export default defineConfig({
    testDir: 'src/tests/',
    fullyParallel:true,
    workers:2,
    reporter:[["html"]],
    use:{
        headless:false,
        browserName:"firefox"
    }
})