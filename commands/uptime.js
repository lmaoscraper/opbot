module.exports = {
  name: "uptime",
  code: `
$title[Uptime - Tempo de atividade]

$addField[Abreviado;$uptime]

$addField[Sem abreviação;$replaceText[$replaceText[$replaceText[$replaceText[$replaceText[$replaceText[$uptime;s; segundos];1 segundos;1 segundo];m; minutos];1 minutos;1 minuto];h; horas];1 horas;1 hora]]

$color[RANDOM]`
}