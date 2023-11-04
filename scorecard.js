document.addEventListener('DOMContentLoaded', function () {
    const selectedCourseId = localStorage.getItem('selectedCourseId');

    if (!selectedCourseId) {
        alert('Please select a course first.');
        window.location.href = 'index.html';
        return;
    }

    const courseDataUrl = `https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course${selectedCourseId}.json`;

    fetch(courseDataUrl)
        .then((response) => response.json())
        .then((selectedCourseData) => {

            const courseInfo = document.getElementById('course-info');
            courseInfo.innerHTML = `<h2>${selectedCourseData.name}</h2>`;

            const scorecardTable = document.getElementById('scorecard-table');

            const headerRow = scorecardTable.insertRow(0);
            headerRow.insertCell(0); 

            const holes = selectedCourseData.holes;

            for (let holeNumber = 0; holeNumber < holes.length; holeNumber++) {
                const hole = holes[holeNumber];
                const holeHeaderCell = headerRow.insertCell(holeNumber + 1);
                holeHeaderCell.innerHTML = `<b>Hole ${holeNumber + 1}</b>`;
            }

            const parRow = scorecardTable.insertRow(1);
            const yardageRow = scorecardTable.insertRow(2);
            const handicapRow = scorecardTable.insertRow(3);

            parRow.insertCell(0).innerHTML = 'Par';
            yardageRow.insertCell(0).innerHTML = 'Yardage';
            handicapRow.insertCell(0).innerHTML = 'Handicap';

            for (let holeNumber = 0; holeNumber < holes.length; holeNumber++) {
                const hole = holes[holeNumber];
                parRow.insertCell(holeNumber + 1).innerHTML = hole.teeBoxes[0].par;
                yardageRow.insertCell(holeNumber + 1).innerHTML = hole.teeBoxes[0].yards;
                handicapRow.insertCell(holeNumber + 1).innerHTML = hole.teeBoxes[0].hcp;
            }

            const playerList = document.getElementById('player-list');
            const playerNameInput = document.getElementById('player-name');
            const addPlayerButton = document.getElementById('add-player');

            addPlayerButton.addEventListener('click', function () {
                const playerName = playerNameInput.value;
                if (playerName) {
                    const listItem = document.createElement('li');
                    const removeButton = document.createElement('button');
                    removeButton.textContent = 'Remove';
                    removeButton.className = 'remove-button';
                    removeButton.addEventListener('click', function () {
                       
                        const playerRowIndex = Array.from(playerList.children).indexOf(listItem);
                        scorecardTable.deleteRow(4 + playerRowIndex);
                        playerList.removeChild(listItem);
                    });

                    listItem.textContent = playerName;
                    listItem.appendChild(removeButton);
                    playerList.appendChild(listItem);

                    const playerScoresRow = scorecardTable.insertRow(4 + playerList.children.length - 1);
                    playerScoresRow.insertCell(0).innerHTML = `${playerName}'s Strokes`;

                    for (let i = 0; i < holes.length; i++) {
                        const cell = playerScoresRow.insertCell(i + 1);
                        const input = document.createElement('input');
                        input.type = 'number';
                        input.size = 2;
                        cell.appendChild(input);
                    }
                }
            });

            const calculateScoreButton = document.getElementById('calculate-score');

            calculateScoreButton.addEventListener('click', function () {

                const playerItems = playerList.getElementsByTagName('li');

                for (let i = 0; i < playerItems.length; i++) {
                    const playerItem = playerItems[i];
                    const playerName = playerItem.textContent.split('Remove')[0].trim();
                    const playerScoresRow = scorecardTable.rows[4 + i];

                    let totalScore = 0;

                    for (let j = 1; j <= holes.length; j++) {
                        const input = playerScoresRow.cells[j].querySelector('input');
                        const score = parseInt(input.value) || 0;
                        totalScore += score;
                    }

                    alert(`${playerName}'s total score is: ${totalScore}`);
                }
            });
        })
        .catch((error) => {
            console.error('Error loading course data:', error);
        });
});
