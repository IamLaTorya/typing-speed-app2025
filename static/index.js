// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    // ===== LOGIN PAGE LOGIC =====
    const loginForm = document.getElementById('usernameLogin');
    const enterButton = document.getElementById('button');
    if (loginForm) 
        {
        //This handles the "enter" button click manually
        if(enterButton)
        {
            enterButton.addEventListener('click', (event) => 
            {
                event.preventDefault()// Prevent default form submission or any link behavor
                
                const usernameInput = document.getElementById('username');
                const username = usernameInput.value.trim();

            if (username) 
            {
                // Store the username in localStorage
                localStorage.setItem('storedUsername', username);

                // Redirect to the typing test page (no need to pass username in URL)
                window.location.href = '/templates/typingTest.html';
            }
            else
            {
                alert('Please enter your name before continuing.');
            }
        });
    }
}

    // ===== TYPING TEST PAGE LOGIC =====
    const typingTestContainer = document.querySelector('.typing-test-container');
    if (typingTestContainer) 
    {
        const username = localStorage.getItem('storedUsername');

        // Create a welcome message
        const welcomeMessage = document.createElement('h1');
        welcomeMessage.id = 'welcome-message';

        if (username) 
        {
            welcomeMessage.textContent = `Welcome, ${username}!`;
        } 
        else 
        {
            // No username found → redirect back to login page
            window.location.href = '/templates/login.html';
            return;
        }

        // Insert welcome message at the top of typing test container
        typingTestContainer.insertBefore(welcomeMessage, typingTestContainer.firstChild);

        //Create a logout message
        const logoutBtn = document.getElementById('logout-btn');// referenced from the typingTest.html
        if (logoutBtn)
        {
            logoutBtn.addEventListener('click', () =>
            {
            // //hide the typing test container
            // typingTestContainer.style.display = 'none';

            //clear username from LocalStorage and redirect
            localStorage.removeItem('storedUsername');
            window.location.href = 'login.html';
            });
        }
    }
});


