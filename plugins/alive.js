const Asena = require('../events');
const axios = require('axios');
const Config = require('../config');
const fs = require("fs")
const Language = require('../language');
const Lang = Language.getString('gitlink');

Asena.addCommand({pattern: 'alive', fromMe: false, desc: Lang.GL}, (async (message, match) => {

await message.client.sendMessage(message.jid, {text : 'alive' })

})); 
