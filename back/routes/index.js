var express = require('express');
var router = express.Router();
var dFonk = require("../helper/databaseFonk.js");
var fonk = require("../helper/uretimZaman");

function uretimKaynak(data, id) {
    return new Promise(function (resolve, reject) {
        var rData = data.resources;
        let dif, difDeath, eaeDeathLog = [];
        let olmeyecekler = {
            cow: rData.cow,
            chicken: rData.chicken,
            bee: rData.bee
        };
        if (rData.cow != null) {
            olmeyecekler.cow = [];
            for (var j = 0; j < rData.cow.length; j++) {
                //hayvan sayısına göre bonus
                var oran = 1.0;
                if (rData.cow.length >= 10 && rData.cow.length < 20) {
                    oran = 1.2;
                } else if (rData.cow.length >= 20 && rData.cow.length < 30) {
                    oran = 1.5;
                } else if (rData.cow.length >= 30) {
                    oran = 2.0;
                }
                //
                dif = fonk.diffMin(new Date(), new Date(rData.cow[j].cal)); //son beslenmeden beri geçen zaman
                if (parseInt(dif / 5) >= 1 && rData.seed <= fonk.eatSeedBee(dif)) {
<<<<<<< HEAD
                    rData.cow[j].death = fonk.upTime(rData.cow[j].death, parseInt(dif / 5)); //ömür kısaltma
                }
                difDeath = fonk.diffMin(new Date(), new Date(rData.cow[j].death)); //yaşamış olduğu süre
                difTotal = fonk.deathCow() - fonk.diffMin(new Date(rData.cow[j].cal), new Date(rData.cow[j].death));
=======
                    rData.cow[j].lifetime -= parseInt(dif / 5); //ömür kısaltma
                }
                difDeath = fonk.diffMin(new Date(), new Date(rData.cow[j].bTime)); //yaşamış olduğu süre

>>>>>>> emre

                if (difDeath >= rData.cow[j].lifetime) {
                    if (rData.seed >= fonk.eatSeedCow(dif)) {
<<<<<<< HEAD
                        if (difTotal > 0) {
                            rData.milk = parseFloat(rData.milk) + parseFloat(fonk.cowMilk(difTotal, oran));
                            if (rData.seed >= fonk.eatSeedCow(difTotal)) {
                                rData.seed -= fonk.eatSeedCow(difTotal)
=======
                        if (rData.cow[j].lifetime > 0) {
                            rData.milk = parseFloat(rData.milk) + parseFloat(fonk.cowMilk(rData.cow[j].lifetime, oran));
                            if (rData.seed >= fonk.eatSeedCow(rData.cow[j].lifetime)) {
                                rData.seed -= fonk.eatSeedCow(rData.cow[j].lifetime)
>>>>>>> emre
                            }
                        }
                    }
                    eaeDeathLog.push({
                        topic: "eaeDeathLog",
                        messages: JSON.stringify({
                            animalType: "cow",
                            userName: data.userName,
                            lifeTime: rData.cow[j].lifetime,
                            bTime: rData.cow[j].bTime
                        })
                    });
                } else {
                    if (rData.seed >= fonk.eatSeedCow(dif)) {
                        rData.milk = parseFloat(rData.milk) + parseFloat(fonk.cowMilk(dif, oran));
                        rData.cow[j].cal = new Date();
                        rData.seed -= fonk.eatSeedCow(dif);
                    }
                    olmeyecekler.cow.push(rData.cow[j]);
                }
            }
            rData.cow = olmeyecekler.cow;
        }

        if (rData.chicken != null) {
            olmeyecekler.chicken = [];
            for (var j = 0; j < rData.chicken.length; j++) {
                //hayvan sayısına göre bonus
                var oran = 1.0;
                if (rData.chicken.length >= 10 && rData.chicken.length < 20) {
                    oran = 1.2;
                } else if (rData.chicken.length >= 20 && rData.chicken.length < 30) {
                    oran = 1.5;
                } else if (rData.chicken.length >= 30) {
                    oran = 2;
                }
                //

<<<<<<< HEAD
                dif = fonk.diffMin(new Date(), new Date(rData.chicken[j].cal));
                if (parseInt(dif / 5) >= 1 && rData.seed <= fonk.eatSeedBee(dif)) {
                    rData.chicken[j].death = fonk.upTime(rData.chicken[j].death, parseInt(dif / 5)); //ömür kısaltma
=======
                dif = fonk.diffMin(new Date(), new Date(rData.chicken[j].cal));//son beslenmeden beri geçen zaman
                if (parseInt(dif / 5) >= 1 && rData.seed <= fonk.eatSeedBee(dif)) {
                    rData.chicken[j].lifetime -= parseInt(dif / 5); //ömür kısaltma
>>>>>>> emre
                }
                difDeath = fonk.diffMin(new Date(), new Date(rData.chicken[j].bTime));//yaşamış olduğu süre

                if (difDeath >= rData.chicken[j].lifetime) {
                    if (rData.seed >= fonk.eatSeedChicken(dif)) {
<<<<<<< HEAD
                        if (difTotal > 0) {
                            rData.egg = parseFloat(rData.egg) + parseFloat(fonk.chickenEgg(difTotal, oran));
                            if (rData.seed >= fonk.eatSeedChicken(difTotal)) {
                                rData.seed -= fonk.eatSeedChicken(difTotal)
=======
                        if (rData.chicken[j].lifetime > 0) {
                            rData.egg = parseFloat(rData.egg) + parseFloat(fonk.chickenEgg(rData.chicken[j].lifetime, oran));
                            if (rData.seed >= fonk.eatSeedChicken(rData.chicken[j].lifetime)) {
                                rData.seed -= fonk.eatSeedChicken(rData.chicken[j].lifetime)
>>>>>>> emre
                            }
                        }
                    }
                    eaeDeathLog.push({
                        topic: "eaeDeathLog",
                        messages: JSON.stringify({
                            animalType: "chicken",
                            userName: data.userName,
                            lifeTime: rData.chicken[j].lifetime,
                            bTime: rData.chicken[j].bTime
                        })
                    });
                } else {
                    if (rData.seed >= fonk.eatSeedChicken(dif)) {
                        rData.egg = parseFloat(rData.egg) + parseFloat(fonk.chickenEgg(dif, oran));
                        rData.chicken[j].cal = new Date();
                        rData.seed -= fonk.eatSeedChicken(dif);
                    }
                    olmeyecekler.chicken.push(rData.chicken[j]);
                }
            }
            rData.chicken = olmeyecekler.chicken;
        }

        if (rData.bee != null) {

            olmeyecekler.bee = [];
            for (var j = 0; j < rData.bee.length; j++) {
                //hayvan sayısına göre bonus
                var oran = 1.0;
                if (rData.bee.length >= 10 && rData.bee.length < 20) {
                    oran = 1.2;
                } else if (rData.bee.length >= 20 && rData.bee.length < 30) {
                    oran = 1.5;
                } else if (rData.bee.length >= 30) {
                    oran = 2;
                }
                //

                dif = fonk.diffMin(new Date(), new Date(rData.bee[j].cal));
                if (parseInt(dif / 5) >= 1 && rData.seed <= fonk.eatSeedBee(dif)) {
<<<<<<< HEAD
                    rData.bee[j].death = fonk.upTime(rData.bee[j].death, parseInt(dif / 5)); //ömür kısaltma
=======
                    rData.bee[j].lifetime -= parseInt(dif / 5); //ömür kısaltma
>>>>>>> emre
                }
                difDeath = fonk.diffMin(new Date(), new Date(rData.bee[j].bTime));//yaşamış olduğu zaman

                if (difDeath >= rData.bee[j].lifetime) {
                    if (rData.seed >= fonk.eatSeedBee(dif)) {
<<<<<<< HEAD
                        if (difTotal > 0) {
                            rData.honey = parseFloat(rData.honey) + parseFloat(fonk.beeHoney(difTotal, oran));
                            if (rData.seed >= fonk.eatSeedBee(difTotal)) {
                                rData.seed -= fonk.eatSeedBee(difTotal)
=======
                        if (rData.bee[j].lifetime > 0) {
                            rData.honey = parseFloat(rData.honey) + parseFloat(fonk.beeHoney(rData.bee[j].lifetime, oran));
                            if (rData.seed >= fonk.eatSeedBee(rData.bee[j].lifetime)) {
                                rData.seed -= fonk.eatSeedBee(rData.bee[j].lifetime)
>>>>>>> emre
                            }
                        }
                    }
                    eaeDeathLog.push({
                        topic: "eaeDeathLog",
                        messages: JSON.stringify({
                            animalType: "bee",
                            userName: data.userName,
                            lifeTime: rData.bee[j].lifetime,
                            bTime: rData.bee[j].bTime
                        })
                    });
                } else {
                    if (rData.seed >= fonk.eatSeedBee(dif)) {
                        rData.honey = parseFloat(rData.honey) + parseFloat(fonk.beeHoney(dif, oran));
                        rData.bee[j].cal = new Date();
                        rData.seed -= fonk.eatSeedBee(dif);
                    }
                    olmeyecekler.bee.push(rData.bee[j]);
                }
            }
            rData.bee = olmeyecekler.bee;
        }

        dFonk.findByIdAndUpdate[process.env.SELECTED_DATABASE](id, rData).then((resultData) => {
            if (eaeDeathLog.length != 0) {
                dFonk.logOlustur2(eaeDeathLog, "eaeDeathLog").then((result) => {
                    resolve(rData);
                }).catch((err) => {
                    reject(err);
                });
            }else{
                resolve(rData);
            }

        }).catch((reason) => {
            reject(reason);
        });

    });
}

// Asıl Siteye Yönlendirir
router.get('/', function (req, res, next) {

    res.redirect("http://localhost:3000/");

});

// Kullanıcı Oluşturur
router.post('/userCreate', function (req, res, next) {

    var member = req.body.member;

    dFonk.kayitOlustur[process.env.SELECTED_DATABASE](member).then((result) => {

        res.json({ status: 201, member: result });

    }).catch((reason) => {
        if (reason == "mukerrer") {
            res.json({ status: 499 });
        }
    });
});

// Kullanıcının databasede olup olmadığını kontrol eder
router.post('/userControl', function (req, res, next) {

    const {
        userName,
        password
    } = req.body;
    var userData = {
        userName: userName,
        password: password
    }

    dFonk.kayitGetir[process.env.SELECTED_DATABASE](userData).then((result) => {
        res.json({ status: 201, account: result });
    }).catch((reason) => {
        if (reason == "bulunamadı") {
            res.json({ status: 204 });
        } else {
            res.json({ status: 409 });
        }
    });
});

// Kullanıcı Kontrolünden sonra ürünlerini günceller.
router.post('/requireAuthentication', function (req, res, next) {

    const { userName, password } = req.body;
    var userData = { userName: userName, password: password }

    dFonk.kayitGetir[process.env.SELECTED_DATABASE](userData).then((resultData) => {

        uretimKaynak(resultData, resultData._id).then(function (result) {
            resultData.resources = result;
            res.json({ status: 201, account: resultData });
        });

    }).catch((reason) => {
        if (reason == "bulunamadı") {
            res.json({ status: 204 });
        } else {
            res.json({ status: 409, reason: reason });
        }
    });
});

// Kullanıcı Bilgilerini Günceller
router.post('/userUpdate', function (req, res, next) {

    const { id, rData } = req.body.islemler;
    const log = req.body.loglar;

    dFonk.findByIdAndUpdate[process.env.SELECTED_DATABASE](id, rData).then((resultData) => {

        dFonk.logOlustur(log, "eaeLog").then((result) => {
            res.json({ status: 201, rData: rData });
        }).catch((err) => {
            res.json({ status: 409 });
        });

    }).catch((reason) => {
        res.json({ status: 409 });
    });
});

// hayvan ve yem Satın Alma Yeri
router.post('/buyAnimalFeed', function (req, res, next) {

    let { id, islem, rData } = req.body.islemler;
    let log = req.body.loglar;

    var minCoin = 0;

    var kayit = {
        cal: new Date(),
        lifetime: 15,
        bTime: new Date()
    };

    if (islem == "cow") {
        minCoin = 50;
        kayit.lifetime = 15 + parseInt(fonk.lifetimeCalc(4));
        rData.cow.push(kayit);
    } else if (islem == "chicken") {
        minCoin = 20;
        kayit.lifetime = 15 + parseInt(fonk.lifetimeCalc(3));
        rData.chicken.push(kayit);
    } else if (islem == "bee") {
        minCoin = 5;
        kayit.lifetime = 15 + parseInt(fonk.lifetimeCalc(2));
        rData.bee.push(kayit);
    } else if (islem == "seed") {
        minCoin = 1;
        rData.seed = parseInt(rData.seed) + 100;
    }

    if (rData.coin >= minCoin) {

        rData.coin -= minCoin;

        dFonk.findByIdAndUpdate[process.env.SELECTED_DATABASE](id, rData).then((resultData) => {
            dFonk.logOlustur(log, "eaeLog").then((result) => {
                res.json({ status: 201, rData: rData });
            }).catch((err) => {
                res.json({ status: 409 });
            });
        }).catch((reason) => {
            res.json({ status: 409 });
        });
    } else {
        res.json({ status: 101 }); // yeterli altını yok
    }
});

// Ürünleri Satar
router.post('/sellProducts', function (req, res, next) {

    let { id, islem, rData } = req.body.islemler;
    let log = req.body.loglar;

    if (rData[islem] > 0) {
        rData.coin += fonk.sellMilk(rData[islem]);
        rData[islem] = 0;
    }

    dFonk.findByIdAndUpdate[process.env.SELECTED_DATABASE](id, rData).then((resultData) => {

        dFonk.logOlustur(log, "eaeLog").then((result) => {
            res.json({ status: 201, rData: rData });
        }).catch((err) => {
            res.json({ status: 409 });
        });

    }).catch((reason) => {
        res.json({ status: 409 });
    });
});

module.exports = router;