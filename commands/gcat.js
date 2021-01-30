module.exports = {
  name: "gencat",
  code: `$createChannel[$message[1]❯$replaceText[$message;$message[1];];category]
\`\`$message[1]❯$replaceText[$message;$message[1];]\`\` **foi criado com sucesso!**`
}