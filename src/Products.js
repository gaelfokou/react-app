/* Import statements */
import React, { Component } from 'react';
import './App.css';
import PostList from './containers/PostList';

const stylesApp = {
  marginTop: 40
}

/* App component */
class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: null,
    };
  }

  componentDidMount() {
    this.setState({title: this.props.title});
  }

  render() {
    return (
        <div className="container">
          <div className="row" style={ stylesApp }>
            <div className="col-md-12">
              <h2 className="App-title">{this.state.title}</h2>
            </div>
          </div>
          <div className="row" style={ stylesApp }>
            <div className="col-md-12">
              <p className="App-intro">To get started, edit <code>src/App.js</code> and save to reload.</p>
            </div>
          </div>
          <div className="row" style={ stylesApp }>
            <div className="col-md-12">
              <PostList />
            </div>
          </div>
        </div>
      )
  }
}

export default Products;
