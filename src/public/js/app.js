/* eslint-disable no-unused-vars */

function getFiles() {
    var xmlHttp = new XMLHttpRequest()
    xmlHttp.open("GET", "/files", false) // false for synchronous request
    xmlHttp.send(null)
    return JSON.parse(xmlHttp.responseText)
}

var mainArray = getFiles()

// Counter array that holds the current image for each image array
var counterArr = [0, 0, 0]

// Element Array - Holds tags matched with array numbers
var elementArray = [
    ["armsImage", 1],
    ["legsImage", 2],
    ["headImage", 0]
]

var ctx = initialiseCanvas()


function nextImage(element, arrayNum) {
    // Grab image variable from the document
    var img = document.getElementById(element)

    // If the counter is at the end of the array, loop around to the start of the array
    if (counterArr[arrayNum] == mainArray[arrayNum].length - 1) {
        counterArr[arrayNum] = 0
        // Update image source to new value
        img.src = mainArray[arrayNum][0]
        img.onload = function () {
            drawImages()
        }
    }

    // Else increase the counter and update image source
    else {
        counterArr[arrayNum] += 1
        img.src = mainArray[arrayNum][counterArr[arrayNum]]
        img.onload = function () {
            drawImages()
        }
    }
}


function previousImage(element, arrayNum) {
    // Grab image variable from the document
    var img = document.getElementById(element)

    // If the counter is at 0, loop around to the end of the array
    if (counterArr[arrayNum] == 0) {
        counterArr[arrayNum] = mainArray[arrayNum].length - 1
        // Update image source to new value
        img.src = mainArray[arrayNum][counterArr[arrayNum]]
        img.onload = function () {
            drawImages()
        }
    }

    // Else decrease the counter and update image source
    else {
        counterArr[arrayNum] -= 1
        img.src = mainArray[arrayNum][counterArr[arrayNum]]
        img.onload = function () {
            drawImages()
        }
    }
}


function randomiseAll() {
    let index
    // Loop through all elements in the all elements array
    for (index in elementArray) {
        // Grab the arrayNum of the element type
        let arrayNum = elementArray[index][1]

        // Generate random num for an image that isn't the current image
        let randomNum = getRandomInt(0, mainArray[arrayNum].length)
        while (randomNum == counterArr[arrayNum]) {
            randomNum = getRandomInt(0, mainArray[arrayNum].length)
        }

        // Set the new image and update the current image in the counterArr
        document.getElementById(elementArray[index][0]).src = mainArray[arrayNum][randomNum]
        counterArr[arrayNum] = randomNum
        drawImages()
    }
}


// Get a random int value between a min and a max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}


function drawImages() {
    let armsImg = document.getElementById("armsImage")
    let legsImg = document.getElementById("legsImage")
    let headImg = document.getElementById("headImage")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(armsImg, 40, 150, 300, 300)
    ctx.drawImage(legsImg, 300, 300, 300, 300)
    ctx.drawImage(headImg, 300, 10, 300, 300)

    // Draw the text
    ctx.font = "30px verdana"
    ctx.globalAlpha = .75
    ctx.fillStyle = "white"
    ctx.fillText("Custocat.com", 350, 340)
    ctx.fillStyle = "black"
    ctx.fillText("Custocat.com", 352, 342)
    ctx.globalAlpha = 1
    // If you remove the watermark on this image and use our site to submit an octocat to the GitHubEducation
    // challenge and do not acknowledge it was made using the site, know one thing...
    /// You are a scumbag, don't do that!
}

function initialiseCanvas() {
    // Initialise the canvas element
    let canvas = document.getElementById("canvas")
    let ctx = canvas.getContext("2d")

    // Drawing functions
    let headImg = document.getElementById("headImage")
    let legsImg = document.getElementById("legsImage")
    let armsImg = document.getElementById("armsImage")

    ctx.drawImage(armsImg, 40, 170, 300, 300)
    ctx.drawImage(legsImg, 300, 300, 300, 300)
    ctx.drawImage(headImg, 300, 10, 300, 300)

    return ctx
}

function saveImage() {
    var fileName = prompt("Please enter your Octocat name", "")
    if (fileName != "" && fileName) {
        var twitterHandle = prompt("Please enter your Twitter Handle", "@")
    }

    if (twitterHandle === "" || twitterHandle === "@") {
        alert("You must enter a name and Twitter handle")
    }

    else if (fileName && twitterHandle) {
        var dataURL = canvas.toDataURL("image/png")
        var blobBin = atob(dataURL.split(",")[1])
        var array = []
        for (var i = 0; i < blobBin.length; i++) {
            array.push(blobBin.charCodeAt(i))
        }
        var blob = new Blob([new Uint8Array(array)], { type: "image/png" })

        var ajaxReturnVal = uploadOctocat(blob, fileName, twitterHandle)
        if (ajaxReturnVal == 200) {
            alert("Octocat uploaded successfully!")
        }

        else if (ajaxReturnVal == 400) {
            alert("Oh no! Octocat failed to upload, try again")
        }

        else {
            alert("Uh oh. We don't know what's happened to your Octocat!")
        }
    }
}

function uploadOctocat(image, name, author) {
    // Creat an instance of FormData
    var data = new FormData()

    // Success trakcer
    var success = false
    console.log(image)
    // Add keys
    data.append("octocat", image)
    data.append("name", name)
    data.append("submitter", author)

    console.log(data)

    $.ajax({
        url: "https://api.custocat.com/image",
        method: "POST",
        dataType: "json",
        data: data,
        processData: false,
        contentType: false,
        success: function (res) { success = true; console.log(res); },
        error: function (err) { success = false; console.error(err); }
    })

    return success
}

var canvas = document.getElementById("canvas")
ctx = initialiseCanvas()  