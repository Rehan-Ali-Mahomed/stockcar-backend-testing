
class Car {
    constructor(marque, modele, finiton, carburant, km, annee, prix) {
        this.marque = marque,
            this.modele = modele,
            this.finition = finiton,
            this.carburant = carburant,
            this.km = km,
            this.annee = annee,
            this.prix = prix
    }

    toJson() {
        return JSON.stringify(this)
    }

    fromJson(jsonString) {
        let jsonObject = JSON.parse(jsonString);

        return new Car(
            jsonObject.marque,
            jsonObject.modele,
            jsonObject.finition,
            jsonObject.carburant,
            jsonObject.km,
            jsonObject.annee,
            jsonObject.prix
        );
    }
}

function getRandomCar() {
    return new Car(
        marque = getRandomString(7),
        modele = getRandomString(5),
        finition = getRandomString(1),
        carburant = 'H',
        km = getRandomInt(1000, 200000),
        annee = getRandomInt(1995, 2025),
        prix = getRandomInt(7000, 90000)
    )
}

function getRandomString(lenght = 5) {
    var allChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    return Array(lenght).join().split(',').map(function () { return allChars.charAt(Math.floor(Math.random() * allChars.length)); }).join('');
}

function getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

module.exports = { Car, getRandomCar };