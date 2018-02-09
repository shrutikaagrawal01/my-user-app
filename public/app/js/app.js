var app = angular.module('meanDemoApp', ['ngRoute', 'controllers', 'services', 'directives']);
app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/', {
                title: 'Users',
                templateUrl: '/partials/users.html',
                controller: 'listCtrl'
            })
            .when('/edit-user/:userId', {
                title: 'Edit User',
                templateUrl: '/partials/edit-user.html',
                controller: 'editCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
]);
