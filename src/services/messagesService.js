MessageServiceFactory.$inject = ['$http'];
import messagesData from '../data/messages.json';
 
export default function MessageServiceFactory($http) {
        var self = this;
        self.messages = messagesData.messages;
        self.activeMessages = [];
        //self.user = serverData.user;
        
        var getMessages = function(activeChatId) {

            return self.messages.filter(message => message.chatId == activeChatId)
        
          };
        var sendMessage = function(messageContent,activeChatId, user){
            
            if (!messageContent || messageContent === "") {
            
                return;
            }

            var newMessage = {
                chatId: activeChatId,
                senderId: user.id,
                user: user.name,
                content: messageContent,
                date: Date.now().toString(),
                status: "sended"
            };
            
            self.messages.push(newMessage);
            
        }

       return {
    getMessages: getMessages, 
    sendMessage: sendMessage,
  } 
}
