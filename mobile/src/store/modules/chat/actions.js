
import moment from 'moment'

import ApiUtils from '@utils/ApiUtils'
import CONSTS from '@utils/Consts';
export const FETCH_CHAT = "FETCH_CHAT"
export const FETCH_CHAT_SUCCESS = "FETCH_CHAT_SUCCESS"
export const FETCH_CHAT_FAILURE = "FETCH_CHAT_FAILURE"

export const ADD_MESSAGE = "ADD_MESSAGE"
export const ADD_MESSAGE_SUCCESS = "ADD_MESSAGE_SUCCESS"
export const ADD_MESSAGE_FAILURE = "ADD_MESSAGE_FAILURE"

export const FETCH_CHAT_MESSAGES = "FETCH_CHAT_MESSAGES"
export const FETCH_CHAT_MESSAGES_SUCCESS = "FETCH_CHAT_MESSAGES_SUCCESS"
export const FETCH_CHAT_MESSAGES_FAILURE = "FETCH_CHAT_MESSAGES_FAILURE"

export const READ_MESSAGES_SUCCESS = 'READ_MESSAGES_SUCCESS'
export const READ_MESSAGES_FAIL = 'READ_MESSAGES_FAIL'

export const CHAT_RESET_STATE = `CHAT_RESET_STATE`;


export function chatResetState() {
  return {type: CHAT_RESET_STATE, receivedAt: Date.now()};
}

export function requestChat() {
  return { type: FETCH_CHAT }
}

export function receiveChatSuccess(sessions){
  return { type: FETCH_CHAT_SUCCESS, sessions, receivedAt: Date.now()}
}

export function receiveChatFail(error){
  return { type: FETCH_CHAT_FAILURE, error, receivedAt: Date.now()}
}

export function addMessage() {
  return { type: ADD_MESSAGE }
}

export function addMessageSuccess(message){
  return { type: ADD_MESSAGE_SUCCESS, message, receivedAt: Date.now()}
}

export function addMessageFail(error){
  return { type: ADD_MESSAGE_FAILURE, error, receivedAt: Date.now()}
}

export function requestChatMessages() {
  return { type: FETCH_CHAT_MESSAGES }
}

export function requestChatMessagesSuccess(sessionId, messages){
  return { type: FETCH_CHAT_MESSAGES_SUCCESS,sessionId, messages, receivedAt: Date.now()}
}

export function requestChatMessagesFail(error){
  return { type: FETCH_CHAT_MESSAGES_FAILURE, error, receivedAt: Date.now()}
}

export function readMessagesSuccess(sessionId, messages){
  return { type: READ_MESSAGES_SUCCESS, receivedAt: Date.now()}
}

export function readMessagesFail(error){
  return { type: READ_MESSAGES_FAIL, error, receivedAt: Date.now()}
}


export function fetchChats() {
  return function(dispatch) {
    dispatch(requestChat())

    var string = 'chat/sessions'
    return ApiUtils.get(string)
    .then(([response, jsonBody]) => {
      if (response.status == 200) {

        jsonBody.map(function(session){
          dispatch(fetchChatMessages(session.sessionId))
        })
        dispatch(receiveChatSuccess(jsonBody))
      } else {
        dispatch(receiveChatFail(jsonBody.message))
      }
    }).catch(err => {
      console.log('Error: ', err);
    })
  }
}

export function fetchChatMessages(sessionId){
  return function(dispatch) {
    dispatch(requestChatMessages())

    var string = 'chat/messages/'+ sessionId
    return ApiUtils.get(string)
    .then(([response, jsonBody]) => {
      if (response.status == 200) {

        var chatMessages = jsonBody.map(function(chatObj) {
          var url = chatObj.user.avatar.url
          var chatId = chatObj.id
          chatObj._id = chatId;
          chatObj.user.avatar = url
          chatObj.user._id = chatObj.user.id

           return chatObj
        });
        dispatch(requestChatMessagesSuccess(sessionId,jsonBody))
      } else {
        dispatch(requestChatMessagesFail(jsonBody.message))
      }
      // dispatch(loggedIn())
    }).catch(err => {
      console.log('Error: ', err);
    })
  }
}

export function sendReadMessages(sessionId) {

  return function(dispatch) {
    console.log('Session ID is: ' + sessionId)
    var string = 'chat/mark-messages/' + sessionId
    return ApiUtils.patch(string)
    .then(([response, jsonBody]) => {
      if (response.status == 200) {
        dispatch(readMessagesSuccess())
      } else {
        dispatch(readMessagesFail(jsonBody.message))
      }
      // dispatch(loggedIn())
    }).catch(err => {
      console.log('Error: ', err);
    })
  }
}

export function sendMessage(message) {
  return function(dispatch) {
    dispatch(addMessage())

    var string = 'chat/add-message/' + message.sessionId
    return ApiUtils.post(string,{text: message.message})
    .then(([response, jsonBody]) => {
      if (response.status == 200) {

          var url = jsonBody.user.avatar.url
          var chatId = jsonBody.id
          jsonBody._id = chatId;
          jsonBody.user.avatar = url
          jsonBody.user._id = jsonBody.user.id



        dispatch(addMessageSuccess(jsonBody))
      } else {
        dispatch(addMessageFail(jsonBody.message))
      }
      // dispatch(loggedIn())
    }).catch(err => {
      console.log('Error: ', err);
    })
  }
}
