const { notarize } = require('@electron/notarize');
require('dotenv').config();

// Create a .env file to put your details in
// The function can take up to a few minutes to complete

async function packageTask () {
    const options = {
        appBundleId: 'com.paultreanor.promptmarker',
        appPath: './release/0.0.0/PromptMarker.dmg',
        appleId: process.env.APPLE_ID,
        appleIdPassword: process.env.APPLE_ID_PASSWORD,
        teamId: process.env.TEAM_ID
    };
    console.log({options})
    try {
        await notarize(options);
          console.log("Notarization complete")
    } catch (error) {
        console.error("Error during notarization: ", error);
    }
  }

packageTask();