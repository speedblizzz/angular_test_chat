import angular  from 'angular';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css';
import userIcon from './images/user_avatar.png';
import friendIcon from './images/avatar3.png';


import friendsData from './data/friends.json'; 

import messagesService from './services/messagesService';

import 'angular-ui-bootstrap';
import 'angular-animate';
import 'angular-sanitize';

import 'simplebar';
import 'simplebar/dist/simplebar.css';




angular.
module('chatApp', ['ui.bootstrap','ngSanitize','ngAnimate']).
directive('scroll',['$timeout', function($timeout) {
  return {
    restrict: 'A',
    link: function(scope, element, attr) {
      scope.$watchCollection(attr.scroll, function(newVal) {
        $timeout(function() {
          var messagesCounter = scope.$parent.currentMessagesList.length;
          element[0].SimpleBar.getScrollElement().scrollTop = element[0].scrollHeight*messagesCounter;
        });
      });
    }
  }
}]).
factory('MessagesService',messagesService).
controller('chatCtrl', ['$scope','$http','$uibModal','$document','MessagesService', function($scope, $http, $uibModal, $document, MessagesService){

    $scope.friends = friendsData.friends;

    $http({method: 'GET', url: '/data/user.json'}).then(function(resp) {
      $scope.user = resp.data;
      $scope.user.iconUrl = userIcon;
    });


    

    $scope.friends.map((friend, index) => {
        friend.iconUrl = friendIcon
    });

    $scope.searchFriendName = '';
    $scope.isChatActive = false;
    $scope.activeChatId = ''

    $scope.setChat = function(chatId){
        if(!chatId || $scope.activeChatId == chatId)
            return;

        $scope.activeChatId = chatId;
        $scope.isChatActive = true;
        
        $scope.currentChatUser = $scope.friends.find(friend => friend.chatId == chatId);
        $scope.currentMessagesList = MessagesService.getMessages(chatId);
        
        $scope.messageContent.value = '';
        
       
    }
    $scope.messageContent = {value:''};
    $scope.sendMessage = function(){
      MessagesService.sendMessage( $scope.messageContent.value, $scope.activeChatId, $scope.user );
      $scope.currentMessagesList = MessagesService.getMessages($scope.activeChatId);
      $scope.messageContent.value = '';
    }

    $scope.openUserModal = function (size, parentSelector, userId) {
        var parentElem = parentSelector ? 
          angular.element($document[0].querySelector(parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
          animation: false,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'modalContent.html',
          controller: 'ModalInstanceCtrl',
          controllerAs: '$ctrl',
          size: size,
          appendTo: parentElem,
          resolve: {
            user: function () {
              if($scope.user.id == userId)
                return $scope.user;
               
              return $scope.friends.find((friend) => friend.userId == userId); 
            }
          }
        });
    
      };
    

}]).
controller('ModalInstanceCtrl',['$uibModalInstance','user', function ($uibModalInstance, user) {
    var $ctrl = this;
    $ctrl.user = user;
      
    $ctrl.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
}]);



