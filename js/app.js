var app = angular.module('firebase-admin', ['firebase']);

app.constant('FIREBASE_URI', 'https://ng-fb-leaderboard.firebaseio.com/');

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

app.service('FirebaseEntitiesService', function ($firebaseArray, FIREBASE_URI) {
    var service = this;
    var ref = new Firebase(FIREBASE_URI);
    var firebaseEntities = $firebaseArray(ref);

    service.getFirebaseEntities = function () {
        return firebaseEntities;
    };

    service.addFirebaseEntity = function (firebaseEntity) {
        firebaseEntities.$add(firebaseEntity);
    };

    service.updateFirebaseEntity = function (firebaseEntity) {
        firebaseEntities.$save(firebaseEntity);
    };

    service.removeFirebaseEntity = function (firebaseEntity) {
        firebaseEntities.$remove(firebaseEntity);
    };
});
