// NewPost.js

import React, { Component } from 'react';

class NewPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      errors: {
        title: '',
        body: '',
      }
    };
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    let errors = this.state.errors;

    switch (name) {
      case 'title': 
        errors.title = 
          value.length < 5
            ? 'Title must be 5 characters long!'
            : '';
        break;
      case 'body': 
        errors.body = 
          value.length < 5
            ? 'Body must be 5 characters long!'
            : '';
        break;
      default:
        break;
    };
  
    this.setState({errors, [name]: value}, ()=> {
        console.log(errors)
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.title.trim() && this.state.body.trim()) {
      this.props.onAddPost(this.state);
      console.log(this.state);
      this.handleReset();
    }
  }

  handleReset = () => {
    this.setState({
      title: '',
      body: '',
      errors: {
        title: '',
        body: '',
      }
    });
  }

  render() {
    return (
      <div>
          <form onSubmit={ this.handleSubmit }>
          <div className="form-group">
            <input
              type="text"
              placeholder="Title"
              className="form-control"
              name="title"
              onChange={ this.handleInputChange }
              value={ this.state.title }
            />
          </div>
          <div className="form-group">
            <textarea
              cols="19"
              rows="8"
              placeholder="Body"
              className="form-control"
              name="body"
              onChange={ this.handleInputChange }
              value={ this.state.body }>
            </textarea>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Add Post</button>
            <button type="button" className="btn btn-warning" onClick={ this.handleReset }>Reset</button>
          </div>
        </form>
      </div>
    );
  }
}

export default NewPost;
