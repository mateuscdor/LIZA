const { default: makeWASocket, 
	useSingleFileAuthState,
	DisconnectReason,
	getContentType } = require('@adiwajshing/baileys')

const { state, saveState } = useSingleFileAuthState('./julie/session.json');
const pino = require('pino');
const fs = require("fs");
const path = require("path");
const events = require("./events");
const chalk = require('chalk');
const config = require('./config');
const { Message, Image, Video, StringSession } = require('./julie/');
const { DataTypes } = require('sequelize');
// const { GreetingsDB, getMessage } = require("./plugins/sql/greetings");
const got = require('got');
const simpleGit = require('simple-git');
const git = simpleGit();
const Language = require('./language');
const Lang = Language.getString('updater');




fs.readdirSync('./plugins/sql/').forEach(plugin => {
    if(path.extname(plugin).toLowerCase() == '.js') {
        require('./plugins/sql/' + plugin);
    }
});

const plugindb = require('./plugins/sql/plugin');
const { Console } = require('console');


String.prototype.format = function() {
    var i = 0,
        args = arguments;
    return this.replace(/{}/g, function() {
        return typeof args[i] != 'undefined' ? args[i++] : '';
    });
};

// ==================== Date Scanner ====================
if (!Date.now) {
    Date.now = function() {
        return new Date()
            .getTime();
    }
}
// ==================== End Date Scanner ====================

Array.prototype.remove = function() {
    var what, a = arguments,
        L = a.length,
        ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

async function WhatsLiza() {

    
        console.log(chalk.green.bold(' Connecting to WhatsApp-Beta Web...'));


const conn = makeWASocket({
    logger: pino({level: 'silent'}),
    printQRInTerminal: true,
    auth: state
});
conn.ev.on('connection.update', async(update) => {
    const { connection, lastDisconnect } = update

    if (connection === 'close') {
        if (lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
            connectToWA()
        }
    }else if (connection === 'open') {
        console.log('conected')



//===================INSTALL EXTERNALPLUGINS=========================
try{
    console.log('INSTALL EXTERNALPLUGINS')
var plugins = await plugindb.PluginDB.findAll();
plugins.map(async (plugin) => {
    if (!fs.existsSync('./plugins/' + plugin.dataValues.name + '.js')) {
        console.log(plugin.dataValues.name);
        var response = await got(plugin.dataValues.url);
        if (response.statusCode == 200) {
            fs.writeFileSync('./plugins/' + plugin.dataValues.name + '.js', response.body);
            require('./plugins/' + plugin.dataValues.name + '.js');
        }     
    }
});
 } catch(error) {
	 console.log("external plugin error")
	 //console.log(error)
	 }
//=================== END INSTALL EXTERNALPLUGINS=========================
        console.log(
        chalk.blueBright.italic('𝙸𝙽𝚂𝚃𝙰𝙻𝙻𝙸𝙽𝙶 𝚙𝚕𝚞𝚐𝚒𝚗𝚜...'));



  
	             fs.readdirSync('./plugins')
                .forEach(plugin => {
                if (path.extname(plugin)
                    .toLowerCase() == '.js') {
                    require('./plugins/' + plugin);
                }
            });   
	    
	    console.log(
        chalk.green.bold('✅ 𝙿𝙻𝚄𝙶𝙸𝙽𝚂 𝙸𝙽𝚂𝚃𝙰𝙻𝙻𝙴𝙳'));


    conn.ev.on('creds.update', saveState);

    conn.ev.on("messages.upsert", async(chatUpdate) => {

        if (!chatUpdate.messages && !chatUpdate.count) return;

        let msg = chatUpdate.messages[0]

        if (msg.key && msg.key.remoteJid == 'status@broadcast') return; // WhatsApp Status

    if (config.NO_ONLINE) {
            await conn.updatePresence(msg.key.remoteJid, Presence.unavailable);
        }
   
    if (config.BLOCKCHAT !== false) {     
        var abc = config.BLOCKCHAT.split(',');                            
        if(msg.key.remoteJid.includes('-') ? abc.includes(msg.key.remoteJid.split('@')[0]) : abc.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
    }
    if (config.SUPPORT == '905524317852-1612300121') {     
        var sup = config.SUPPORT.split(',');                            
        if(msg.key.remoteJid.includes('-') ? sup.includes(msg.key.remoteJid.split('@')[0]) : sup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
    }
    if (config.SUPPORT2 == '917012074386-1631435717') {     
        var tsup = config.SUPPORT2.split(',');                            
        if(msg.key.remoteJid.includes('-') ? tsup.includes(msg.key.remoteJid.split('@')[0]) : tsup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
    }
    if (config.SUPPORT3 == '905511384572-1621015274') {     
        var nsup = config.SUPPORT3.split(',');                            
        if(msg.key.remoteJid.includes('-') ? nsup.includes(msg.key.remoteJid.split('@')[0]) : nsup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
    }
    if (config.SUPPORT4 == '905511384572-1625319286') {     
        var nsup = config.SUPPORT4.split(',');                            
        if(msg.key.remoteJid.includes('-') ? nsup.includes(msg.key.remoteJid.split('@')[0]) : nsup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
    }
    
        events.commands.map(
            async (command) =>  {
                if (msg.message && msg.message.imageMessage && msg.message.imageMessage.caption) {
                    var text_msg = msg.message.imageMessage.caption;
                } else if (msg.message && msg.message.videoMessage && msg.message.videoMessage.caption) {
                    var text_msg = msg.message.videoMessage.caption;
                } else if (msg.message) {
                    var text_msg = msg.message.extendedTextMessage === null ? msg.message.conversation : msg.message.extendedTextMessage.text;
                } else {
                    var text_msg = undefined;
                }

                if ((command.on !== undefined && (command.on === 'image' || command.on === 'photo')
                    && msg.message && msg.message.imageMessage !== null && 
                    (command.pattern === undefined || (command.pattern !== undefined && 
                        command.pattern.test(text_msg)))) || 
                    (command.pattern !== undefined && command.pattern.test(text_msg)) || 
                    (command.on !== undefined && command.on === 'text' && text_msg) ||
                    // Video
                    (command.on !== undefined && (command.on === 'video')
                    && msg.message && msg.message.videoMessage !== null && 
                    (command.pattern === undefined || (command.pattern !== undefined && 
                        command.pattern.test(text_msg))))) {

                    let sendMsg = false;
                    var chat = conn.chats.get(msg.key.remoteJid)
                        
                    if ((config.SUDO !== false && msg.key.fromMe === false && command.fromMe === true &&
                        (msg.participant && config.SUDO.includes(',') ? config.SUDO.split(',').includes(msg.participant.split('@')[0]) : msg.participant.split('@')[0] == config.SUDO || config.SUDO.includes(',') ? config.SUDO.split(',').includes(msg.key.remoteJid.split('@')[0]) : msg.key.remoteJid.split('@')[0] == config.SUDO)
                    ) || command.fromMe === msg.key.fromMe || (command.fromMe === false && !msg.key.fromMe)) {
                        if (command.onlyPinned && chat.pin === undefined) return;
                        if (!command.onlyPm === chat.jid.includes('-')) sendMsg = true;
                        else if (command.onlyGroup === chat.jid.includes('-')) sendMsg = true;
                    }
                    if ((config.YAK !== false && msg.key.fromMe === false && command.fromMe === true &&
                        (msg.participant && config.YAK.includes(',') ? config.YAK.split(',').includes(msg.participant.split('@')[0]) : msg.participant.split('@')[0] == config.YAK || config.YAK.includes(',') ? config.YAK.split(',').includes(msg.key.remoteJid.split('@')[0]) : msg.key.remoteJid.split('@')[0] == config.YAK)
                    ) || command.fromMe === msg.key.fromMe || (command.fromMe === false && !msg.key.fromMe)) {
                        if (command.onlyPinned && chat.pin === undefined) return;
                        if (!command.onlyPm === chat.jid.includes('-')) sendMsg = true;
                        else if (command.onlyGroup === chat.jid.includes('-')) sendMsg = true;
                    }
  
                    if (sendMsg) {
                        if (config.SEND_READ && command.on === undefined) {
                            await conn.chatRead(msg.key.remoteJid);
                        }
                       
                        var match = text_msg.match(command.pattern);
                        
                        if (command.on !== undefined && (command.on === 'image' || command.on === 'photo' )
                        && msg.message.imageMessage !== null) {
                            whats = new Image(conn, msg);
                        } else if (command.on !== undefined && (command.on === 'video' )
                        && msg.message.videoMessage !== null) {
                            whats = new Video(conn, msg);
                        } else {
                            whats = new Message(conn, msg);
                        }
/*
                        if (command.deleteCommand && msg.key.fromMe) {
                            await whats.delete(); 
                        }
*/
                        try {
                            await command.function(whats, match);
                        } catch (error) {
                            if (config.NOLOG == 'off') {
                                
                                await conn.sendMessage(conn.user.jid, { text :  '*~_________~ 𝐋𝐈𝐙𝐀 𝐌𝐖𝐎𝐋࿐ ~______~*' +
                                    '\n\n*👾 ' + error + '*\n\n```Report errors\njoin ⚠️Warning bot not allowed in the group\nchat.whatsapp.com/HrPTDEi6NPsJpgvMZHNBg7``` ' 
                                    });
                            }
                        }
                    }
                }
            }
        )
    })

}

WhatsLiza();
