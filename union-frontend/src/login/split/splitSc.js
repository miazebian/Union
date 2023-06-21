import React, { Component } from "react";

import "./splitScreen.css";


class splitSc extends Component {
  render() {
    const { leftPane, rightPane} = this.props;

    return (
        
      <div>
        <div className="split left">
          {leftPane}
        </div>
        <div className="split right">
          {rightPane}
        </div>
      </div>
    
    );
  }
}
export default splitSc;