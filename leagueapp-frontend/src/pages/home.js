import React from "react";

import "../style/build-page.css";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
          <div className="home-page">
              <p>Home page</p>
          </div>
        );
    }
}

export default Home;