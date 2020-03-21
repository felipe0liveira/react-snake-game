import React, { Component } from 'react';
import './Food.scss';

export default class Food extends Component {
    render() {
        const style = {
            left: `${this.props.position[0]}%`,
            top: `${this.props.position[1]}%`
        }
        return (<div className="food" style={style}></div>);
    }
}