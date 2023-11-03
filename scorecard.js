document.addEventListener('DOMContentLoaded', function () {
    const selectedCourseId = localStorage.getItem('selectedCourseId');

    if (!selectedCourseId) {
        alert('Please select a course first.');
        // Redirect to the course selection page (index.html)
        window.location.href = 'index.html';
        return;
    }

    // Fetch course data from the API based on the selected course ID
    const courseDataUrl = `https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course${selectedCourseId}.json`;

    fetch(courseDataUrl)
        .then((response) => response.json())
        .then((selectedCourseData) => {
            // Display the course name
            const courseInfo = document.getElementById('course-info');
            courseInfo.innerHTML = `<h2>${selectedCourseData.name}</h2>`;

            // Proceed to create the scorecard table and handle other functionality as needed.
        })
        .catch((error) => {
            console.error('Error loading course data:', error);
        });

    // Create the scorecard table based on the number of holes
    const scorecardTable = document.getElementById('scorecard-table');

    // ... code to generate the table headers ...

    // Add player functionality
    const playerList = document.getElementById('player-list');
    const playerNameInput = document.getElementById('player-name');
    const addPlayerButton = document.getElementById('add-player');

    addPlayerButton.addEventListener('click', function () {
        const playerName = playerNameInput.value;
        if (playerName) {
            const listItem = document.createElement('li');
            listItem.textContent = playerName;
            playerList.appendChild(listItem);
            playerNameInput.value = '';
        }
    });

    // Calculate score functionality
    const calculateScoreButton = document.getElementById('calculate-score');

    calculateScoreButton.addEventListener('click', function () {
        // Calculate and display the scores for each player
        const playerItems = playerList.getElementsByTagName('li');

        for (let i = 0; i < playerItems.length; i++) {
            const player = playerItems[i].textContent;
            let totalScore = 0;

            // ... code to calculate total score based on user input ...

            alert(`${player}'s total score is: ${totalScore}`);
        }
    });
});
