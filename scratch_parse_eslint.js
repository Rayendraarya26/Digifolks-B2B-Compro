const fs = require('fs');

let raw = fs.readFileSync('eslint2.json', 'utf16le');
if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);
const data = JSON.parse(raw);
for (const file of data) {
  const errors = file.messages.filter(m => m.severity === 2);
  if (errors.length > 0) {
    console.log(file.filePath);
    for (const err of errors) {
      console.log(`  Line ${err.line}: ${err.message} (${err.ruleId})`);
    }
    console.log();
  }
}
