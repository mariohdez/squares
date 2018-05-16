"use strict";

let squaresApp = {
    maxZ: 1000,

    triangle: "triangle",
    square: "square",

    getRandomColor: function () {
        let numbers = "0123456789abcdef";
        let result = "#";
        let i = 0;

        for (i = 0; i < 6; i += 1) {
            result += numbers.charAt(parseInt(Math.random() * numbers.length));
        }
        return result;
    },

    changeColors: function () {
        const shapes = document.querySelectorAll("#squarearea div");
        let i = 0;

        for (i = 0; i < shapes.length; i += 1) {
            if (shapes[i].classList.contains("square")) {
                shapes[i].style.backgroundColor = squaresApp.getRandomColor();
            } else if (shapes[i].classList.contains(squaresApp.triangle)) {
                shapes[i].style.borderBottomColor = squaresApp.getRandomColor();
            }
        }
    },

    squareClick: function (mouseEvent) {
        const square = mouseEvent.target;
        const oldZIndex = parseInt(square.style.zIndex);

        if (oldZIndex === squaresApp.maxZ) {
            square.parentNode.removeChild(square);
        } else {
            squaresApp.maxZ += 1;
            square.style.zIndex = squaresApp.maxZ;
        }
    },

    triangleClick: function (mouseEvent) {
        const triangle = mouseEvent.target;
        const oldZIndex = parseInt(triangle.style.zIndex);
        if (oldZIndex == squaresApp.maxZ) {
            triangle.parentNode.removeChild(triangle);
        } else {
            squaresApp.maxZ += 1;
            triangle.style.zIndex = squaresApp.maxZ;
        }
    },

    addSquare: function () {
        let squareArea = document.getElementById("squarearea");
        let square = document.createElement("div");

        square.onclick = squaresApp.squareClick;
        square.className = squaresApp.square;
        square.style.left = parseInt(Math.random() * 650) + "px";
        square.style.top = parseInt(Math.random() * 250) + "px";
        square.style.backgroundColor = squaresApp.getRandomColor();
        squareArea.appendChild(square);
    },

    addTriangle: function () {
        let squareArea = document.getElementById("squarearea");
        let triangle = document.createElement("div");

        triangle.onclick = squaresApp.triangleClick;
        triangle.className = squaresApp.triangle;
        triangle.style.left = parseInt(Math.random() * 650) + "px";
        triangle.style.top = parseInt(Math.random() * 250) + "px";
        triangle.style.borderBottomColor = squaresApp.getRandomColor();
        squareArea.appendChild(triangle);
    },

    changeBackground: function () {
        let squareArea = document.getElementById("squarearea");
        squareArea.style.backgroundColor = squaresApp.getRandomColor();
    },

    generateInitialShapes: function () {
        const numberOfSquares = parseInt(Math.random() * 21) + 30;
        let i = 0;
        let rand = 0;

        for (i = 0; i < numberOfSquares; i += 1) {
            rand = Math.floor(Math.random() * 2);
            if (rand === 1) {
                squaresApp.addSquare();
            } else {
                squaresApp.addTriangle();
            }
        }
        squaresApp.changeBackground();
    }
};

window.onload = () => {
    squaresApp.generateInitialShapes();

    let addSquareButton = document.getElementById("add");
    let changeColorsButton = document.getElementById("colors");
    let addTriangleButton = document.getElementById("add-triangle");
    let changeBackgroundButton = document.getElementById("change-background");

    addSquareButton.onclick = squaresApp.addSquare;
    changeColorsButton.onclick = squaresApp.changeColors;
    addTriangleButton.onclick = squaresApp.addTriangle;
    changeBackgroundButton.onclick = squaresApp.changeBackground;
};
