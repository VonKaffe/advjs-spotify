class EventManager {
    subscribers = {};

    addSubscriber(event, subscriber) {
        !this.subscribers[event] && (this.subscribers[event] = []);

        this.subscribers[event].push(subscriber);
    }

    notify(event, data) {
        const subscribers = this.subscribers[event];
        if (subscribers) {
            subscribers.forEach(subscriber => subscriber(data))
        }
    }
}

export default new EventManager();
