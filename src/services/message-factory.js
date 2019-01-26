MessageService.$inject = ['$rootScope', 'currentUser']

 export default function MessageService($rootScope, currentUser) {
        var self = this;
        self.messages = [];
        
        var getMessages = function() {

            if (_.isEmpty(self.messages))
              return;
        
            return self.messages;
        
          };
        var sendMessage = function(messageContent){

            
            if (_.isEmpty(messageContent))
                return;

            var newMessage = {
                user: currentUser,
                content: messageContent,
                date: Date.now()
            };
            
            self.messages.push(newMessage);
            console.log(newMessage);
        }

       return {
    getMessages: getMessages, 
    sendMessage: sendMessage,
  } 
}
