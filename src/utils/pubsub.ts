export default {}

// interface Event {
//   [key: string]: Function[]
// }

// export default class Pubsub {
//   events: Event = {};

//   // constructor() {
//   //   this.events = {};
//   // }

//   // 订阅事件
//   on(type: string, callback: Function) {
//     const events = this.events;
//     if (events[type]) {
//       if (!events[type].includes(callback)) {
//         events[type].push(callback);
//       }
//     } else {
//       events[type] = [callback];
//     }
//   }

//   // 触发事件
//   emit(type: string, ...arg) {
//     const callbacks = this.events[type] || [];
//     callbacks.forEach((cb) => {
//       cb(arg);
//     });
//   }

//   // 根据 type 和 callback 移除对应的订阅
//   remove(type: string, callback: Function) {
//     const events = this.events[type];
//     if (events) {
//       const index = events.indexOf(callback);
//       if (index !== -1) events.splice(index, 1);
//     }
//   }

//   // 根据 type 移除所有的订阅
//   clear(type: string) {
//     if (this.events[type]) {
//       delete this.events[type];
//     }
//   }

//   // 结合单例模式，可以实例化全局唯一的发布订阅
//   // static getInstance() {
//   //   if (!this.instance) {
//   //     this.instance = new Pubsub();
//   //   }
//   //   return this.instance;
//   // }
// }