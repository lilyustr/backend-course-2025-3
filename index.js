const { program } = require('commander')

program.option ('-f, --file <path>', 'шлях до JSON файлу');

program.parse(process.argv);
const options = program.opts();
console.log('вибраний файл:', options.file);