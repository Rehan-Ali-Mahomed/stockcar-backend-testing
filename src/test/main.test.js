const frisby = require('frisby');
const { getRandomCar } = require('./utils');

const API_Path = "http://stockcar-webapp:8085/esieaBack/rest";

describe("Test de l'API pour la gestion des voitures", function () {

    let randomCarID;
    const randomCar = getRandomCar();

    // Add random car
    it("Ajout d'une voiture aléatoire", function () {
        return frisby
            .fetch(API_Path + '/voiture/add', {
                method: 'POST',
                body: randomCar.toJson()
            })
            .expect('json', 'succes', true)
    });

    // Get all cars
    it('Récupération de toutes les voitures', function () {
        return frisby
            .get(API_Path + '/voiture/get/all')
            .expect('jsonTypes', 'voitures', frisby.Joi.array())
            .expect('jsonTypes', 'volume', frisby.Joi.number())
            .then(function (res) {
                randomCarID = JSON.parse(JSON.parse(res.body).voitures.at(-1)).id;
            })
    });

    // Get random car
    it("Récupération de la voiture aléatoire", function () {
        return frisby
            .get(API_Path + '/voiture/get/' + randomCarID)
            .then(function (res) {
                parsedData = JSON.parse(JSON.parse(res.body).voiture);

                expect(parsedData.marque).toBe(randomCar.marque);
                expect(parsedData.modele).toBe(randomCar.modele);
                expect(parsedData.finition).toBe(randomCar.finition);
                expect(parsedData.carburant[0]).toBe(randomCar.carburant[0]);
                expect(parsedData.km).toBe(randomCar.km);
                expect(parsedData.annee).toBe(randomCar.annee);
                expect(parsedData.prix).toBe(randomCar.prix);

            })
            .expect('jsonTypes', 'volume', 1)

    });

    // Delete random car
    it("Suppression de la voiture aléatoire", function () {
        return frisby
            .post(API_Path + '/voiture/del/', randomCarID)
            .expect('json', 'succes', true)

    });
});