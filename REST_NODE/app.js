const express = require("express");
const fs = require("fs");
    
const app = express();
const jsonParser = express.json();
app.use(express.static(__dirname + "/public"));
const filePath = "music.json";
app.get("/api/music", function(req, res){
       
    const content = fs.readFileSync(filePath,"utf8");
    const musics = JSON.parse(content);
    res.send(musics);
});
app.get("/api/music/:id", function(req, res){
       
    const id = req.params.id; // получаем id
    const content = fs.readFileSync(filePath, "utf8");
    const musics = JSON.parse(content);
    let music = null;
    // находим в массиве пользователя по id
    for(var i=0; i<musics.length; i++){
        if(musics[i].id==id){
            music = musics[i];
            break;
        }
    }
    if(music){
        res.send(music);
    }
    else{
        res.status(404).send();
    }
});
// получение отправленных данных
app.post("/api/music", jsonParser, function (req, res) {
      
    if(!req.body) return res.sendStatus(400);
      
    const musicName = req.body.name;
    const musicAge = req.body.age;
    let music = {name: musicName, age: musicAge};
      
    let data = fs.readFileSync(filePath, "utf8");
    let musics = JSON.parse(data);
      
    // находим максимальный id
    const id = Math.max.apply(Math,musics.map(function(o){return o.id;}))
    // увеличиваем его на единицу
    music.id = id+1;
    musics.push(music);
    data = JSON.stringify(musics);
    // перезаписываем файл с новыми данными
    fs.writeFileSync("music.json", data);
    res.send(music);
});
 // удаление пользователя по id
app.delete("/api/music/:id", function(req, res){
       
    const id = req.params.id;
    let data = fs.readFileSync(filePath, "utf8");
    let musics = JSON.parse(data);
    let index = -1;
    // находим индекс пользователя в массиве
    for(var i=0; i < musics.length; i++){
        if(musics[i].id==id){
            index=i;
            break;
        }
    }
    if(index > -1){
        const music = musics.splice(index, 1)[0];
        data = JSON.stringify(musics);
        fs.writeFileSync("music.json", data);
        res.send(music);
    }
    else{
        res.status(404).send();
    }
});
// изменение пользователя
app.put("/api/music", jsonParser, function(req, res){
       
    if(!req.body) return res.sendStatus(400);
      
    const musicId = req.body.id;
    const musicName = req.body.name;
    const musicAge = req.body.age;
      
    let data = fs.readFileSync(filePath, "utf8");
    const musics = JSON.parse(data);
    let music;
    for(var i=0; i<musics.length; i++){
        if(musics[i].id==musicId){
            music = musics[i];
            break;
        }
    }
    if(music){
        music.age = musicAge;
        music.name = musicName;
        data = JSON.stringify(musics);
        fs.writeFileSync("music.json", data);
        res.send(music);
    }
    else{
        res.status(404).send(music);
    }
});
   
app.listen(8800, function(){
    console.log("Подключайтесь на localhost:8800");
});