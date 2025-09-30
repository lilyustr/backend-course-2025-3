const { program } = require('commander');
const fs = require('fs');
const path = require('path');

program
   .option ('-i, --input <path>', 'шлях до файлу для читання (обов`язковий параметр)')
   .option ('-o, --output <path>', 'шлях до файлу, у якому записується результат')
   .option ('-d, --display', 'вивести результат у консоль')
   .option('-c, --cylinders', 'відображати кількість циліндрів (поле cyl)')
   .option('-m, --mpg <value>', 'відображати лише машини з mpg нижче за значення', parseFloat);

program.parse(process.argv);
const options = program.opts();

if(!options.input){
    console.error('Please, specify input file');
    process.exit(1);
}

if(!fs.existsSync(options.input)){
    console.error('Cannot find input file');
    process.exit(1);
}

let data;

try {
  const fileContent = fs.readFileSync(options.input, 'utf-8');
  data = fileContent
      .trim() //видаляє зайві пробіли і порожні рядки
      .split('\n') //розбиває на окремі рядки
      .map(line => JSON.parse(line));

      let filteredData = data;

      if(options.mpg !== undefined){
        filteredData = filteredData.filter(car => car.mpg < options.mpg);
      }

   var resultString = filteredData.map(car => {
       let line = car.model;
       if (options.cylinders){
        line += ` ${car.cyl}`;
      }
      line += ` ${car.mpg}`;
        return line;
    }).join('\n');

} catch (err) {
  console.error("Error reading or parsing input file");
  process.exit(1);
}

if (options.output) {
  try {
    fs.writeFileSync(options.output, resultString, 'utf-8');
  } catch (err) {
    console.error("Error writing to output file");
    process.exit(1);
  }
}

if (options.display) {
  console.log(resultString);
}

