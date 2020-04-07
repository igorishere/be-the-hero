const crypto = require('crypto')//método para gerar um ID aleatório

module.exports = function generateUniqueId(){
    return crypto.randomBytes(4).toString('HEX');
}