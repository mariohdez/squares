"use strict";

let squaresApp = {
    maxZ: 1000,

    getRandomColor: function () {
        let numbers = "0123456789abcdef";
        let result = "#";
        let i = 0;

        for (i = 0; i < 6; i += 1) {
            result += numbers.charAt(parseInt(Math.random() * numbers.length));
        }
        return result;
    },

    getRandomPolygonArgs: function () {
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

    getRandomImgurURL: function () {
        let alphanum = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let result = "http://i.imgur.com/";
        let i = 0;

        for (i = 0; i < 5; i += 1) {
            result += alphanum.charAt(parseInt(Math.random() * alphanum.length));
        }
        return result + ".gif";
    },

    changeColors: function () {
        const shapes = document.querySelectorAll("#squarearea div");
        let i = 0;

        for (i = 0; i < shapes.length; i += 1) {
            if (shapes[i].classList.contains("square")) {
                shapes[i].style.backgroundColor = squaresApp.getRandomColor();
            } else if (shapes[i].classList.contains("triangle")) {
                shapes[i].style.borderBottomColor = squaresApp.getRandomColor();
            } else {
                shapes[i].style.backgroundColor = squaresApp.getRandomColor();
            }
        }
    },

    squareClick: function (mouseEvent) {
        const square = mouseEvent.target;
        const oldZIndex = parseInt(square.style.zIndex);
        if (oldZIndex === this.maxZ) {
            square.parentNode.removeChild(square);
        } else {
            this.maxZ += 1;
            square.style.zIndex = this.maxZ;
        }
    },

    addSquare: function () {
        let squareArea = document.getElementById("squarearea");
        let square = document.createElement("div");

        square.onclick = squaresApp.squareClick;
        square.className = "square";
        square.style.left = parseInt(Math.random() * 650) + "px";
        square.style.top = parseInt(Math.random() * 250) + "px";
        square.style.backgroundColor = squaresApp.getRandomColor();
        squareArea.appendChild(square);
    },

    addTriangle: function () {
        let squareArea = document.getElementById("squarearea");
        let triangle = document.createElement("div");

        triangle.className = "triangle";
        triangle.style.left = parseInt(Math.random() * 650) + "px";
        triangle.style.top = parseInt(Math.random() * 250) + "px";
        triangle.style.borderBottomColor = squaresApp.getRandomColor();
        squareArea.appendChild(triangle);
    },

    addPolygon: function () {
        let squareArea = document.getElementById("squarearea");
        let polygon = document.createElement("div");

        polygon.className = "polygon";
        polygon.style.clipPath = "polygon" + squaresApp.getRandomPolygonArgs();
        polygon.style.left = parseInt(Math.random() * 650) + "px";
        polygon.style.top = parseInt(Math.random() * 250) + "px";
        polygon.style.backgroundColor = squaresApp.getRandomColor();
        squareArea.appendChild(polygon);
    },

    changeBackground: function () {
        let squareArea = document.getElementById("squarearea");
        let imgurURL = squaresApp.getRandomImgurURL();;
        let xhttp = new XMLHttpRequest();
        const badURL = "http://i.imgur.com/removed.png";

        xhttp.open("GET", imgurURL, true);
        xhttp.setRequestHeader("Content-type", "image/jpeg");
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                let respURL = xhttp.responseURL;
                if (respURL == badURL)
                    squaresApp.changeBackground();
                else
                    squareArea.style.backgroundImage = "url('" + respURL + "')";
            }
        };
    },

    generateInitialSquares: function () {
        const numberOfSquares = parseInt(Math.random() * 21) + 30;
        let i = 0;

        for (i = 0; i < numberOfSquares; i += 1) {
            squaresApp.addSquare();
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
