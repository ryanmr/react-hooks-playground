# React Hooks playground

In October 2018, at React Conf, the React team showed off their proposal for a future vision of React, [called "Hooks"](https://reactjs.org/docs/hooks-intro.html).

I wanted to give it a try, and in more than just a Codesandbox, so I spun up this quick CRA project and changed its React dependencies to `16.7.0-alpha.0`.

---

### Impressions on Hooks

This is sort of a _stream of consciousness_ record of what I thought of using Hooks while coding with them in this playground repository.

#### Stream

Someone tried to follow Dan, and made [something like Dan's demo](https://github.com/broerjuang/excerpt-react-conf).

`useState` is very simple, it makes sense.

I love that usgae of array destructuring. It's like SML tuples.

I get the idea of "custom hooks" but in practice, because they're so freeform (e.g. just another function), it's hard to see them as a "custom hook". I have a hook that gives an object of value and onChange for easy form element mutations, so that's cool. But it will never be that simple in real life.

Found a gotcha: React Devtools apparently don't work with this new pattern yet. For example, I wanted to see how my AppState component was doing - nope! Not only was no state available, it gives back an error from the React Devtools internals.

> backend.js:9159 Uncaught TypeError: Cannot read property 'displayName' of null

No public outcry either?

I wonder how the devtools will eventually display component state. Without a user given marker (since the tuple approach is used), how will it work?

I added an AppContext earlier, but I am having trouble using it the way I was able to previously (which may have been a hack). It was my typo - I imported `useContext` but forgot to use it.

Back on task, I made a cool `setValue` function. It's a double arrow, first arg curries a `setX` function from `useState` and then the second function will apply `setX` to the usual event target value.
