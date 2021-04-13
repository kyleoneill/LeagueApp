import React from "react";

import "../style/build-page.css";

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
          <div className="counter-page">
              <p>Counter page</p>
          </div>
        );
    }
}

export default Counter;