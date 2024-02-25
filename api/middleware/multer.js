const multer = require('multer');
const { defaults } = require('pg');

const storage = multer.memoryStorage();

const upload = multer({storage : storage}).any();

module.exports = upload;