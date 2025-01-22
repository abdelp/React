# Parcels

**What is it recommended to be used as the primary type of microfrontend in your architecture?**

It's recommended that you use applications as the primary type of microfrontend in your architecture.

**What is a single-spa parcel?**

A single-spa parcel is a framework agnostic component. It is a chunk of functionality meant to be mounted manually by an application, without having to worry about which framework was used to implement the parcel or application.

**What's the difference between a parcel and a registered application?**

Parcels use similar methodology as registered applications but are mounted by a manual function call rather than the activity function.

**How big can a parcel be?**

A parcel can be as large as an application or as small as a component and written in any language as long as it exports the correct lifecycle events.

**How is it typically recommended you mount a parcel?**

Typically we recommend you mount a parcel within the context of an application because the parcel will be unmounted with the application.

**What is it recommended to use if you are only using one framework?**

If you are only using one framework, it is recommended to prefer framework components (i.e, React, Vue, and Angular components) over single-spa parcels.

**Why is it recommended to use framework components over single-spa parcels?**

This is because framework components interop easier with each other than when there is an intermediate layer of single-spa parcels.

## Quick Example

```js
// The parcel implementation
const parcelConfig = {
  // optional
  bootstrap(props) {
    // one time initialization
    return Promise.resolve();
  },
  // required
  mount(props) {
    // use a framework to create dom nodes and mount the parcel
    return Promise.resolve();
  },
  // required
  unmount(props) {
    // use a framework to unmount dom nodes and perform other cleanup
    return Promise.resolve();
  },
  // optional
  update(props) {
    // use a framework to update dom nodes
    return Promise.resolve()
  },
};
```

```js
// How to mount the parcel
const domElement = document.getElementById("place-in-dom-to-mount-parcel");
const parcelProps = { domElement, customProp1: "foo" };
const parcel = singleSpa.mountRootParcel(parcelConfig, parcelProps);

// The parcel is being mounted. We can wait for it to finish with the mountPromise.
parcel.mountPromise
  .then(() => {
    console.log("finished mounting parcel");
    // If we want to re-render the parcel, we can call the update lifecycle method, which returns a promise
    parcelProps.customProp1 = "bar";
    return parcel.update(parcelProps);
  })
  .then(() => {
    // Call the unmount lifecycle when we need the parcel to unmount. This function also returns a promise
    return parcel.unmount();
  });
```

**What do you need to do to use the parcel you just created?**

To use the parcel you just created all you need to do is use the `Parcel` component provided in [single-spa-react]()

```js
// mycomponent.js
import Parcel from 'single-spa-react/parcel'
import { MyParcel } from './myparcel.js'

export class myComponent extends React.Component {
  render () {
    return (
      <Parcel
        config={MyParcel}
      />
    )
  }
}
```

## Parcel Lifecycles

### Bootstrap

**When will the bootstrap lifecycle will be called?**

This lifecycle function will be called once, right before the parcel is mounted for the first time.

### Mount

**When will the parcel be mounted?**

If the parcel is not mounted this lifecycle function is called when ever `mountParcel` is called.

**What should this function do when called?**

When called, this function should create DOM elements, DOM event listeners, etc. to render content to the user.

### Unmount

**When will this lifecycle function be called?**

This lifecycle function will be called whenever the parcel is mounted and one of the following cases is true:

* `unmount()` is called
* The parent parcel or application is unmounted

**What should this lifecycle do when called?**

When called, this function should clean up all DOM elements, DOM event listeners, leaked memory, globals, observable, suscriptions, etc. that were created at any point when the parcel was mounted.

### Update (optional)

**When will the update lifecycle be called?**

The update lifecycle function will be called whenever the user of the parcel calls `parcel.update()`.

**Does the user of a parcel need to check whether the parcel has implemented the update lifecycle before attempting to make the call?**

- [x] Yes
- [ ] No

## Example use cases

### Modals

### `mountRootParcel` vs `mountParcel`

// TODO

### Which should I use?

In general we suggest using the application-aware `mountParcel` API.

**What does `mountParcel` allow you?**

`mountParcel` allows you to treat the parcel just like a component inside your application without considering what framework it was written in and being forced to remember to call unmount.

### How do I get the `mountParcel` API?

In order to keep the function contextually bound to an application it is provided to the application as a [lifecycle prop]().

Example:
```js
// App1
let mountParcel
export const bootstrap = [
  (props) => {
    mountParcel = props.mountParcel
    return Promise.resolve()
  },
]
```
