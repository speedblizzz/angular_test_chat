import angular  from 'angular';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css';
import userIcon from './images/user_avatar.png';
import friendIcon from './images/avatar3.png';
import profileIcon from './images/profile-icon.png';


import serverData from './data/data.json';
//import uirouter from 'angular-ui-router';
import 'angular-ui-bootstrap';
import 'angular-animate';
import 'angular-sanitize';





angular.
module('chatApp', ['ui.bootstrap','ngSanitize','ngAnimate']).
controller('chatCtrl',function($scope,$uibModal, $log, $document){

    $scope.friends = serverData.friends;
    $scope.user = serverData.user;

    $scope.user.iconUrl = userIcon;
    $scope.profileIcon = profileIcon;

    $scope.friends.map((friend, index) => {
        friend.iconUrl = friendIcon
    });

    $scope.searchFriendName = '';
    $scope.isChatActive = false;
    $scope.activeChatId = ''

    $scope.messages = serverData.messages;
    $scope.messageContent = '';

    $scope.showUserProfile = function() {
        console.log('show user profile');
    }
    $scope.showUserIcon = function(){
        console.log('show user icon');
    }
    $scope.setChatId = function(chatId){
        if(!chatId)
            return;

        $scope.activeChatId = chatId;
        $scope.isChatActive = true;
        $scope.friends.map(function(friend){
            if(friend.chatId == chatId) {
                $scope.activeUser = friend;
            }
        });
    }

    $scope.sendMessage = function(){

        console.log($scope.messageContent);
        if ($scope.messageContent.length == 0 || $scope.messageContent === "")
            return;
        var newMessage = {
            chatId: $scope.activeChatId,
            senderId: $scope.user.id,
            user: $scope.user.name,
            content: $scope.messageContent,
            date: Date.now()
        };
        
        $scope.messages.push(newMessage);
        $scope.messageContent = '';
    }

    $scope.openModal = function (size, parentSelector) {
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
            items: function () {
              /* return $ctrl.items; */
            }
          }
        });
    
        modalInstance.result.then(function (selectedItem) {
         /*  $ctrl.selected = selectedItem; */
        }, function () {
          /* $log.info('Modal dismissed at: ' + new Date()); */
        });
      };
    

}).
controller('ModalInstanceCtrl', function ($uibModalInstance, items) {
    var $ctrl = this;
    /* $ctrl.items = items;
    $ctrl.selected = {
      item: $ctrl.items[0]
    }; */
  
    $ctrl.ok = function () {
      $uibModalInstance.close($ctrl.selected.item);
    };
  
    $ctrl.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });;



