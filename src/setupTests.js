// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
// This was added because some tests were failing after adding the react-embed-gist package. The app worked, and some tests that
// used the page the gist is on worked. But others failed. So, this fixes it. Fix from:
// https://stackoverflow.com/a/57439821/4704303
import 'regenerator-runtime/runtime';
