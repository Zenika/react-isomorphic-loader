import React, { Component } from 'react'
import { spy } from 'chai'
import { mount } from 'enzyme'
import ReactDOMServer from 'react-dom/server'

import IsomorphicLoader from './index'

/* eslint-env mocha */
/* eslint-disable
  no-unused-expressions,
  react/jsx-filename-extension,
  import/no-extraneous-dependencies,
  react/prefer-stateless-function,
  max-len
*/

class Child extends Component {
  render() {
    return (<div />)
  }
}

const initSpies = () => {
  spy.on(IsomorphicLoader.prototype, 'componentDidMount')
  spy.on(IsomorphicLoader.prototype, 'render')
  spy.on(Child.prototype, 'render')
}

const render = (libraries, renderer, strict = true, callback) => renderer(
  <IsomorphicLoader libraries={libraries} strict={strict}>
    {(...args) => {
      if (callback && callback === '[object Function]') callback(args)
      return <Child />
    }}
  </IsomorphicLoader>
)

describe('IsomorphicLoader', () => {
  describe('Inputs', () => {
    it('should support one library as string', () => {
      render('react', mount, undefined, library => {
        library.should.be.equals(React)
      })
    })
    it('should support multiple libraries as array', () => {
      render(['react', 'react-dom/server'], mount, undefined, (library1, library2) => {
        library1.should.be.equals(React)
        library2.should.be.equals(ReactDOMServer)
      })
    })
  })
  describe('Serverside', () => {
    it('should not load the library and children aren\'t rendered', () => {
      initSpies()

      render('react', ReactDOMServer.renderToString)

      IsomorphicLoader.prototype.componentDidMount.should.not.have.been.called()
      IsomorphicLoader.prototype.render.should.have.been.called.once
      Child.prototype.render.should.not.have.been.called()
    })

    it('should not load the library and children are rendered', () => {
      initSpies()

      render('react', ReactDOMServer.renderToString, false, library => {
        library.should.be.equals(null)
      })

      IsomorphicLoader.prototype.componentDidMount.should.not.have.been.called()
      IsomorphicLoader.prototype.render.should.have.been.called.once
      Child.prototype.render.should.have.been.called.once
    })
  })
  describe('Browerside', () => {
    it('should load the library and render children when the library is loaded', () => {
      initSpies()

      render('react', mount, undefined, library => {
        library.should.be.equals(React)
      })

      IsomorphicLoader.prototype.componentDidMount.should.have.been.called.once
      IsomorphicLoader.prototype.render.should.have.been.called.twice
      Child.prototype.render.should.have.been.called.once
    })

    it('should load the library and render children before the library is loaded', () => {
      initSpies()

      render('react', mount, false, library => {
        library.should.be.equals(null)
      })

      IsomorphicLoader.prototype.componentDidMount.should.have.been.called.once
      IsomorphicLoader.prototype.render.should.have.been.called.twice
      Child.prototype.render.should.have.been.called.twice
    })
  })
})
