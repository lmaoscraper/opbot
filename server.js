const Discord = require("discord.js");
const LucasPD = require("lucaspurple").default;
const wikia = new LucasPD("onepiece", 1);
const pesquisa = new LucasPD("onepiece", 10)
const client = new Discord.Client();

const prefix = "!";

let SummarizerManager = require("node-summarizer").SummarizerManager;
const dbd = require("dbd.js");

const bot = new dbd.Bot({
  token: process.env.TOKEN,
  prefix: ["!"]
});

bot.onMessage();

bot.variables({
  grole: "",
  clear: ""
});

bot.readyCommand({
channel: "780178746355220523",
code: `$djsEval[
const Discord = require("discord.js")
let date = new Date()
let datebr = new Date(date.toString().replace("GMT+0000", "GMT+0300"))
let embed = new Discord.MessageEmbed()
.setTitle("Reboot")
.setDescription("Horário: "+datebr.toString().substr(16, 8))
.setColor("#0099ff")
d.message.channel.send(embed)
]`
})

bot.status({
  text: "arrumando $commandsCount comandos...",
  type: "STREAMING",
  time: 12
});

bot.status({
  text: "com $userTag[722994832921985084]",
  type: "WATCHING",
  time: 12
});

bot.status({
  text: "$allMembersCount membros",
  type: "PLAYING",
  time: 12
});

const fs = require("fs");

const folders = fs.readdirSync("./commands/");

for (const files of folders) {
  const folder = fs
    .readdirSync(`./commands/${files}/`)
    .filter(file => file.endsWith(".js"));

  for (const commands of folder) {
    const command = require(`./commands/${files}/${commands}`);
    bot.command({
      name: command.name,
      aliases: command.aliases,
      code: command.code
    });
  }
}

bot.command({
  name: "deval",
  code: `$deletecommand
  $description[
  Entrada: \`\`\`py
  $message
  \`\`\`
  Saída: 
  \`\`\`py
$djsEval[const Discord = require("discord.js")
  $message;yes]\`\`\`
  ]`

});

client.on('message', message => {

  const prefix = "!";
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase()

  if (cmd === "wiki"){
    
    message.channel.send("**Esta pesquisa pode demorar um pouco então seja paciente...**")

wikia.search(args.join(" ")).then(results => {
    
  let title = results[0]["title"]
  let article = results[0]["article"]
      const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle(title)
	.setURL(results[0]['url'])
  .setDescription(article.substr(0, 1999)+"…")
	.setImage(results[0]['img'])

message.channel.send(exampleEmbed); 

  let Summarizer = new SummarizerManager(results[0]['article'].substr(0, 750),"750"); 
  
  let summary = Summarizer.getSummaryByRank().then((summary_object)=>{
    
    let resumo = new Discord.MessageEmbed()
    
    .setColor("#0099ff")
    .setDescription(summary_object.summary)
    .setTitle("Resumo básico do artigo: " + results[0]["title"])
    .setURL(results[0]["url"])
    .setFooter("O resumo é automático então imperfeições podem ser facilmente encontradas")
    
    message.channel.send(resumo)

  })
  
})
  }});

client.on("message", message => {
  const prefix = "!";
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase()

  if(cmd === "search"){
    
   let embedalert = new Discord.MessageEmbed()
   .setTitle("Aviso")
    .setDescription("**Esta pesquisa pode demorar um pouco então seja paciente...**")
  .setColor("#0099ff")
   message.channel.send(embedalert)

pesquisa.searchResults(args.join(" ")).then(r => {
    wikia.search(args.join(" ")).then(img => {let embed = new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setImage(img[0]['img'])
    .setTitle("Pesquisa: "+args.join(" "))
    .setDescription("["+r[0]["title"]+"]"+"("+r[0]["url"]+")"+"\n["+r[1]["title"]+"]"+"("+r[1]["url"]+")"+"\n["+r[2]["title"]+"]"+"("+r[2]["url"]+")"+"\n["+r[3]["title"]+"]"+"("+r[3]["url"]+")"+"\n["+r[4]["title"]+"]"+"("+r[4]["url"]+")"+"\n["+r[5]["title"]+"]"+"("+r[5]["url"]+")"+"\n["+r[6]["title"]+"]"+"("+r[6]["url"]+")"+"\n["+r[7]["title"]+"]"+"("+r[7]["url"]+")"+"\n["+r[8]["title"]+"]"+"("+r[8]["url"]+")"+"\n["+r[9]["title"]+"]"+"("+r[9]["url"]+")")
    message.channel.send(embed)
                                             })
})
  }
})

client.on("message", message => {
  
  let args = message.content.slice(1).trim().split(/ +/g);
  let cmd = args.shift().toLowerCase()
  
  if(cmd === "info"){
    const axios = require('axios')
const cheerio = require('cheerio')
const lucaspurple = require("lucaspurple").default;
const wikia = new lucaspurple("onepiece", 1)

const fetchData = async(url) => {
    const result = await axios.get(url)
    return result.data
}

wikia.search(args.join(" ")).then(res => {
  const main = async () => {
    const content = await fetchData(res[0]["url"])
    const $ = cheerio.load(content)
    const data = {all: []}

    $('div.pi-data.pi-item-spacing.pi-border-color').each((i, e) => {
        const pall = $(e).find("h3.pi-data-label.pi-secondary-font").text() + "\n" + $(e).find("div.pi-data-value.pi-font").text()+"\n"
        const all = "**"+pall+"**"
        
        data.all.push(all)
      
    
    })
    
    console.log(data["all"])

 let embed = new Discord.MessageEmbed()
 .setTitle("Resultados para: "+args.join(" "))
 .setDescription(data["all"])   
 .setFooter("Os números e colchetes são por causa do scraper, não é possível remover eles.")
 .setColor("#0099ff")
 
 message.channel.send(embed)
}

main()
  
})}})


bot.command({
  name: "cmd", 
  code: `
  $title[Comando $splitText[1] gerado]
  $description[\`\`\`py
  ╭───── • ◆ • ─────╮
           **$splitText[1]**
╰───── • ◆ • ─────╯
╔════•| ✿ |•════╗
$splitText[2]
╚════•| ✿ |•════╝

╭───── • ◆ • ─────╮
            **Defesa/Desvio**
╰───── • ◆ • ─────╯
╔════•| ✿ |•════╗
$splitText[3]
╚════•| ✿ |•════╝  
╔════•| ✿ |•════╗
**Imagem:** $splitText[4]
╚════•| ✿ |•════╝ \`\`\`]
$color[RANDOM]
$textSplit[$message;+]
`
})

          
client.login(process.env.TOKEN)