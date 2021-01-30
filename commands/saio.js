module.exports = {
  name: "$alwaysExecute",
  code: `$onlyIf[$checkContains[$message;saio]==true;]
$useChannel[778643053937688599]
$title[Logs Saio]
$description[**$username#$discriminator($authorID) saiu de** <#$channelID>]
$color[RANDOM]`
}