import React from "react";
import ReactDOM from "react-dom";

import Wheel from "./Wheel/wheel";

export default class SpinningWheel extends React.Component {
  constructor() {
    super();
    this.places = [
      "001 Day",
      "050 Days",
      "010 Days",
      "365 Days",
      "182 Days",
      "000 Days",
    ];
  }

  render() {
    console.log(this.places);
    return (
      <div className="App">
        <h2 style={{ textAlign: "center", margin: "100px 0" }}>
          Spin the wheel and If you get lucky, your warranty gets extended!
        </h2>
        <Wheel items={this.places} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<SpinningWheel />, rootElement);
