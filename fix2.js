const fs = require('fs');
for (let i = 1; i <= 10; i++) {
  const names = ['Hero','CoreConcepts','CaseStudy','Setup','Capstone','Lab','Quiz','ConceptMap','Resources','Navigation'];
  const f = './src/animations/week-0/components/Section' + i + names[i-1] + '.tsx';
  if(!fs.existsSync(f)) continue;
  let t = fs.readFileSync(f, 'utf8');
  t = t.replace(/ease:\s*"easeOut"(\s*as\s*const)*/g, 'ease: "easeOut" as const');
  t = t.replace(/type:\s*"spring"(\s*as\s*const)*/g, 'type: "spring" as const');
  t = t.replace(/ease:\s*\[([^\]]+)\](\s*as\s*const)*/g, 'ease: [] as const');
  fs.writeFileSync(f, t);
}
console.log('Fixed typescript over-escaping / array typing');
