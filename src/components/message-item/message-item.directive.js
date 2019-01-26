import angular  from 'angular';

angular.module('app').directive('messageItem', function(MessageService) {
    return {
        restrict: "E",
        templateUrl: 'components/message-form/message-item.html',
        scope: {
            senderUuid: "@",
            content: "@",
            date: "@"
        }
    }
});