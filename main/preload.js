const fs = require('fs');
const crypto = require('crypto');
const {type} = require('os');
const electron = require('electron');

// Expose select NodeJS functionality for the renderer process
const nodeAPI = {
  Buffer: Buffer,
  fs: {
    existsSync: fs.existsSync,
    readFileSync: fs.readFileSync,
    writeFileSync: fs.writeFileSync,
    unlinkSync: fs.unlinkSync,
  },
  crypto: {
    randomBytes: crypto.randomBytes,
    createHash: crypto.createHash,
    scryptSync: crypto.scryptSync,
    createCipheriv: crypto.createCipheriv,
    createDecipheriv: crypto.createDecipheriv,
  },
  os: {
    type: type,
  },
  electron: {
    ipcRenderer: electron.ipcRenderer,
    clipboard: electron.clipboard,
    remote: electron.remote,
    app: electron.app,
    shell: electron.shell,
  }
};

// export to window global for app
if (process && process.type === 'renderer'){
  window.nodeAPI = nodeAPI;
}

// export for tests
module.exports = {
  nodeAPI
};
