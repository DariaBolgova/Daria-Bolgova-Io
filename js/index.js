document.addEventListener('DOMContentLoaded', function () {
    // Theme toggle with localStorage persistence
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const darkIcon = document.getElementById('dark-icon');
    const lightIcon = document.getElementById('light-icon');
    
    // Photo and Connect section icons
    const profilePhotoLight = document.getElementById('photo-light');
    const profilePhotoDark = document.getElementById('photo-dark');
    const icons = {
        email: {
            light: document.getElementById('email-icon-light'),
            dark: document.getElementById('email-icon-dark'),
        },
        github: {
            light: document.getElementById('github-icon-light'),
            dark: document.getElementById('github-icon-dark'),
        },
        message: {
            light: document.getElementById('message-icon-light'),
            dark: document.getElementById('message-icon-dark'),
        }
    };

    // Toggle icons based on theme
    function toggleIcons(isDarkMode) {
        [darkIcon, profilePhotoLight, ...Object.values(icons).map(i => i.light)].forEach(icon => {
            icon.style.display = isDarkMode ? 'none' : 'block';
        });
        [lightIcon, profilePhotoDark, ...Object.values(icons).map(i => i.dark)].forEach(icon => {
            icon.style.display = isDarkMode ? 'block' : 'none';
        });
    }

    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark-mode') {
        body.classList.add('dark-mode');
        toggleIcons(true);
    }

    // Theme toggle click handler with localStorage update
    themeToggle.addEventListener('click', function() {
        const isDarkMode = body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark-mode' : '');
        toggleIcons(isDarkMode);

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
        menuToggle.setAttribute('aria-expanded', navMenu.classList.contains('show'));
    });

    // Add keyboard accessibility for the hamburger menu
    menuToggle.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            navMenu.classList.toggle('show');
            menuToggle.setAttribute('aria-expanded', navMenu.classList.contains('show'));
        }
    });

    // Handle active link and menu hiding
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            setTimeout(() => navMenu.classList.remove('show'), 200);
        });
    });

    // DOM Manipulation for Footer
    const footer = document.createElement('footer');
    document.body.appendChild(footer);
    footer.innerHTML = `&copy; Daria Bolgova ${new Date().getFullYear()}`;

    // Skills
    const skills = ["JavaScript", "HTML", "CSS", "GitHub", "Python", "Fortran"];
    const skillsSection = document.getElementById('Skills');
    const skillsList = skillsSection.querySelector('ul');

    // Populate skills list
    skillsList.innerHTML = '';
    skills.forEach(skillName => {
        const skill = document.createElement('li');
        skill.innerText = skillName;
        skillsList.appendChild(skill);
    });

    // Messages section visibility update
    function checkMessageList() {
        const messageSection = document.getElementById('Messages');
        const messageList = messageSection.querySelector('ul');
        const messageHeader = messageSection.querySelector('h2');
        const messageTextarea = messageSection.querySelectorAll('textarea');
        const leaveMessageSection = document.getElementById('Leave_message');
        const leaveMessageHeader = leaveMessageSection.querySelector('h2');
        const leaveMessageInputs = leaveMessageSection.querySelectorAll('input[type="text"], input[type="email"], textarea');
        
        if (!messageList || !leaveMessageSection) {
            console.error("Message or Leave_message section not found!");
            return;
        }

        const hasMessages = messageList.children.length > 0;
        messageSection.style.display = hasMessages ? 'block' : 'none';
        messageHeader.style.display = hasMessages ? 'block' : 'none';

        if (window.innerWidth >= 1040) {

            leaveMessageSection.style.setProperty('--before-width', hasMessages ? '715px' : '350px');
            leaveMessageSection.style.width = '350px';

            messageSection.style.width = '350px';
            messageSection.style.left = '640px';

            leaveMessageInputs.forEach(input => {
                input.style.setProperty('--message-input-width', '305px');
            });

            messageTextarea.forEach(textarea => {
                textarea.style.setProperty('--message-input-width', '305px');
            });

            messageHeader.style.width = '305px';
            leaveMessageHeader.style.width = '305px';
        
        } else if (window.innerWidth >= 900) {

            leaveMessageSection.style.setProperty('--before-width', hasMessages ? 'calc(248% - 170px)' : '350px');
            leaveMessageSection.style.width = hasMessages ? '54.5%' : '350px';

            messageSection.style.width = hasMessages ? '54.5%' : '350px';
            messageSection.style.left = hasMessages ? 'calc(75% + 150px)' : '640px';

            leaveMessageInputs.forEach(input => {
                input.style.setProperty('--message-input-width', 'calc(90% + 5px)');
            });

            messageTextarea.forEach(textarea => {
                textarea.style.setProperty('--message-input-width', 'calc(90% + 5px)');
            });

            messageHeader.style.width = 'calc(90% + 5px)';
            leaveMessageHeader.style.width = 'calc(90% + 5px)';

        } else if (window.innerWidth >= 500) {

            leaveMessageSection.style.width = hasMessages ? '90%' : '350px';
            messageSection.style.width = hasMessages ? '90%' : '0';

            if (window.innerWidth < 534) {
                leaveMessageSection.style.height = hasMessages ? '380px' : '350px';
                messageSection.style.height = hasMessages ? '380px' : '0';
            }

        }

    }

    // Add a message
    function createMessageElement({ userName, userEmail, userMessage }) {
        const messageList = document.getElementById('Messages').querySelector('ul');
        const newMessage = document.createElement('li');

        newMessage.innerHTML = `
            <p class="user-name"><a href="mailto:${userEmail}"><strong>${userName}</strong></a> wrote:</p>
            <p class="user-message">${userMessage}</p>
            <button type="edit">edit</button>
            <button type="remove">remove</button>
        `;

        const editButton = newMessage.querySelector('button[type="edit"]');
        const removeButton = newMessage.querySelector('button[type="remove"]');

        editButton.addEventListener('click', () => startEditingMessage(newMessage));
        removeButton.addEventListener('click', () => {
            newMessage.remove();
            saveMessages();
            checkMessageList();
        });

        messageList.appendChild(newMessage);
    }

    // Edit a message
    function startEditingMessage(messageElement) {
        const messageTextElement = messageElement.querySelector('.user-message');
        const originalMessage = messageTextElement.textContent;

        const editForm = document.createElement('form');
        editForm.innerHTML = `
            <textarea style="width: 95%; height: 70px;" required>${originalMessage}</textarea>
            <button type="save">Save</button>
            <button type="cancel">Cancel</button>
        `;
        
        const textarea = editForm.querySelector('textarea');
        const saveButton = editForm.querySelector('button[type="save"]');
        const cancelButton = editForm.querySelector('button[type="cancel"]');

        saveButton.addEventListener('click', (event) => {
            event.preventDefault();
            const newMessageText = textarea.value.trim();

            if (newMessageText) {
                messageTextElement.textContent = newMessageText;
                stopEditingMessage(messageElement, editForm, messageTextElement);
                saveMessages();
            } else {
                alert("Message cannot be empty.");
            }
        });

        cancelButton.addEventListener('click', (event) => {
            event.preventDefault();
            stopEditingMessage(messageElement, editForm, messageTextElement, originalMessage);
        });

        messageElement.replaceChild(editForm, messageTextElement);
        toggleMessageButtons(messageElement, false);
    }

    // Show/Hide edit/remove buttons
    function toggleMessageButtons(messageElement, show) {
        const buttons = messageElement.querySelectorAll('button[type="edit"], button[type="remove"]');
        buttons.forEach(button => button.style.display = show ? 'inline' : 'none');
    }

    // Stop editing and revert the form back to normal message view
    function stopEditingMessage(messageElement, editForm, messageTextElement, revertMessage = null) {
        if (revertMessage) {
            messageTextElement.textContent = revertMessage;
        }

        messageElement.replaceChild(messageTextElement, editForm);
        toggleMessageButtons(messageElement, true);
    }

    // Save messages to localStorage
    function saveMessages() {
        const messageList = document.getElementById('Messages').querySelector('ul');
        const messages = Array.from(messageList.children).map(message => {
            const userNameElement = message.querySelector('.user-name strong');
            const userEmailElement = message.querySelector('.user-name a');
            const userMessageElement = message.querySelector('.user-message');

            return {
                userName: userNameElement.textContent,
                userEmail: userEmailElement.href.replace('mailto:', ''),
                userMessage: userMessageElement.textContent
            };
        });

        localStorage.setItem('messages', JSON.stringify(messages));
        checkMessageList();
    }

    // Load messages from localStorage
    function loadMessages() {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
    
        const messageSection = document.getElementById('Messages');
        const messageList = messageSection.querySelector('ul');
    
        if (messages.length === 0) {
            messageSection.style.display = 'none';
        } else {
            messages.forEach(createMessageElement);
        }
    
        checkMessageList();
    }

    // Handle form submission and save message
    const messageForm = document.forms['leave_message'];
    messageForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const userName = event.target.usersName.value.trim();
        const userEmail = event.target.usersEmail.value.trim();
        const userMessage = event.target.usersMessage.value.trim();

        if (userName && userEmail && userMessage) {
            createMessageElement({ userName, userEmail, userMessage });
            saveMessages();
            messageForm.reset();
        }
    });

    // Initialize message list visibility and load messages on DOMContentLoaded
    loadMessages();

    const leaveMessageSection = document.getElementById('Leave_message');
    const messagesSection = document.getElementById('Messages');
    leaveMessageSection.style.display = 'none';
    messagesSection.style.display = 'none';

    // Toggle message and form visibility on icon click
    [icons.message.light, icons.message.dark].forEach(icon => {
        icon.addEventListener('click', function () {
            const isVisible = leaveMessageSection.style.display === 'block';
            leaveMessageSection.style.display = isVisible ? 'none' : 'block';
            messagesSection.style.display = isVisible ? 'none' : 'block';
        });
    });

});