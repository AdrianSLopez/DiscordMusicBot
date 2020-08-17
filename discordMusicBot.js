const Discord = require('discord.js');
const ytdl = require("ytdl-core");

const prefix = "!";
//const token = TOKEN IS PRIVATE;
const bot = new Discord.Client();

bot.once('ready', ()=>{
    console.log("Ready!")
})

bot.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(' '); //acm
    const command = args.shift().toLowerCase();

    if(command.toLowerCase() === 'youtube' || command.toLowerCase() === 'yt'){

        const voiceChannel = message.member.voice.channel;

        if(!voiceChannel){
            message.reply('You need to be in a voice channel to play or stop a youtube audio only video');
            return;
        }

        if(args[0] == null || args[0]== undefined){
            message.reply("Provide a command. Valid commands are: 'play' or 'stop'. " );
            return;
        }

        switch(args[0].toLowerCase() ){
            
            case 'play':
                //This if statement whether the url is a youtube link
                if(!args[1] || args[1].indexOf("https://www.youtube.com/") === -1 ){
                    message.reply('Provide a working Youtube link!');
                    return;
                }

                //If the the link is okay and you are in a voice channel then the bot joins your channel..
                voiceChannel.join().then(connection =>{
                    console.log("joining channel...");
                    // This bottom line gets the provided url code and downloads the audioonly
                    var dispatcher = connection.play(ytdl(args[1], {filter: 'audioonly'}));
                    //It should start playing by now, a message will appear in the terminal saying 'music is starting'.
                    dispatcher.on("start", ()=>{
                        console.log("music is starting...");
                    });
                });
                break;

            //Case 'stop' basically leaves the channel.
            case 'stop':

                //Bot just leaves
                voiceChannel.leave();
                break;

            // if a command other than 'play' or 'stop' is used, it should give the bottom message.
            default:
                message.reply(`Command ${args[0]} is not valid. Try 'play' or 'stop' after youtube or yt.`)
        }
    }
})

bot.login(token);