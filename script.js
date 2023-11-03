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

courses.forEach((course) => {
    const courseDiv = document.createElement('div');
    courseDiv.className = 'course';

    // Create the course name element with larger font
    const courseName = document.createElement('h3');
    courseName.className = 'course-name';
    courseName.textContent = course.name;
    courseDiv.appendChild(courseName);

    // Create the course description element
    const courseDescription = document.createElement('p');
    courseDescription.className = 'course-description';
    courseDescription.textContent = course.description;
    courseDiv.appendChild(courseDescription);

    // Add an image for the course
    const courseImage = document.createElement('img');
    courseImage.src = course.imageUrl;
    courseImage.alt = course.name;
    courseDiv.appendChild(courseImage);

    // Append the course div to the course selection container
    courseSelection.appendChild(courseDiv);
});
