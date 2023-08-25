# ⚡️ ChatGPT Promplty

A ChatGPT desktop app that lets you quickly switch between prompts. 

The app embdeds ChatGPT into a desktop app as a webview, and lets you quickly add and remove stored reusable prompts in a collapsable sidebar. 

### How to use 
- Log into ChatGPT through the app. 
- Click on the arrow icon on the top right of the app to expand the sidebar. 
- Add a new prompt 
- Double click on a ptompt to edit or delete it 
- Click on a prompt to add it to ChatGPT's input box

### Implementation

ChatGPT Promptly is built on top of Electron, React, Tailwinds, and Vite. 

### Setup
**Setup dev env**
```bash
# Download the repo
npm install
```
**Run the app in dev mode**
```bash
npm run dev
```
**Run unit tests**
```bash
npm run test:unit
```

### Notes 
- `buildResources` (for icon) is defined in `electron-builder.json5`