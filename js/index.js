// Theme toggle
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

// Theme toggle click handler
themeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        darkIcon.style.display = 'none';
        lightIcon.style.display = 'block';

        // Change to dark mode images
        profilePhotoLight.style.display = 'none';
        profilePhotoDark.style.display = 'block';
        emailIconLight.style.display = 'none';
        emailIconDark.style.display = 'block';
        githubIconLight.style.display = 'none';
        githubIconDark.style.display = 'block';
    } else {
        darkIcon.style.display = 'block';
        lightIcon.style.display = 'none';

        // Change to light mode images
        profilePhotoLight.style.display = 'block';
        profilePhotoDark.style.display = 'none';
        emailIconLight.style.display = 'block';
        emailIconDark.style.display = 'none';
        githubIconLight.style.display = 'block';
        githubIconDark.style.display = 'none';
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

