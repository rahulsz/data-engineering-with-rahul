const fs = require('fs');
for (let i = 1; i <= 10; i++) {
  const names = ['Hero','CoreConcepts','CaseStudy','Setup','Capstone','Lab','Quiz','ConceptMap','Resources','Navigation'];
  const f = './src/animations/week-0/components/Section' + i + names[i-1] + '.tsx';
  if(!fs.existsSync(f)) continue;
  let t = fs.readFileSync(f, 'utf8');
  t = t.replace(/ease:\s*"easeOut"/g, 'ease: "easeOut" as const');
  t = t.replace(/type:\s*"spring"/g, 'type: "spring" as const');
  t = t.replace(/className=\"language-python\"/g, 'language="python"');
  t = t.replace(/className=\"language-sql\"/g, 'language="sql"');
  fs.writeFileSync(f, t);
}
console.log('Fixed typescript errors everywhere');
