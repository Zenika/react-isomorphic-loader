import { Component, PropTypes } from 'react'

const getTypeOf = (something) => {
  const getType = {}
  return something && getType.toString.call(something)
}

const is = typeString => varToCheck => {
  const type = getTypeOf(varToCheck)
  return type && type === typeString
}

const isString = is('[object String]')

const isArray = is('[object Array]')

class IsomorphicLoader extends Component {

  static propTypes = {
    strict: PropTypes.bool,
    libraries: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]).isRequired,
    children: PropTypes.func.isRequired,
  }

  state = {
    libraries: null,
  }

  componentDidMount() {
    const { libraries } = this.props

    if (isString(libraries)) {
      // eslint-disable-next-line global-require, react/no-did-mount-set-state
      this.setState({ libraries: [require(libraries)] })
    }

    if (isArray(libraries)) {
      // eslint-disable-next-line global-require, react/no-did-mount-set-state
      this.setState({ libraries: libraries.map(l => require(l)) })
    }
  }

  render() {
    const { children, strict = true } = this.props
    const { libraries } = this.state

    if (strict) {
      return libraries && children(...libraries)
    }
    return libraries ? children(...libraries) : children()
  }

}

export default IsomorphicLoader
