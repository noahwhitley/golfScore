const courses = [
    {
        name: "Thanksgiving Point Golf Course",
        id: 11819,
        imageUrl: "img/thanksgiving.jpg",
        description: "A beautiful course in Lehi, UT",
    },
    {
        name: "Fox Hollow Golf Course",
        id: 18300,
        imageUrl: "img/fox-hollow.jpg",
        description: "Experience golf in American Fork, UT",
    },
    {
        name: "Spanish Oaks Golf Course",
        id: 19002,
        imageUrl: "img/spanish.jpg",
        description: "Play at Spanish Oaks in Spanish Fork, UT",
    },
    
];

const courseSelection = document.getElementById('options-container');
const teeBoxSelect = document.getElementById('tee-box-select');

courses.forEach((course) => {
    const courseDiv = document.createElement('div');
    courseDiv.className = 'course';

    // Course name
    const courseName = document.createElement('h3');
    courseName.className = 'course-name';
    courseName.textContent = course.name;
    courseDiv.appendChild(courseName);

    // Course description
    const courseDescription = document.createElement('p');
    courseDescription.className = 'course-description';
    courseDescription.textContent = course.description;
    courseDiv.appendChild(courseDescription);

    const courseImage = document.createElement('img');
    courseImage.src = course.imageUrl;
    courseImage.alt = course.name;
    courseDiv.appendChild(courseImage);

    courseDiv.dataset.courseId = course.id;

    courseDiv.addEventListener('click', (event) => {
        const courseId = event.currentTarget.dataset.courseId;
        const selectedCourse = courses.find((course) => course.id === courseId);
        localStorage.setItem('selectedCourseId', courseId);
        localStorage.setItem('selectedCourseData', JSON.stringify(selectedCourse));
        window.location.href = 'scorecard.html';
    });

    courseSelection.appendChild(courseDiv);
});

function loadTeeBoxOptions(courseId) {
    const teeBoxDataUrl = `https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course${courseId}.json`;

    fetch(teeBoxDataUrl)
        .then((response) => response.json())
        .then((teeBoxes) => {
            let teeBoxSelectHtml = '';
            teeBoxes.forEach(function (teeBox, index) {
                teeBoxSelectHtml += `<option value="${index}">${teeBox.teeType.toUpperCase()}, ${
                    teeBox.totalYards
                } yards</option>`;
            });

            teeBoxSelect.innerHTML = teeBoxSelectHtml;
        })
        .catch((error) => {
            console.error('Error loading tee box data:', error);
        });
}
