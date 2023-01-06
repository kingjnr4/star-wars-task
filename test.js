import http from 'https'
import fs from 'fs'
import json from './src/assets/images.json' assert {type:"json"}
import sharp from 'sharp'

// var download = function(url, dest, cb) {
//   var file = fs.createWriteStream(dest,{flags:'a+'});
//   http.get(url, function(response) {
//     response.pipe(file);
//     file.on('finish', function() {
//       file.close(cb);
//     });
//   });
// }

// json.forEach((char)=>{
//     download(char.image,'./src/assets/images/'+char.name+".png",()=>{console.log("ok")})
// })
const path = './src/assets/images/'

fs.readdir(path, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        removeBg(file)
    });
})
function removeBg(file){
    sharp(path+file).flatten({background:'#ffffff'}).toFile('./src/assets/images_no_bg/'+file)
}