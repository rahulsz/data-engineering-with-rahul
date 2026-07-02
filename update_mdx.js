const fs = require("fs");
const target = "D:\\Projects\\data-engineering-with-rahul\\content\\foundations\\week-1.mdx";
const lines = fs.readFileSync(target, "utf-8").split("\n");

// startIndex is line 27 (index 26)
// endIndex is line 151 (index 150)
const startIndex = 26;
const endIndex = 150;

const newContent = fs.readFileSync("D:\\Projects\\data-engineering-with-rahul\\new_content.txt", "utf-8");

const pre = lines.slice(0, startIndex);
const post = lines.slice(endIndex);

fs.writeFileSync(target, [...pre, newContent, ...post].join("\n"));
console.log("Successfully replaced content between lines 27 and 151");
