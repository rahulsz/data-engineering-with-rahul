const fs = require('fs');
const dir = './src/animations/week-0/components/';
fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.tsx')) {
    let f = dir + file;
    let t = fs.readFileSync(f, 'utf8');
    t = t.replace(/ease:\s*(\[[^\]]+\])\s*as\s*const/g, 'ease: ');
    t = t.replace(/ease:\s*"easeInOut"/g, 'ease: "easeInOut" as const');
    t = t.replace(/ease:\s*"easeOut"/g, 'ease: "easeOut" as const');
    t = t.replace(/type:\s*"spring"/g, 'type: "spring" as const');
    t = t.replace(/as\s*const\s*as\s*const/g, 'as const');
    fs.writeFileSync(f, t);
  }
});
console.log('Fixed easeInOut and array ease values');
