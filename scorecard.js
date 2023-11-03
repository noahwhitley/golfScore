document.addEventListener('DOMContentLoaded', function () {
    // Retrieve the selected course data from localStorage
    const selectedCourseData = JSON.parse(localStorage.getItem('selectedCourseData'));

    if (!selectedCourseData) {
        alert('Please select a course first.');
        // Redirect to the course selection page (index.html)
        window.location.href = 'index.html';
        return;
    }
    
    // Display the course information
    const courseInfo = document.getElementById('course-info');
    courseInfo.innerHTML = `
        <h2>${selectedCourseData.name}</h2>
        <p>${selectedCourseData.description}</p>
        <img src="${selectedCourseData.thumbnail}" alt="${selectedCourseData.name}">
    `;

    // Create the scorecard table based on the number of holes
    const scorecardTable = document.getElementById('scorecard-table');
    const numHoles = selectedCourseData.holes.length;

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
