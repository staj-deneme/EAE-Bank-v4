var express = require('express');
var router = express.Router();
var dFonk=require('../helper/databaseFonk');
var Members=require("../models/Members.js");
//http://localhost:3030/randomuser/start/8
//random fonkları
function strUret(boy){
    var text="";
    var alfabe="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < boy; i++){
        var index=Math.floor(Math.random() * alfabe.length);
        text+=alfabe[index];
    }
  return text;
}
function intUret(max,min) {
    var sayi=Math.floor(Math.random() * (max-min)+min);
  
return sayi;
}
function sehirUret(){
    var sehirler=['Adana', 'Adıyaman', 'Afyon', 'Ağrı', 'Amasya', 'Ankara', 'Antalya', 
    'Artvin',    'Aydın', 'Balıkesir', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 
    'Bursa', 'Çanakkale',    'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır', 'Edirne', 
    'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir',    'Gaziantep', 'Giresun', 'Gümüşhane',
     'Hakkari', 'Hatay', 'Isparta', 'Mersin', 'İstanbul', 'İzmir','Kars', 'Kastamonu',
      'Kayseri', 'Kırklareli', 'Kırşehir', 'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 
    'Manisa', 'Kahramanmaraş', 'Mardin', 'Muğla', 'Muş', 'Nevşehir', 'Niğde', 'Ordu',
     'Rize', 'Sakarya','Samsun', 'Siirt', 'Sinop', 'Sivas', 'Tekirdağ', 'Tokat', 
     'Trabzon', 'Tunceli','Şanlıurfa', 'Uşak','Van', 'Yozgat', 'Zonguldak', 'Aksaray', 
     'Bayburt', 'Karaman', 'Kırıkkale', 'Batman', 'Şırnak', 'Bartın', 'Ardahan', 
     'Iğdır', 'Yalova', 'Karabük', 'Kilis', 'Osmaniye', 'Düzce'];
    var sayi=Math.floor(Math.random() * (81-0)+0);
    
    return sehirler[sayi];
}
function cUret(){
    var cins=["Erkek","Kadın"];
    var sayi=Math.floor(Math.random() * (2-0)+0);
return cins[sayi];
}
router.get('/start/:count', function (req, res, next) {
    var kullanıcıSayisi=req.params.count;
    for(var i=0;i<kullanıcıSayisi;i++){
        var m =new Members({
            name: strUret(10),
            surName: strUret(10),
            userName:strUret(10),
            age:intUret(100,18),
            city:sehirUret(),
            gender:cUret(),
            password:strUret(10) ,
            eMail:strUret(4)+"@"+strUret(5),
            resources: {
                coin: intUret(2000,1000),
                milk: 0,
                egg: 0,
                honey: 0,
                seed: intUret(2000,1000),
                cow: [{
                    "cal" : new Date(),
                    "death" : new Date()
                },{
                    "cal" : new Date(),
                    "death" : new Date()
                }],
                chicken: [{
                    "cal" : new Date(),
                    "death" : new Date()
                },{
                    "cal" : new Date(),
                    "death" : new Date()
                }],
                bee: [{  
                    "cal" : new Date(),
                    "death" : new Date()
                },{
                    "cal" : new Date(),
                    "death" : new Date()
                }]
            }
        });

        dFonk.kayitOlustur[process.env.SELECTED_DATABASE](m).then((result) => {
            //res.send(result); 
        }).catch((reason) => {
            if (reason == "mukerrer") {
            }
        });
    }    
    res.send("vhjvjvjvjlvljbkjlgdgfx");
});
module.exports = router;