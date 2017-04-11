# react-isomorphic-loader

**react-isomorphic-loader**'s purpose is to load frontend libraries only in browser for react isomorphic apps

This is a [higher order component](https://facebook.github.io/react/docs/higher-order-components.html) ("HOC"). It's an advanced pattern used in React that lets you reuse code logic, it can be summarized as a component factory. It improves isolation, interoperability and maintainability of your code base. 

## Installation

```bash
npm i --save react-isomorphic-loader
```

## Properties

Parameter | Type | Required | Default value | Description
----------|------|----------|---------------|-------------
`libraries` | string&#124;string[] | yes | undefined | It represents a path or a list of paths to frontend libraries.  
`strict` | bool | no | `true` | If `false` children are rendered even if libraries aren't loaded. `true`children are rendered only if libraries are loaded

## Usage

### For one library

```jsx
<IsomorphicLoader libraries="path/to/some/library/that/need/browser/globals">
  {(myLibraryThatNeedBrowserGlobals) => (<Child />)}
</IsomorphicLoader>
```

### For multiple library

```jsx
<IsomorphicLoader libraries={[
    "path/to/a/library/that/need/browser/globals",
    "path/to/another/library/that/need/browser/globals",
  ]}
>
  {(theFirstLibrary, theSecondLibrary) => (<Child />)}
</IsomorphicLoader>
```
