import { defineConfig } from 'kitbook/defineConfig'

export default defineConfig({
  title: 'HVSB Docs',
  description: 'House Visual Study Bible Documentation and Prototyping Workbench',
  githubURL: 'https://github.com/HVSBible/hvsb/tree/main/packages/site',
  expandTree: true,
  viewports: [
    { name: 'mobile', width: 375, height: 400 },
    { name: 'desktop', width: 786, height: 400 },
  ],
})
