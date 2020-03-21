import React, { Component } from 'react';
import './Game.scss';

import * as Hammer from 'hammerjs';

import Snake from './Snake/Snake';
import Food from './Food/Food';
import Sounds from './Sounds/Sounds';

function getRandomCoordinate() {
    const min = 1;
    const max = 98;
    const x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    const y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;

    return [x, y];
}

const initialState = {
    snakeDots: [
        [0, 0],
        [2, 0]
    ],
    foodPosition: getRandomCoordinate(),
    direction: 'RIGHT',
    speed: 120
}


export default class Game extends Component {
    state = initialState;

    componentDidMount() {
        setInterval(this.moveSnake, this.state.speed);
        document.onkeydown = this.handleKeyDown;

        var game = document.querySelector('.game');

        const hammertime = new Hammer(game);
        hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
        hammertime.on('swipe', this.handleKeyDown);
    }

    componentDidUpdate() {
        this.wallColisionCheck();
        this.selfCollisionCheck();
        this.foodCollisionCheck();
    }

    onGameOver() {
        window.alert(`Oh no!\nThe Game is over...\n\nYour Score: ${this.state.snakeDots.length}`);
        this.setState(initialState);
    }

    foodCollisionCheck = () => {
        const head = this.state.snakeDots[this.state.snakeDots.length - 1];
        const food = this.state.foodPosition;

        if (head[0] === food[0] && head[1] === food[1]) {
            new Sounds().eat.play();
            this.setState({ foodPosition: getRandomCoordinate() });
            this.enlargeSnake();
        }
    }

    selfCollisionCheck() {
        const snake = [...this.state.snakeDots];
        const head = this.state.snakeDots[this.state.snakeDots.length - 1];

        snake.pop();

        snake.forEach((dot) => {
            if (head[0] === dot[0] && head[1] === dot[1]) {
                this.onGameOver();
            }
        });
    }

    wallColisionCheck() {
        const head = this.state.snakeDots[this.state.snakeDots.length - 1];

        if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
            this.onGameOver();
        }
    }

    enlargeSnake = () => {
        const newSnake = [...this.state.snakeDots];
        newSnake.unshift([]);
        this.setState({
            snakeDots: newSnake
        });
    }

    moveSnake = () => {
        const dots = [...this.state.snakeDots];
        let head = dots[dots.length - 1];

        switch (this.state.direction) {
            case 'LEFT':
                head = [head[0] - 2, head[1]];
                break;
            case 'UP':
                head = [head[0], head[1] - 2];
                break;
            case 'RIGHT':
                head = [head[0] + 2, head[1]];
                break;
            case 'DOWN':
                head = [head[0], head[1] + 2];
                break;

            default:
                break;
        }

        dots.push(head);
        dots.shift();

        this.setState({
            snakeDots: dots
        })
    }

    handleKeyDown = (e) => {
        e = e || window.event;
        const eCode = e.keyCode || e.offsetDirection;

        if ((eCode === 37 || eCode === 2) && this.state.direction !== 'RIGHT') {
            this.setState({ direction: 'LEFT' });
            return;
        }
        if ((eCode === 38 || eCode === 8) && this.state.direction !== 'DOWN') {
            this.setState({ direction: 'UP' });
            return;
        }
        if ((eCode === 39 || eCode === 4) && this.state.direction !== 'LEFT') {
            this.setState({ direction: 'RIGHT' });
            return;
        }
        if ((eCode === 40 || eCode === 16) && this.state.direction !== 'UP') {
            this.setState({ direction: 'DOWN' });
            return;
        }
    }

    render() {
        let gameWidth = '100vh';
        let gameHeight = '100vh';

        if (window.innerHeight > window.innerWidth) {
            gameWidth = '100vw';
            gameHeight = '100vw';
        }

        const gameSizeStyle = {
            width: gameWidth,
            height: gameHeight
        };

        return (
            <div className="game" style={gameSizeStyle}>
                <Snake dots={this.state.snakeDots} />
                <Food position={this.state.foodPosition} />
            </div>
        );
    }
}