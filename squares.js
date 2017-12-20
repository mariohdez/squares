"use strict";

let maxZ = 1000;

function getRandomColor() {
    let numbers = "0123456789abcdef";
    let result = "#";
    let i = 0;
    for (i = 0; i < 6; i += 1) {
        result += numbers.charAt(parseInt(Math.random() * numbers.length));
    }
    return result;
}

function changeColors() {
    const squares = document.querySelectorAll("#squarearea div");
    let i = 0;
    for (i = 0; i < squares.length; i += 1) {
        squares[i].style.backgroundColor = getRandomColor();
    }
}

function squareClick(mouseEvent) {
    const square = mouseEvent.target;
    const oldZIndex = parseInt(square.style.zIndex);
    if (oldZIndex === maxZ) {
        square.parentNode.removeChild(square);
    } else {
        maxZ += 1;
        square.style.zIndex = maxZ;
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

function generateInitialSquares() {
    const numberOfSquares = parseInt(Math.random() * 21) + 30;
    let i = 0;
    for (i = 0; i < numberOfSquares; i += 1) {
        addSquare();
    }
}

window.onload = function () {
    generateInitialSquares();
    let addSquareButton = document.getElementById("add");
    let changeColorsButton = document.getElementById("colors");
    addSquareButton.onclick = addSquare;
    changeColorsButton.onclick = changeColors;
};
