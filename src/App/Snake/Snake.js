import React, { Component } from 'react';
import './Snake.scss';

export default class Snake extends Component {
    render() {
        return (
            <div className="snake">
                {this.props.dots.map((dot, i) => {
                    const style = {
                        left: `${dot[0]}%`,
                        top: `${dot[1]}%`,
                        backgroundColor: '#c27474'
                    };

                    return (<div className="dot" key={i} style={style}></div>);
                })}
            </div>
        );
    }
}