# React Hooks playground

In October 2018, at React Conf, the React team showed off their proposal for a future vision of React, [called "Hooks"](https://reactjs.org/docs/hooks-intro.html).

---

### Impressions on Hooks

This is sort of a _stream of consciousness_ record of what I thought of using Hooks while coding with them in this playground repository.

> It's like a blog post, but without the obligation to blog!

#### Stream

Someone followed Dan's [presentation](https://www.youtube.com/watch?v=dpw9EHDh2bM), and made [something like Dan's demo](https://github.com/broerjuang/excerpt-react-conf).

`useState` is very simple, it makes sense.

I love that usgae of array destructuring. It's like SML tuples.

I get the idea of "custom hooks" but in practice, because they're so freeform (e.g. just another function), it's hard to see them as a "custom hook". I have a hook that gives an object of value and onChange for easy form element mutations, so that's cool. But it will never be that simple in real life.

Found a gotcha: React Devtools apparently don't work with this new pattern yet. For example, I wanted to see how my AppState component was doing - nope! Not only was no state available, it gives back an error from the React Devtools internals.

> backend.js:9159 Uncaught TypeError: Cannot read property 'displayName' of null

No public outcry either?

I wonder how the devtools will eventually display component state. Without a user given marker (since the tuple approach is used), how will it work?

I added an AppContext earlier, but I am having trouble using it the way I was able to previously (which may have been a hack). It was my typo - I imported `useContext` but forgot to use it.

Back on task, I made a cool `setValue` function. It's a double arrow, first arg curries a `setX` function from `useState` and then the second function will apply `setX` to the usual event target value.

After all of the refactoring, after I knew I was making a sign in form and a guarded content section, it went by pretty quick.

For the most part, using hooks didn't help me with much. Class syntax overhead aside, it's kind of annoying to use `x` and `setX` - having to define that second function yourself is annoying.

The application for context enhancements though! That's the winner for me. Using context without this abstraction hurts in comparison, especially when nested. It was great using the local variables in my AppState component that are by default bound to the right scope (vs the usual requirement of rebinding handlers to the class `this`).

I didn't have a use for `useEffect` yet.

I removed the "custom hook" from the end result. I'd have to think about a more specific use case in the future to make something "reusable" like that.

> Side note: Last winter, I experimented with a react-y validation helper. Mixins were long gone at that point, but I explored the idea of "extending" a component dynamically so that it could have these projection-style dervied values based on whitelisted state values. Then I found [Formik](https://github.com/jaredpalmer/formik) which is what I wanted all along. I bring this up here, because I wanted that code to be reusable across components, without having too many layers (HOCs, render props, etc). Using hooks in this way could get pretty close to that.

### The End

Thanks for reading. This Sunday morning was fun!
