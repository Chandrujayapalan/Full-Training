
// // // const path = require('path')
// // // const csvWriter = require('csv-writer');

// // // function generateRandomLong() {
// // //   var num = (Math.random()*180).toFixed(3);
// // //   var posorneg = Math.floor(Math.random());
// // //   if (posorneg == 0) {
// // //       num = num * -1;
// // //   }
// // //   return num;
// // // }
// // // // LATITUDE -90 to +90
// // // function generateRandomLat() {
// // //   var num = (Math.random()*90).toFixed(3);
// // //   var posorneg = Math.floor(Math.random());
// // //   if (posorneg == 0) {
// // //       num = num * -1;
// // //   }
// // //   return num;
// // // }
// // const time = [
// //   { name: 'Cameroon', capital: generateRandomLat(), countryCode:generateRandomLong(), phoneIndicator: 237 },
  
// // ];

// // for (var i = 1; i <= 1000; i++) {
// //   time.push(time.find(a =>a));
// // }
// // // const writer = csvWriter.createObjectCsvWriter({
// // //   path: path.resolve(__dirname, 'countries.csv'),
// // //   header: [
// // //     { id: 'name', title: 'Name' },
// // //     { id: 'countryCode', title: 'Country Code' },
// // //     { id: 'capital', title: 'Capital' },
// // //     { id: 'phoneIndicator', title: 'International Direct Dialling' },
// // //   ],
// // // });
// // // writer.writeRecords(time).then(() => {
// // //   console.log('Done!');
// // // });
// // var fs = require("fs");
// // var data = fs.readFileSync('input.txt');
// // console.log(data.toString());
// // console.log("Program Ended");

// // fs.readFile('input.txt', function (err, data) {
// //     if (err) return console.error(err);
// //    console.log(data.toString(),);
// // });
// // console.log("Program Ended");
// // fs.writeFileSync('index.txt', 'Some content');
// // console.log('file created');
// // const rawData = 'Hello World';
// // const data = Buffer.from(rawData, 'utf8');
// // fs.writeFileSync('index.txt', data, { encoding: 'base64' }) //
// // const txtFile = fs.readFileSync('index.txt')
// // console.log(txtFile.toString())
// // const { Buffer } = require('buffer');
// // const fs = require('fs');
// // const readline = require('readline');
// // const { stdin: input, stdout: output } = require('process');
// // const rl = readline.createInterface({ input, output });

// // input username
// // function requestUsername() {
// //   rl.question('Enter username: ', (username) => {
// //     try {
// //       if (!username) return requestUsername();
// //       const data = Buffer.from(`Your username is ${username}`);
// //       fs.writeFileSync(`${username}.txt`, data, { flag: 'ax' });
// //     } catch (e) {
// //       console.log(e.code,"asdsa")
// //       if (e.code === 'EXIST') {
// //         console.log(`${username} already exists, enter a different username`);
// //         return requestUsername();
// //       }
// //     }
// //     rl.close();
// //   });
// // }
// // requestUsername();
// const { Buffer } = require('buffer');
// const fs = require('fs');
// const readline = require('readline/promises');
// const { stdin: input, stdout: output } = require('process');
// const rl = readline.createInterface({ input, output });

// async function getUsername() {
//   const username = await rl.question('Enter username: ');
//   if (!username) return getUsername();

//   try {
//     fs.readFileSync(`${username}.txt`);
//     return username;
//   } catch (e) {
//     if (e.code === 'ENOENT') {
//       console.log(
//         `Username "${username}" does not exist, try a different username`
//       );
//       return getUsername();
//     }
//   }
// }
// async function updateUserInfo() {
//   const username = await getUsername();
//   const rawData = await rl.question('Enter user info (name|age|course): ');
//   const data = Buffer.from(`\n${rawData}\n`);
//   fs.writeFileSync(`${username}.txt`, data, { flag: 'a' });
//   rl.close();
// }
// updateUserInfo();
// var express = require('express');
// var app = express();
// var fs = require("fs");

    

// var server = app.listen(8081, function () {
//    var host = server.address().address
//    var port = server.address().port
//    console.log("Example app listening at http://%s:%s", host, port)
// })
