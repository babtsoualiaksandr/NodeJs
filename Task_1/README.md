## $node my_caesar_cli -a 

## -s, --shift: a shift
## -i, --input: an input file
## -o, --output: an output file
## -a, --action: an action encode/decode

### Exp
### $ node my_caesar_cli -a encode -s 7 -i "./input.txt" -o "./output.txt"
### $ node my_caesar_cli --action encode --shift 7 --input plain.txt --output encoded.txt
### $ node my_caesar_cli --action decode --shift 7 --input decoded.txt --output plain.txt

# ctrl+ d окончание ввоа с консоли


- [x] корне репозитория создана папка с произвольным названием (например caesar-cipher-cli, task1 и т.п.), в которой расположены файлы с кодом программы

- [x] в README.md должно быть описано, как можно запустить программу из командной строки, описаны аргументы, которые можно передать приложению

- [x] если переданы все аргументы, приложение читает из файла и записывает в файл зашифрованный/расшифрованный текст, при этом предыдущие записи не удаляются

- [x] если не переданы обязательные аргументы, приложение передает соответствующее сообщение в process.stderr и прoцесс завершается с кодом, отличным от 0

- [x] если переданы аргументы с путями к файлам, но файлы отсутствуют (или к ним невозможен доступ), приложение передает соответствующее сообщение в process.stderr и прoцесс завершается с кодом, отличным от 0

- [x] если не передан аргумент с путем до файла на чтение, то чтение осуществляется из process.stdin

- [x] если не передан аргумент с путем до файла на запись, то вывод осуществляется в process.stdout

- [x] шифруются/дешифруются только латинские буквы, регистр сохраняется, остальные символы не изменяются

- [x] если текст вводится из консоли, то программа не должна завершаться после выполнения шифровки/дешифровки введенного текста, т.е. должна быть возможность ввести еще текст

- [x] кодовая база не находится в одном файле, а разделена не файлы в соответствии с выполняемымы задачами (например - функция, преобразующая строку, в отдельном файле, код, создающий transform стрим, в отдельном файле, функция для парсинга и валидации аргументов в отдельном файле и т.п.)

# Total 10