import React, { Component } from 'react';
import './App.css';
import images from './helper/images'
import Detect from './hocs/Detect';

class App extends Component {
  renderImage() {
    return (
      <div className='image-list'>
        {images.map(data => <img src={data.image} alt='random' key={data.id} className="image" />)}
      </div>
    )
  }
  render() {
    return (
      <div className="App">
        <p className="page-title">Handle Disconnect Internet</p>
        {this.renderImage()}
      </div>
    );
  }
}

export default Detect(App);