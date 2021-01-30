module.exports = {
  name: "help",
  code: `
$reactionCollector[$splitText[1];$authorID;1m;<a:emoji_1:779002005498363914>,<a:emoji_2:779004871701430312>;help1,guide;yes]
$textSplit[$sendMessage[
{title:Help} 
{description:Olá, seja bem vindo ao meu painel de ajuda, clique nas reações para mudar de página!} 
{color:RANDOM};yes]; ]
`
}