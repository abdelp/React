# About Queries

## Overview

**What are queries?**

Queries are the methods that Testing Library gives you to find elements on the page.

**What are the difference between the different queries?**

The difference between them is whether the query will throw an error if no element is found or if it will return a Promise and retry.

**What you can do after selecting an element?**

After selecting an element, you can use:
* [Events API]() or [user-event] to fire events and simulate user interactions with the page.
* [jest-dom] to make assertions about the element.

**As elements appear and disappear in response to actions, what can be used?**

As elements appear and disappear in responses to actions, [Async APIs]() like [waitFor]() or [findBy queries]() can be used to await the changes in the DOM.

**What can you use to find elements that are children of a specific element?**

To find only elements that are children of a specific element, you can use [within]().

## Example

```js
import { render, screen } from '@testing-library/react';

test('should show login form', () => {
  render(<Login />);
  const input = screen.getByLabelText('Username');
  // Events and assertions...
})
```