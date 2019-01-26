import angular  from 'angular';

angular.module('app').directive('messageList', function($timeout, $anchorScroll, MessageService, ngNotify) {
    return {
        restrict: "E",
        replace: true,
        templateUrl: 'components/message-list/message-list.html',
        link: function(scope, element, attrs, ctrl) {
            var element = angular.element(element)
            var init = function() {
                
            };
            init();
        },
        controller: function($scope) {
            $scope.messages = MessageService.getMessages();
        }
    };
});