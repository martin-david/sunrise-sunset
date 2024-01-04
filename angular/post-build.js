const fs = require('fs-extra');
(async () => {
    try {
        await fs.move('docs/browser', '../docs', { overwrite: true });
        await fs.remove('docs');
    } catch (err) {
        console.error(err);
    }
})()
