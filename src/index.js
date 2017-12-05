import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';

const expressVar = express();

jsx.install();

expressVar.use('')
class App extends Component {
  constructor(){
    super();
    this.state = {
      data : '',
      authToken: '',
    };
    this.api=this.api.bind(this);
  }
  componentDidMount() {
    this.api()
  }
  api(){
    const authToken = this.state.authToken;
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const myURL= 'https://internal-tuner.pandora.com/services/json/?method=auth.partnerLogin';
     const temp = axios.create({
      'method' : 'post',
      'withCredentials' : true,
      'xsrfCookieName' : 'X-CsrfToken',
      'headers': {
        'Content-Type' : 'application/json',
        'X-CsrfToken' : 'd58986a9d20f83b4',
      },
      'data' : {
        "existingAuthToken": null,
        "keepLoggedIn": true,
        'password': 'asdfhole34',
        'username': 'lyssareba@gmail.com'  
      }
    });
    //console.log(temp.get(myURL));
    axios.get(myURL).then((res) => {
    // temp.post(myURL).then((res) => {
      let data = res;
      console.log(data);
    });

    // axios.post(proxy+baseURL, {
    //   "existingAuthToken": null,
    //   "keepLoggedIn": true,
    //   "password": "asdfhole34",
    //   "username": "lyssareba@gmail.com",
    //   "headers": {
    //     'Content-Type' : 'application/json',
    //     'X-CsrfToken' : 'd58986a9d20f83b4',
    //     'X-AuthToken' : '',
    //   },
    // })
    // .then((res)=> {
    //   let data = res;
    //   console.log(data);
    //   return;
    // });
    // const mainRequest = axios.create({
    //   baseURL: proxy + baseURL,
    //   method: 'post',
    //   withCredentials: true,
    //   data: {
    //     "existingAuthToken": null,
    //     "keepLoggedIn": true,
    //     "password": "asdfhole34",
    //     "username": "lyssareba@gmail.com"
    //   },
    //   headers: {
    //     'Content-Type' : 'application/json',
    //     'X-CsrfToken' : 'd58986a9d20f83b4',
    //     'X-AuthToken' : {authToken},
    //   },
    // });
    // mainRequest.post('/v1/auth/login')
    // .then((res) => {
    //   let data = res;
    //   //this.setState({ data : data });
    //   console.log(data);
    // });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
          <p>{this.state.data}</p>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
