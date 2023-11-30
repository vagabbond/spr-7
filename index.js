class Observer {
 update(event) {}
}

class Subject {
 constructor() {
  this.observers = [];
 }

 attach(observer) {
  this.observers.push(observer);
 }

 detach(observer) {
  const index = this.observers.indexOf(observer);
  if (index !== -1) {
   this.observers.splice(index, 1);
  }
 }

 notify(event) {
  this.observers.forEach((observer) => observer.update(event));
 }
}

class SocialMediaSubject extends Subject {
 postStatus(status) {
  console.log(`Posted status: ${status}`);
  this.notify({ type: "status", content: status });
 }

 addFriend(friend) {
  console.log(`Added friend: ${friend}`);
  this.notify({ type: "friend", content: friend });
 }
}

class UserObserver extends Observer {
 constructor(username) {
  super();
  this.username = username;
 }

 update(event) {
  if (event.type === "status") {
   console.log(`${this.username} received status update: ${event.content}`);
  } else if (event.type === "friend") {
   console.log(`${this.username} added a new friend: ${event.content}`);
  }
 }
}

const socialMediaSubject = new SocialMediaSubject();
const user1Observer = new UserObserver("User1");
const user2Observer = new UserObserver("User2");

socialMediaSubject.attach(user1Observer);
socialMediaSubject.attach(user2Observer);

socialMediaSubject.postStatus("Hello, everyone!");
socialMediaSubject.addFriend("User3");
