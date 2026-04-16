const fs = require('fs');

const line = 'from pyspark.sql import SparkSession';
let counter = 0;
const store = {};

// Protect string literals from being destroyed by subsequent syntax tag injections
let processed = line.replace(/(["'].*?["'])/g, (match) => {
   const token = `__STR${counter++}__`;
   store[token] = `<span class="text-[#A5D6FF]">${match}</span>`;
   return token;
});

processed = processed
  .replace(/\b(from|import|def|return|class|if|else|while|for|in|as)\b/g, '<span class="text-[#FF7B72]">$1</span>')
  
for (const [token, val] of Object.entries(store)) {
   processed = processed.replace(token, val);
}
  
console.log(processed);
