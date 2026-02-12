declare module 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js' {
  export const initializeApp: (...args: any[]) => any;
}

declare module 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js' {
  export const getDatabase: (...args: any[]) => any;
  export const ref: (...args: any[]) => any;
  export const set: (...args: any[]) => any;
  export const get: (...args: any[]) => any;
  export const update: (...args: any[]) => any;
  export const remove: (...args: any[]) => any;
  export const onValue: (...args: any[]) => any;
  export const off: (...args: any[]) => any;
}
