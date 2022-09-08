const Discord = require('discord.js')
const fetch = require("node-fetch");
const { MessageEmbed } = require('discord.js')
const express = require('express')
const app = express()
const moment = require("moment")
const links = require('../../JSON/link.json')
const { Canvas, resolveImage } = require('canvas-constructor');
const canvas = require('canvas')
const { registerFont } = require('canvas');
registerFont('./fonts/Quicksand-SemiBold.ttf', { family: 'Quicksand-SemiBold' });




module.exports = {
  name: "testimage",
  aliases: ["ti"],
  category: ":frame_photo: WELCOME",
  usage: "it",
  description: "Test image welcome.",
  run: async (client, message, args) => {
   

    let m = await message.channel.send(`**${message.author.username}** please wait image welcome looks like this:`);
    let link = links.link[Math.floor((Math.random() * links.link.length))];

    const img = await canvas.loadImage(`${link}`);

 
let userPfp = await resolveImage(message.author.displayAvatarURL({
            format: "jpg",
            size: 1024
        }))

    let image = new Canvas(6912, 3456)
      .printImage(img, 0, 0, 6912, 3456)
      .setColor(`#000000`)
      .setTextFont('500px Quicksand-SemiBold')
      .setTextAlign("center")
      .printWrappedText(`Welcome`, 3456, 2400)
      .setTextFont('250px Quicksand-SemiBold')
      .setTextAlign("center")
      .printWrappedText(`You are the ${message.guild.members.cache.size}th member`, 3456, 3100)
      .setColor(`#00000`)
      .setTextAlign("center")
      .setTextFont('250px Quicksand-SemiBold')
      .setTextAlign("center")
      .printWrappedText(message.author.tag, 3456, 2775)
      .printCircularImage(userPfp, 3456, 1000, 800, 800)
      .toBuffer();
      
    
    m.delete({ timeout: 100 });
    return message.channel.send(new Discord.MessageAttachment((await image), "image.png"))
  }
}
