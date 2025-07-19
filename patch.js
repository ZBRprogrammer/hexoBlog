// patch.js
const os = require('os');
if (typeof os.hostname !== 'function') {
  os.hostname = () => 'localhost';
}