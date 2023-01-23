# Why Redux Toolkit is How To Use Redux Today

**What automatically set up with `configureStore`?**

* The slice reducers are automatically added
* Dev-mode middleware was added to catch accidental mutations
* The Redux DevTools Extension was automatically set up
* The middleware and DevTools enhancers were composed together and added to the store

Other APIs for common Redux tasks:

* `createAsyncThunk`: abstracts the standard "dispatch actions before/after an async request" pattern
* `createEntityAdapter`: prebuilt reducers and selectors for CRUD operations on normalized state
* `createSelector`: a re-export of the standard Reselect API for memoized selectors
* `createListenerMiddleware`: a side effects middleware for running logic in response to dispatched actions

