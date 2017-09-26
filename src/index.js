import Inferno from 'inferno';
import Component from 'inferno-component';

class MyComponent extends Component {
  render() {
    return <div>
      123
    </div>
  }
}

Inferno.render(
  <MyComponent />,
  document.getElementById("main")
);
