const fs = require("fs-extra");
const targetPath = process.env.TARGET_PATH || "../docs"; // Default to '../docs' if no argument is passed
console.log(`running post-build.js with TARGET_PATH: ${targetPath}`);
(async () => {
  try {
    await fs.move("docs/browser", targetPath, { overwrite: true });
    await fs.remove("docs");
  } catch (err) {
    console.error(err);
  }
})();
