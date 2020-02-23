// Post.js

import React, { Component } from 'react';

const styles = {
  borderBottom: '2px solid #eee',
  background: '#fafafa',
  margin: '.75rem auto',
  padding: '.6rem 1rem',
  maxWidth: '500px',
  borderRadius: '7px'
};

class Post extends Component {
  render() {
    const { title, body, id } = this.props.post;

    return (
      <div style={ styles }>
        <h2>{ title }</h2>
        <p>{ body }</p>
        <button className="btn btn-danger" type="button" onClick={() => this.props.onDelete(id)}>Remove</button>
      </div>
    );
  }
};

export default Post;
