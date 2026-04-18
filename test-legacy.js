// eslint-disable-next-line @typescript-eslint/no-require-imports
const mongoose = require('mongoose');
const uri = 'mongodb://admin:feZUOwoVouqVOxlo@ac-b9u4e6v-shard-00-00.ia9uyll.mongodb.net:27017,ac-b9u4e6v-shard-00-01.ia9uyll.mongodb.net:27017,ac-b9u4e6v-shard-00-02.ia9uyll.mongodb.net:27017/data_engineer_db?ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(uri).then(() => { 
  console.log('✅ LEGACY STRING SUCCESS'); 
  process.exit(0); 
}).catch(err => {
  console.error("❌ FAILED: " + err.message);
  process.exit(1);
});
