const bgsound = new Audio("./sounds/bg.mp3");

// Function to start the game
function startGame() {
    // Close the popup
    closePopup();
    bgsound.play();
    const places = document.querySelectorAll('.place');
    const svgPaths = document.querySelectorAll('path');
    const scoreElement = document.getElementById('score');
    const timerElement = document.getElementById('timer');

    let draggedPlace = null;
    let score = 0;
    let timer;

    // Set the time limit in seconds
    const timeLimit = 60; // Change this to the desired time limit in seconds

    // Function to start the timer
    function startTimer() {
        let timeLeft = timeLimit;
        timerElement.textContent = `Time: ${timeLeft}s`;

        timer = setInterval(() => {
            timeLeft--;

            if (timeLeft < 0) {
                clearInterval(timer);
                showPopup(); // Call a function to show the popup when time is over
            } else {
                timerElement.textContent = `Time: ${timeLeft}s`;
            }
        }, 1000);
    }

    // Function to show the popup when time is over
    function showPopup() {
        alert('Time is over!'); // You can customize the popup content and styling
        // You can also add code here to reset the game or perform other actions
    }

    places.forEach(place => {
        place.addEventListener('dragstart', dragStart);
        place.addEventListener('dragend', dragEnd);
    });

    svgPaths.forEach(path => {
        path.addEventListener('dragover', dragOver);
        path.addEventListener('dragenter', dragEnter);
        path.addEventListener('dragleave', dragLeave);
        path.addEventListener('drop', dragDrop);
    });

    // Start the timer when the page loads
    startTimer();

    function dragStart() {
        this.className += ' hold';
        setTimeout(() => (this.className = 'invisible'), 0);
        draggedPlace = this;
    }

    function dragEnd() {
        this.className = 'place';
        draggedPlace = null;
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnter(e) {
        e.preventDefault();
        this.className += ' hovered';
    }

    function dragLeave() {
        this.className = '';
    }

    function dragDrop() {
        const correctPlace = this.getAttribute('title');
        const placeDataCorrect = draggedPlace.getAttribute('data-correct');
        const badsound = new Audio("./sounds/bad.wav");
        const goodsound = new Audio("./sounds/good.wav");
        var good = document.getElementById('good');
        var bad = document.getElementById('bad');

        if (!draggedPlace.classList.contains('placed')) {
            if (placeDataCorrect.toLowerCase() === correctPlace.toLowerCase()) {
                // Change the color to green if it's the correct place
                draggedPlace.style.backgroundColor = 'green';
                good.style.display = "block";
                goodsound.play();
                setTimeout(() => {
                    good.style.display = 'none';
                }, 2000); // 3000 milliseconds (3 seconds)
                // Update the score
                score++;
                scoreElement.textContent = `Score: ${score}`;
            } else {
                // Change the color to red if it's not the correct place
                draggedPlace.style.backgroundColor = 'red';
                bad.style.display = "block";
                badsound.play();
                setTimeout(() => {
                    bad.style.display = 'none';
                }, 2000); // 3000 milliseconds (3 seconds)
            }

            // Mark the place as "placed" and make it undraggable
            draggedPlace.classList.add('placed');
            draggedPlace.draggable = false;
        }
    }
}

// Function to open the popup
function openPopup() {
    document.getElementById('popup').style.display = 'block';
}

// Function to close the popup
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

// Call the openPopup function when the page loads to show the confirmation dialog
window.onload = openPopup;