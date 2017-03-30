(function() {
    'use strict'

    angular.module('app')
        .component('posts', {
            controller: controller,
            templateUrl: 'posts.html'
        })
        .component('login', {
            controller: loginController,
            templateUrl: 'login.html'
        });

    controller.$inject = ['$http'];

    function loginController() {

    }

    function controller($http) {

        const vm = this;
        vm.postFormToggle = true;
        vm.filter = '';
        vm.sortBy = '-vote_count';

        vm.$onInit = function() {
            vm.getPosts();
        };

        vm.getPosts = function getPosts() {
            $http.get('/api/posts').then((response) => {
                vm.posts = response.data;
            });
        };

        vm.addPost = function addPost() {
            vm.post.created_at = Date.now();
            vm.post.vote_count = 0;
            $http.post('/api/posts', vm.post).then(function(response) {
                vm.getPosts();
                delete vm.post
                vm.postFormToggle = true;
            });
        }

        vm.upVote = function upVote(e, post) {
            e.preventDefault();
            $http.post(`/api/posts/${post.id}/votes`).then(function(response) {
                vm.getPosts();
            });
        }

        vm.downVote = function downVote(e, post) {
            e.preventDefault();
            if (post.vote_count > 0) {
                $http.delete(`/api/posts/${post.id}/votes`).then(function(response) {
                    vm.getPosts();
                });
            }
        }

        vm.addComment = function addComment(e, post) {
            $http.post(`/api/posts/${post.id}/comments`, {'content': post.comment}).then((response) => {
                vm.getPosts();
            })
        }
    };

}());
