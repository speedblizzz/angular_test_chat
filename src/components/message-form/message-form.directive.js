messageForm.$inject = ['currentUser','MessageService'];
export default function messageForm(currentUser,MessageService) {
    return {
        restrict: "E",
        replace: true,
        template: '<div class="message-form">'+
        '<form ng-submit="sendMessage()" class="container">'+
          '<div class="row">'+
            '<div class="input-field col s10">'+
              '<input ng-model="messageContent" type="text" placeholder="Type your message" >'+
            '</div>'+
            '<div class="input-field col s2">'+
              '<button type="submit" class="waves-effect waves-light btn-floating btn-large">Send'+
              '</button>'+
            '</div>'+
          '</div>'+
         '</form>'+
       '</div>',
        scope: {},
        controller: function($scope, currentUser, MessageService) {

            $scope.uuid = currentUser;
            $scope.messageContent = '';

            $scope.sendMessage = function() {
                MessageService.sendMessage($scope.messageContent);
                $scope.messageContent = '';
            }
        }
    };
}