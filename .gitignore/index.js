const discord = require("discord.js");
const client = new discord.Client();
const fs = require('fs')
var prefix = "/"


client.login("process.env.TOKEN");

client.on('ready', function() {
    console.log("Je regarde un élément")
    client.user.setActivity("/help", {type: "WATCHING"})
})
    


client.on("message",  message =>{
    if (!message.guild) return
    if (message.content === prefix +  "status"){
        message.channel.send("Je suis en DEV " + message.author) 
        
        console.log("J'ai bien envoyé le message ! à ")
    }
});



client.on("message", message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)

    if (args[0].toLocaleLowerCase() === prefix + "kick"){
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("**CHEH ! Tu n'as pas la permission d'utiliser cette commande !**")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Faut que tu mentionnes quelqu'un.")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return
        if (!member.kickable) return message.channel.send("Je ne peux pas exclure cet utilisateur :sunglass:")
        member.kick()
        var kick_embed = new discord.RichEmbed()
        .setColor("b40202")
        .setTitle(member.user.username + " A ETE KICK")
        .setDescription("KICK PAR " + message.author)
        .setFooter("OWNED BY @SAYTEN⚡#0101 ")
        .setTimestamp()
        console.log("J'ai bien kick " + member.user.username)
        message.channel.send(kick_embed)
    }
});

client.on("message", message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)

    if (args[0].toLocaleLowerCase() === prefix + "ban"){
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("**CHEH ! Tu n'as pas la permission d'utiliser cette commande !**")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Faut que tu mentionnes quelqu'un.")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Tu es trop faible pour utliser cette commande sur cette personne.")
        if (!member.bannable) return message.channel.send("Je ne peux pas bannir cet utilisateur :sunglass:")
        member.ban()
        var ban_embed = new discord.RichEmbed()
        .setColor("b40202")
        .setTitle("[" + member.user.username + "] A ETE BANNI")
        .setDescription("BANNI PAR " + message.author)
        .setFooter("OWNED BY @SAYTEN⚡#0101 ")
        .setTimestamp()
        console.log("J'ai bien ban " + member.user.username)
        message.channel.send(ban_embed)
        
    }
});

client.on("message", message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)

    if (args[0].toLocaleLowerCase() === prefix + "clear"){
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("**CHEH ! Tu n'as pas la permission d'utiliser cette commande !**")
        let count = args[1]
        if (!count) return message.channel.send("T'es con ? Indiques un nombre de messages à supprimer.")
        if (isNaN(count)) return message.channel.send("Alors toi ! Mets un nombre ! ")
        if (count < 1 || count > 100) return message.channel.send("Entres un nombre entre 1 et 99. " + message.author)
        message.channel.bulkDelete(parseInt(count) + 1)
        message.channel.send("J'ai supprimé " + count + " messages " + message.author)
        console.log("J'ai bien supprimer " + count + " messages (BY " + message.author + ")")
        
        
    }
});

client.on("message", message =>{
    if (!message.guild) return
    if (message.content === prefix + "astro"){
        message.channel.send("**TIENS TIENS TIENS**, qu'elle très belle commande !")
    }
 })

client.on("message", message =>{
    if(!message.guild) return
    if (message.content === prefix + "help"){
            var help_embed = new discord.RichEmbed()   
            .setColor("0524e9")
            .setThumbnail("")
            .setTitle("**Voici les commandes du BOT**")
            .setDescription("__**COMMANDES**__")
            .addField("__**/status**__", "```Afficher le STATUS du bot.```")
            .addField("__**/zetlow**__", "```GIF du serveur ZETLOW.```")
            .addField("__**/info**__", "```Information(s) sur une personne. (mention)```")
            .addField("__**COMMANDES ADMIN**__", " ----------------------------------")
            .addField("__**/ban**__", "```BANNIR un utilisateur.```")
            .addField("__**/kick**__", "```EXCLURE un utlisateur.```")
            .addField("__**/mute**__", "```RENDRE MUET un utlisateur (ENCORE EN DEV)```")
            .addField("__**/bot_invite**__", "```LIEN d'invitation du BOT.```")
            .setThumbnail("https://cdn.discordapp.com/attachments/673257040273080390/677225810268127232/giphy.gif")
            .setTimestamp()
            .setFooter("BY @SAYTEN⚡#0101 ")
            message.channel.send(help_embed)
            console.log("Commande d'aide envoyée by " + message.user.username)
            message.delete(6000);
            
            
    }
});


client.on("message", message =>{
    if(message.author.bot) return
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)

    if (args[0].toLocaleLowerCase() === prefix + "mute"){
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("**CHEH ! Tu n'as pas là permission d'utiliser cette commande !**")
        let member = message.mentions.members.first()
        if(!member) return ("**IDIOT ! Tu n'as mentionnés personne . **")
        if(member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Tu es trop faible pour utliser cette commande sur cette personne.")
        if(member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send("Je ne peux pas utliser cette commande.")
        let muterole = message.guild.roles.find(role => role.name === "Mute")
        if(muterole){
            member.addRole(muterole)
            member.
            message.channel.send(member.user.username + " a été MUTE")
            
        }
        else{
            message.channel.send("Aucun rôle nommer 'Mute' n'a été crée")
        }
    }  
});

client.on("message", message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
    let member = message.author
    if (args[0].toLocaleLowerCase() === prefix + "bot_invite"){
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("**CHEH ! Tu n'as pas la permission d'utiliser cette commande !**")
        message.channel.send("__**Voici le lien d'invite du BOT**__ : https://discordapp.com/oauth2/authorize?client_id=676098905984991236&scope=bot&permissions=8 ")
    
    }
});

client.on("message", message => {
    if(!message.guild) return
    let member = message.author
    if(message.content === prefix + "zetlow"){
        var zetlow_embed = new discord.RichEmbed()
        .setColor("f61002")
        .setFooter("BY @SAYTEN⚡#0101")
        .setTimestamp()
        .setTitle("ZETLOW")
        .setImage("https://cdn.discordapp.com/attachments/673257040273080390/677225810268127232/giphy.gif")
        message.channel.send(zetlow_embed)
        console.log("Commande zetlow éxécuté par" + message.author)
    }

});

client.on("message", message => {
    if(!message.guild) return
    let args = message.content.trim().split(/ +/g)
    let msg = args[1]
    if(args[0].toLocaleLowerCase() === prefix + "msg"){
        let member = message.author
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("**CHEH ! Tu n'as pas la permission d'utiliser cette commande !**")
        if(msg) return message.channel.send(msg).then(message.delete())
        
    }
    
});

client.on("message", message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)

    if (args[0].toLocaleLowerCase() === prefix + "info"){
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Faut que tu mentionnes quelqu'un.")
        var info_embed = new discord.RichEmbed()
        .setColor("0c0404")
        .setTitle("INFORMATIONS")
        .addField("**------------------------------------**", "__**SON PSEUDO**__ **: " + member.user.username + "**")
        .addField("**------------------------------------**", "__**SES INVITATIONS**__ : ``SOON``")
        .addField("**------------------------------------**", "__**SON ROLE**__ : " )
        .setFooter("OWNED BY @SAYTEN⚡#0101 ")
        .setTimestamp()
        .setThumbnail("https://cdn.discordapp.com/attachments/673257040273080390/677225810268127232/giphy.gif")
        console.log("J'ai executer les infos de " + member.user.username)
        message.channel.send(info_embed)
        
    }
});

