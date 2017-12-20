"use strict";

let maxZ = 1000;

function getRandomColor() {
    let numbers = "0123456789abcdef";
    let result = "#";
    for (let i = 0; i < 6; ++i) {
        result += numbers.charAt(parseInt(Math.random() * numbers.length));
    }
    return result;
}

function generateInitialSquares() {
    const numberOfSquares = parseInt(Math.random() * 21) + 30;
    for (let i = 0; i < numberOfSquares; ++i) {
        addSquare();
    }
}

function addSquare() {
    let squareArea = document.getElementById("squarearea");
    let square = document.createElement("div");
    square.onclick = squareClick;
    square.className = "square";
    square.style.left = parseInt(Math.random() * 650) + "px";
    square.style.top = parseInt(Math.random() * 250) + "px";
    square.style.backgroundColor = getRandomColor();
    squareArea.appendChild(square);
}

function changeColors() {
    const squares = document.querySelectorAll("#squarearea div");
    for (let i = 0; i < squares.length; ++i) {
        squares[i].style.backgroundColor = getRandomColor();
    }
}

function squareClick(mouseEvent) {
    const square = mouseEvent.target;
    const oldZIndex = parseInt(square.style.zIndex);
    if (oldZIndex === maxZ) {
        square.parentNode.removeChild(square);
    } else {
        maxZ++;
        square.style.zIndex = maxZ;
    }
}

window.onload = function () {
    generateInitialSquares();
    let addSquareButton = document.getElementById("add");
    let changeColorsButton = document.getElementById("colors");
    addSquareButton.onclick = addSquare;
    changeColorsButton.onclick = changeColors;
};
