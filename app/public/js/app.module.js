(function() {
    'use strict'

    // config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

    function config($stateProvider, $urlProvider, $locationProvider) {
        // this.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

        $locationProvider.html5Mode(true);

        $stateProvider
            .state({
                name: 'home',
                url: '/',
                component: 'posts'
            })
            .state({
                name: 'login',
                url: '/login',
                component: 'login'
            });
    }

    angular.module('app', ['ui.router'])
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', config]);

}());
