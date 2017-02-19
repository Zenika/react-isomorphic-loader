import { Component, PropTypes } from 'react'

class IsomorphicLoader extends Component {

  propTypes = {
    strict: PropTypes.bool,
    library: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
  }

  state = {
    library: null,
  }

  componentDidMount() {
    // eslint-disable-next-line global-require, react/no-did-mount-set-state
    this.setState({ library: require(this.props.library) })
  }

  render() {
    const { children, strict = true } = this.props
    const { library } = this.state

    if (strict) {
      return library && children(library)
    }
    return library ? children(library) : children()
  }

}

export default IsomorphicLoader
