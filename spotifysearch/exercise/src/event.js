// ...
// TODO: 
//
// Create a class called EventManager with the following methods:
//

class EventManager {
    subscribers = {};
addSubscriber(event, subscriber )  {
!this.subscribers[event] && (this.subscriber[event] = [];
this.subscribers[event].push(subscriber);

}
notify(event,data) {
 const subscribers = this.subscribers[event];
 if (subscribers) {
     subscribers.forEach(subscriber => subscriber(data))

 }



}
}
export default new EventManager();
     // addSubscriber(event, subscriber) {
//  !this.subscribers[event] && (this.subscribers[event] = []);
//  this.subscribers[event].push(subscriber);
// }
//
// notify(event, data) {
//  const subscribers = this.subscribers[event];
//  if (subscribers) {
//   subscribers.forEach(subscriber => subscriber(data))
//  }
// }
//
// (Don't forget any class properties if they are needed!)
//
// Export an instance of this class.