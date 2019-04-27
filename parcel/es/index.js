import React from 'react';
import ReactDOM from 'react-dom';
import App from './app'

class AppContainer extends React.Component {
  state = {
    name: 'parcel 打包案例',
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        name: 'parcel 打包包'
      });
    }, 2000);
  }

  render() {
    return (
      <App name={this.state.name} />
    )
  }
}

ReactDOM.render(<AppContainer />, document.getElementById('app'));
