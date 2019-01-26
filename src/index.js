import angular  from 'angular';
import uirouter from 'angular-ui-router';

import 'lodash';

//Services

import currentUser from './services/current_user.service';
import MessageService from './services/message-factory';

//Components

import messageForm from './components/message-form/message-form.directive';
/* import messageItem from './components/message-list/message-list.directive';
import messageList from './components/message-item/message-item.directive'; */

/* import routing from './index.config'; */

angular.module('app', []).
value('currentUser', currentUser()).
//TODO  
/* value('friendsList', friendsList()). */
factory('MessageService',MessageService).
directive('messageForm',messageForm);

