const { prefix, developerID } = require("./config.json")
const { config } = require("dotenv");
const db =require("quick.db");
const welc = require("image-cord")
const moment = require("moment");
const Discord = require('discord.js')
const fetch = require("node-fetch");
const express = require('express')
const app = express()
const { Canvas, resolveImage } = require('canvas-constructor');
const canvas = require('canvas')
const { Client, MessageEmbed }  = require('discord.js');
const client = new Discord.Client({
  disableEveryone: false
});
let cooldown = new Set();
let cdseconds = 1; // cooldown time

// This code is made by Supreme#2401

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});
process.on('UnhandledRejection', console.error);
 

client.on("message", async message => {
    
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;

  if(cooldown.has(message.author.id)){

    return message.channel.send(`**${message.author.username}** wait \`10\` seconds to use this command!`)
  }
  cooldown.add(message.author.id);
  setTimeout(() => {
cooldown.delete(message.author.id)}, cdseconds * 1000)

  if (!message.member)
    message.member = message.guild.fetchMember(message);

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);

  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) command.run(client, message, args);

  
  

});

const { registerFont } = require('canvas');
registerFont('./fonts/Vampire Wars.ttf', { family: 'Vampire Wars' });

client.on("guildMemberAdd", async member => {

  

  

let channel = db.get(`welcome_${member.guild.id}`);
  let text = db.get(`desc_${member.guild.id}`)
   let nail = db.get(`thumbnail_${member.guild.id}`)


if (channel === null) {
    return;
  }
// This code is made by Supreme#2401
  
let mes = text.replace(/`?\?user`?/g, member.user.username).replace(/`?\?server`?/g, member.guild.name).replace(/`?\?tag`?/g, member.user.tag).replace(/`?\?mention`?/g, `<@${member.user.id}>`).replace(/`?\?rank`?/g, member.guild.members.cache.size);


const links = require('./JSON/link.json')



 let link = links.link[Math.floor((Math.random() * links.link.length))];

    const img = await canvas.loadImage(`${link}`);

 
let userPfp = await resolveImage(member.user.displayAvatarURL({
            format: "jpg",
            size: 1024
        }))

    let image = new Canvas(6912, 3456)
      .printImage(img, 0, 0, 6912, 3456)
      .setColor(`#000000`)
      .setTextFont('500px Quicksand-SemiBold')
      .setStrokeColor(`#ffffff`)
      .setStrokeWidth(5)
      .setTextAlign("center")
      .setTextFont('250px Quicksand-SemiBold')
      .printWrappedText(member.user.tag, 3456, 2775)
      .printWrappedText(`You are the ${member.guild.members.cache.size}th member`, 3456, 3100)
      
      .printCircularImage(userPfp, 3456, 1000, 800, 800)
      .toBuffer();
      
    


  client.channels.cache.get(channel).send(mes, new Discord.MessageAttachment((await image), "image.png"));

});





// Do not change anything here
require('http').createServer((req, res) => res.end(`
 |-----------------------------------------|
 |              Informations               |
 |-----------------------------------------|
 |• Alive: 24/7                            |
 |-----------------------------------------|
 |• Author: Supreme#2401                   |
 |-----------------------------------------|
 |• Server: https://discord.gg/gU7XAxTpX5  |
 |-----------------------------------------|
 |• Github: https://github.com/diwasatreya |
 |-----------------------------------------|
 |• License: Apache License 2.0            |
 |-----------------------------------------|
`)).listen(300) //Dont remove this 

//client.on("ready", () => {
   //.user.setStatus("dnd"); // You can change it to online, dnd, idle

 //console.log(`Successfully logined as ${client.user.tag} `)
//});

//  For Watching Status
 client.on("ready", () => {
 client.user.setActivity(`Rukshan Chamindu's server`, { type:         "WATCHING"})
 console.log(`Successfully logined as ${client.user.tag} `)
 });


client.login(process.env.TOKEN);
