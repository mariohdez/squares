"use strict";

let squaresApp = {
    maxZ: 1000,

    getRandomColor: () => {
        let numbers = "0123456789abcdef";
        let result = "#";
        let i = 0;

        for (i = 0; i < 6; i += 1) {
            result += numbers.charAt(parseInt(Math.random() * numbers.length));
        }
        return result;
    },

    getRandomPolygonArgs: () => {
        let rand = parseInt(Math.random() * 20);
        let result = "("
        let i = 0;

        for (i = 0; i < rand; i += 1) {
            result += parseInt(Math.random() * 100) + "% ";
            result += parseInt(Math.random() * 100) + "%, ";
        }
        result = result.slice(0, -2) + ")";
        return result;
    },

    getRandomImgurURL: () => {
        let alphanum = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let result = "http://i.imgur.com/";
        let i = 0;

        for (i = 0; i < 5; i += 1) {
            result += alphanum.charAt(parseInt(Math.random() * alphanum.length));
        }
        return result + ".gif";
    },

    changeColors: () => {
        const shapes = document.querySelectorAll("#squarearea div");
        let i = 0;

        for (i = 0; i < shapes.length; i += 1) {
            if (shapes[i].classList.contains("square")) {
                shapes[i].style.backgroundColor = getRandomColor();
            } else if (shapes[i].classList.contains("triangle")) {
                shapes[i].style.borderBottomColor = getRandomColor();
            } else {
                shapes[i].style.backgroundColor = getRandomColor();
            }
        }
    },

    squareClick: (mouseEvent) => {
        const square = mouseEvent.target;
        const oldZIndex = parseInt(square.style.zIndex);

        if (oldZIndex === maxZ) {
            square.parentNode.removeChild(square);
        } else {
            maxZ += 1;
            square.style.zIndex = maxZ;
        }
    },

    addSquare: () => {
        let squareArea = document.getElementById("squarearea");
        let square = document.createElement("div");

        square.onclick = squareClick;
        square.className = "square";
        square.style.left = parseInt(Math.random() * 650) + "px";
        square.style.top = parseInt(Math.random() * 250) + "px";
        square.style.backgroundColor = getRandomColor();
        squareArea.appendChild(square);
    },

    addTriangle: () => {
        let squareArea = document.getElementById("squarearea");
        let triangle = document.createElement("div");

        triangle.className = "triangle";
        triangle.style.left = parseInt(Math.random() * 650) + "px";
        triangle.style.top = parseInt(Math.random() * 250) + "px";
        triangle.style.borderBottomColor = getRandomColor();
        squareArea.appendChild(triangle);
    },

    addPolygon: () => {
        let squareArea = document.getElementById("squarearea");
        let polygon = document.createElement("div");

        polygon.className = "polygon";
        polygon.style.clipPath = "polygon" + getRandomPolygonArgs();
        polygon.style.left = parseInt(Math.random() * 650) + "px";
        polygon.style.top = parseInt(Math.random() * 250) + "px";
        polygon.style.backgroundColor = getRandomColor();
        squareArea.appendChild(polygon);
    },

    changeBackground: () => {
        let squareArea = document.getElementById("squarearea");
        let imgurURL = getRandomImgurURL();;
        let xhttp = new XMLHttpRequest();
        const badURL = "http://i.imgur.com/removed.png";

        xhttp.open("GET", imgurURL, true);
        xhttp.setRequestHeader("Content-type", "image/jpeg");
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                let respURL = xhttp.responseURL;
                if (respURL == badURL)
                    changeBackground();
                else
                    squareArea.style.backgroundImage = "url('" + respURL + "')";
            }
        };
    },

    generateInitialSquares: () => {
        const numberOfSquares = parseInt(Math.random() * 21) + 30;
        let i = 0;

        for (i = 0; i < numberOfSquares; i += 1) {
            addSquare();
        }
    }
};

window.onload = () => {
    squaresApp.generateInitialSquares();

    let addSquareButton = document.getElementById("add");
    let changeColorsButton = document.getElementById("colors");
    let addTriangleButton = document.getElementById("add-triangle");
    let addPolygonButton = document.getElementById("add-polygon");
    let changeBackgroundButton = document.getElementById("random-background")

    addSquareButton.onclick = squaresApp.addSquare;
    changeColorsButton.onclick = squaresApp.changeColors;
    addTriangleButton.onclick = squaresApp.addTriangle;
    addPolygonButton.onclick = squaresApp.addPolygon;
    changeBackgroundButton.onclick = squaresApp.changeBackground;
};
