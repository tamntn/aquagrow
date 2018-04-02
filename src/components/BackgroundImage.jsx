import React, { Component } from 'react';
import '../style/BackgroundImage.css';

class Background extends Component {
    render() {
        return (
            <div>
                <div className="left-background-image"></div>
                <div className="right-background-image"></div>
            </div>
        )
    }
}

export default Background;