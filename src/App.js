/* Import statements */
import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from './Home';
import Category from './Category';
import Products from './Products';
import logo from './logo.svg';
import './App.css';

// const REQUEST_QUERY = gql`
//   {
//     products(first: 5){
//       edges {
//         node {
//           id
//           name
//           description
//           category {
//             name
//           }
//           price {
//             amount
//           }
//         }
//       }
//     }
//   }
// `;

const REQUEST_QUERY = gql`
  fragment User on User {
    id
    email
    firstName
    lastName
    isStaff
    note
    permissions { code name __typename }
    avatar { url __typename }
    __typename
  }
  mutation TokenAuth($email: String!, $password: String!) {
    tokenCreate(email: $email, password: $password) {
      token
      errors { field message __typename }
      user { ...User __typename }
      __typename
    }
  }
`;

async function refreshPage(token) {
  await  localStorage.setItem('access_token', token);
  window.location.reload();
}

// function RequestQuery() {
//   const { loading, error, data } = useQuery(REQUEST_QUERY);

//   console.log({ data: data });

//   if (loading) return (<p>Loading...</p>);

//   if (error) return (<p>Error :</p>);

//   return (<ul className="App-list">
//     { data.products.edges.map(({ node }) => (
//       <li key={node.id}><strong>{node.name} :</strong> {node.description}</li>
//     )) }
//   </ul>);
// }

function RequestQuery() {
  let email;
  let password;
  const [tokenCreate, { data }] = useMutation(REQUEST_QUERY);

  console.log({ data: data });

  if (data !== undefined && data.tokenCreate.token !== null) {
    refreshPage(data.tokenCreate.token);
  }

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();

          console.log({ email: email.value, password: password.value });

          tokenCreate({ variables: { email: email.value, password: password.value } });

          email.value = '';
          password.value = '';
        }}
      >
        <div className="form-group">
          <input
            ref={node => {
              email = node;
            }}
            type="text"
            placeholder="Email"
            className="form-control"
            name="Email"
          />
        </div>
        <div className="form-group">
          <input
            ref={node => {
              password = node;
            }}
            type="password"
            placeholder="Password"
            className="form-control"
            name="Password"
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  );
}

/* App component */
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: null,
    };

    this.home = 'Home';
    this.category = 'Category';
    this.products = 'Products';
  }

  render() {
    return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />

        <nav className="App-header">
          <ul>

            <li onClick={() => this.setState({title: this.home})}><Link to="/">Home</Link></li>
            <li onClick={() => this.setState({title: this.category})}><Link to="/category">Category</Link></li>
            <li onClick={() => this.setState({title: this.products})}><Link to="/products">Products</Link></li>

          </ul>
        </nav>

        <Switch>
          <Route exact={true} path="/" render={({match}) => (<Home title={this.state.title || this.home} />)}/>
          <Route path="/category" render={({match}) => (<Category title={this.state.title || this.category} />)}/>
          <Route path="/products" render={({match}) => (<Products title={this.state.title || this.products} />)}/>
          <Route path="/*" component={() => 'NOT FOUND'}/>
        </Switch>

        <RequestQuery />

      </div>
    )
  }
}

export default App;
