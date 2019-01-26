routing.$inject = ['$urlRouterProvider'];

export default function routing($urlRouterProvider) {
  
  $urlRouterProvider.otherwise('/');
  /* var chatPage = {
    url: '/',
    templateUrl: '../views/chat.html'
  }

  
  $stateProvider.state('chat',chatPage); */
  
}
