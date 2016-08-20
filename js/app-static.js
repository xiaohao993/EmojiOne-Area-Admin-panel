var app = angular.module('firebase-admin', []);

app.controller('MainCtrl', function (FirebaseEntitiesService) {
    var main = this;
    main.newFirebaseEntity = {lane: '', name: '', score: ''};
    main.currentFirebaseEntity = null;
    main.firebaseEntities = FirebaseEntitiesService.getFirebaseEntities();

    main.addFirebaseEntity = function () {
        FirebaseEntitiesService.addFirebaseEntity(angular.copy(main.newFirebaseEntity));
        main.newFirebaseEntity = {lane: '', name: '', score: ''};
    };

    main.updateFirebaseEntity = function (firebaseEntity) {
        FirebaseEntitiesService.updateFirebaseEntity(firebaseEntity);
    };

    main.removeFirebaseEntity = function (firebaseEntity) {
        FirebaseEntitiesService.removeFirebaseEntity(firebaseEntity);
    };

    main.incrementScore = function () {
        main.currentFirebaseEntity.score = parseInt(main.currentFirebaseEntity.score, 10) + 1;
        main.updateFirebaseEntity(main.currentFirebaseEntity);
    };

    main.decrementScore = function () {
        main.currentFirebaseEntity.score = parseInt(main.currentFirebaseEntity.score, 10) - 1;
        main.updateFirebaseEntity(main.currentFirebaseEntity);
    };
});

app.service('FirebaseEntitiesService', function () {
    var service = this;
    var firebaseEntities = [
        {id: 1, lane: 1, name: 'FirebaseEntity 01', score: '10'},
        {id: 2, lane: 2, name: 'FirebaseEntity 02', score: '15'},
        {id: 3, lane: 3, name: 'FirebaseEntity 03', score: '20'}
    ];

    service.getFirebaseEntities = function () {
        return firebaseEntities;
    };

    service.addFirebaseEntity = function (firebaseEntity) {
        firebaseEntity.id = new Date().getTime();
        firebaseEntities.push(firebaseEntity);
    };

    service.updateFirebaseEntity = function (firebaseEntity) {
        // Already in memory
    };

    service.removeFirebaseEntity = function (firebaseEntity) {
        firebaseEntities.remove(function(c) {
            return c.id === firebaseEntity.id;
        });
    };
});