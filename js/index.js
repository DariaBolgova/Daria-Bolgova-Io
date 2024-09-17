// Theme toggle with localStorage persistence
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const darkIcon = document.getElementById('dark-icon');
const lightIcon = document.getElementById('light-icon');

// Photo and Connect section icons
const profilePhotoLight = document.getElementById('photo-light');
const profilePhotoDark = document.getElementById('photo-dark');
const emailIconLight = document.getElementById('email-icon-light');
const emailIconDark = document.getElementById('email-icon-dark');
const githubIconLight = document.getElementById('github-icon-light');
const githubIconDark = document.getElementById('github-icon-dark');
const messageIconLight = document.getElementById('message-icon-light');
const messageIconDark = document.getElementById('message-icon-dark');

// Load theme from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    if (savedTheme === 'dark-mode') {
        darkIcon.style.display = 'none';
        lightIcon.style.display = 'block';

        profilePhotoLight.style.display = 'none';
        profilePhotoDark.style.display = 'block';
        emailIconLight.style.display = 'none';
        emailIconDark.style.display = 'block';
        githubIconLight.style.display = 'none';
        githubIconDark.style.display = 'block';
        messageIconLight.style.display = 'none';
        messageIconDark.style.display = 'block';
    }
}

// Theme toggle click handler with localStorage update
themeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    const currentTheme = body.classList.contains('dark-mode') ? 'dark-mode' : '';
    localStorage.setItem('theme', currentTheme);

    if (body.classList.contains('dark-mode')) {
        darkIcon.style.display = 'none';
        lightIcon.style.display = 'block';

        profilePhotoLight.style.display = 'none';
        profilePhotoDark.style.display = 'block';
        emailIconLight.style.display = 'none';
        emailIconDark.style.display = 'block';
        githubIconLight.style.display = 'none';
        githubIconDark.style.display = 'block';
        messageIconLight.style.display = 'none';
        messageIconDark.style.display = 'block';
    } else {
        darkIcon.style.display = 'block';
        lightIcon.style.display = 'none';

        profilePhotoLight.style.display = 'block';
        profilePhotoDark.style.display = 'none';
        emailIconLight.style.display = 'block';
        emailIconDark.style.display = 'none';
        githubIconLight.style.display = 'block';
        githubIconDark.style.display = 'none';
        messageIconLight.style.display = 'block';
        messageIconDark.style.display = 'none';
    }

    // Toggle sound
    const sound = document.getElementById('toggle-sound');
    sound.currentTime = 0;
    sound.play();
});

// Hamburger menu and navigation
const menuToggle = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');
const navLinks = document.querySelectorAll('nav ul li a');

// Toggle the visibility of the menu when clicking the hamburger
menuToggle.addEventListener('click', function() {
    navMenu.classList.toggle('show');
});

// Add keyboard accessibility for the hamburger menu
menuToggle.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        navMenu.classList.toggle('show');
    }
});

navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
        // Delay before hiding the menu
        setTimeout(() => {
            navMenu.classList.remove('show');
        }, 200);
    });
});

// DOM Manipulation for Footer
if (!document.querySelector('footer')) {
    const footer = document.createElement('footer');
    document.body.appendChild(footer);

    const today = new Date();
    const thisYear = today.getFullYear();

    const copyright = document.createElement('p');
    const copyrightSymbol = "\u00A9";
    copyright.innerHTML = `${copyrightSymbol} Daria Bolgova ${thisYear}`;

    footer.appendChild(copyright);
}

// Skills
const skills = ["JavaScript", "HTML", "CSS", "GitHub", "Python", "Fortran"];
const skillsSection = document.getElementById('Skills');
const skillsList = skillsSection.querySelector('ul');

// Clear existing list before adding new skills (if needed)
skillsList.innerHTML = '';
skills.forEach(skillName => {
    const skill = document.createElement('li');
    skill.innerText = skillName;
    skillsList.appendChild(skill);
});
