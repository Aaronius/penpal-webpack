import { WindowMessenger, connect } from 'penpal';
import {ChildMethods} from "./types/Methods";

type ParentMethods = {
  add: (num1: number, num2: number) => number
}

const messenger = new WindowMessenger({
  remoteWindow: window.parent,
});

const methods: ChildMethods = {
  multiply(num1: number, num2: number) {
    return num1 * num2;
  },
  divide(num1: number, num2: number) {
    // Return a promise if asynchronous processing is needed.
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(num1 / num2);
      }, 1000);
    });
  },
}

const connection = connect<ParentMethods>({
  messenger,
  // Methods the iframe window is exposing to the parent window.
  methods,
});

const remote = await connection.promise;
// Calling a remote method will always return a promise.
const additionResult = await remote.add(2, 6);
console.log(additionResult); // 8