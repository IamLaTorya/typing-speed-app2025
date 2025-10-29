// Wait until the HTML document is fully loaded before running any code
document.addEventListener("DOMContentLoaded", () => 
{

  // ========================
  // ===== LOGIN PAGE =======
  // ========================

  const loginForm = document.getElementById("usernameLogin"); // Get the login form element by its ID
  const usernameInput = document.getElementById("username");  // Get the username input field
  const enterButton = document.getElementById("button");      // Get the login button element

  if (loginForm) // Check if the login form exists on the current page
{
    enterButton.addEventListener("click", (event) => // Add click event listener to the button
    {
      event.preventDefault(); // Stop default form submission (prevents page reload)
      const username = usernameInput.value.trim(); // Get username input and remove spaces

      if (username !== "") // Check if username is not empty
    {
        localStorage.setItem("storedUsername", username); // Save username to browser local storage
        window.location.href = "../templates/index2.html"; // Redirect to typing test page
    }
    });

    usernameInput.addEventListener("keydown", (e) => // Add event listener for pressing a key
    {
      if (e.key === "Enter") // Check if the pressed key is Enter
    {
        e.preventDefault(); // Prevent default Enter key behavior
        const username = usernameInput.value.trim(); // Get trimmed username value

        if (username !== "") // Only run if username is not empty
        {
            localStorage.setItem("storedUsername", username); // Store username in local storage
            window.location.href = "../templates/index2.html"; // Redirect to typing test page
        }
    }
    }); 
}

  // ================================
  // ===== TYPING TEST PAGE ========
  // ================================

  const typingTestContainer = document.querySelector(".typing-test-container"); // Get main typing test container

  if (typingTestContainer) // Check if the typing test container exists (means we're on typing test page)
{
    const username = localStorage.getItem("storedUsername"); // Retrieve stored username from local storage

    if (!username) // If there’s no stored username
    {
      window.location.href = "../index.html"; // Redirect back to login page
      return; // Stop running the rest of the code
    }

    const welcomeMessage = document.createElement("h1"); // Create a new <h1> element
    welcomeMessage.id = "welcome-message"; // Assign it an ID for styling
    welcomeMessage.textContent = `Welcome, ${username}!`; // Set the text to include the username
    typingTestContainer.insertBefore(welcomeMessage, typingTestContainer.firstChild); // Add it to the top of the container

    const logoutBtn = document.getElementById("logout-btn"); // Get the logout button element

    if (logoutBtn) // Only if logout button exists
    {
      logoutBtn.addEventListener("click", () => // Add click listener to logout button
    {
        localStorage.removeItem("storedUsername"); // Remove username from local storage
        window.location.href = "../index.html"; // Redirect to login page
    });
    }

    // ===============================
    // ===== TYPING TEST LOGIC =======
    // ===============================

    const randomParagraphs = [ // Define an array of example text paragraphs
    "The quick brown fox just texted the lazy dog, “You up?”",
    "JavaScript walked into a bar and said, “NaN, I’m not a number.”", 
    "Coding is 10% writing code and 90% fixing what you wrote last night."
    ];

    const randomParagraphElement = document.getElementById("text-to-type"); // Element where paragraph will be displayed
    const textInputElement = document.getElementById("typing-input"); // Input field where user types
    const timerDisplay = document.getElementById("timer-display"); // Timer text display element
    const speedResult = document.getElementById("speed-result"); // Element to show typing speed
    const accuracyResult = document.getElementById("accuracy-result"); // Element to show accuracy result
    const startBtn = document.getElementById("start-btn"); // Start test button
    const stopBtn = document.getElementById("stop-btn"); // Stop test button

    let selectedParagraph = ""; // Will store the current random paragraph
    let testRunning = false; // Tracks whether the typing test is currently running
    let timer = 0; // Tracks elapsed time in seconds
    let timerInterval = null; // Stores the interval ID for timer updates

    function displayRandomParagraph() // Function to choose and display a random paragraph
    {
      const randomIndex = Math.floor(Math.random() * randomParagraphs.length); // Generate a random index
      selectedParagraph = randomParagraphs[randomIndex]; // Store the chosen paragraph
      randomParagraphElement.textContent = selectedParagraph; // Display it on the page
    }

    textInputElement.addEventListener("input", () => // Listen for any input changes
    {
      if (textInputElement.value.trim() === selectedParagraph) // If user typed full correct paragraph
    {
        endTest(); // End the typing test automatically
    }
    });

    function startTest() // Function to start the typing test
    {
      clearData(); // Reset previous data and UI
      if (testRunning) return; // Prevent multiple test starts
      displayRandomParagraph(); // Show a random paragraph to type
      timer = 0; // Reset timer to zero
      updateTimerDisplay(); // Update timer UI display
      testRunning = true; // Mark test as running
      textInputElement.disabled = false; // Enable typing input field
      textInputElement.focus(); // Focus cursor on input field
      timerInterval = setInterval(() => // Start repeating timer every second
    {
        timer++; // Increase timer count
        updateTimerDisplay(); // Update the time shown on screen
    }, 1000); // Repeat every 1 second (1000 ms)
    }

    function endTest() // Function to end the typing test
    {
      if (!testRunning) return; // Exit if no test is active
      testRunning = false; // Mark test as stopped
      clearInterval(timerInterval); // Stop timer counting
      const speed = calculateTypingSpeed(textInputElement.value, timer); // Calculate typing speed in WPM
      speedResult.textContent = `Speed: ${speed} WPM`; // Display the typing speed
      const accuracy = calculateAccuracy(textInputElement.value, selectedParagraph); // Calculate typing accuracy
      accuracyResult.textContent = `Accuracy: ${accuracy}%`; // Display the accuracy percentage
      textInputElement.disabled = true; // Disable input field after test ends
    }

    function updateTimerDisplay() // Function to update the timer on screen
    {
      timerDisplay.textContent = `Time: ${formatTime(timer)}`; // Show formatted time (mm:ss)
    }

    function formatTime(seconds) // Helper to convert seconds into minutes:seconds format
    {
      const mins = Math.floor(seconds / 60); // Get total minutes
      const secs = seconds % 60; // Get remaining seconds
      return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`; // Return time formatted with leading zeros
    }

    function calculateTypingSpeed(typedText, timeInSeconds) // Function to calculate typing speed (WPM)
    {
      const words = typedText.trim().split(/\s+/).length; // Count words by splitting text by spaces
      const minutes = timeInSeconds / 60; // Convert seconds to minutes
      if (minutes === 0) return 0; // Prevent division by zero
      return Math.round(words / minutes); // Return rounded words per minute
    }

    function calculateAccuracy(typedText, originalText) // Function to calculate typing accuracy percentage
    {
      const typedChars = typedText.split(""); // Convert typed text into array of characters
      const originalChars = originalText.split(""); // Convert target paragraph into array of characters
      let correct = 0; // Counter for correct characters
      for (let i = 0; i < typedChars.length; i++) // Loop through each typed character
    {
        if (typedChars[i] === originalChars[i]) correct++; // Count if character matches target
    }
      return Math.round((correct / originalChars.length) * 100); // Return percentage of correctly typed characters
    }

    startBtn.addEventListener("click", startTest); // Run startTest when Start button is clicked
    stopBtn.addEventListener("click", endTest); // Run endTest when Stop button is clicked

    function clearData() // Function to reset test data and UI before each test
    {
      clearInterval(timerInterval); // Stop any existing timer
      timer = 0; // Reset timer to zero
      updateTimerDisplay(); // Reset timer display
      textInputElement.value = ""; // Clear input field text
      speedResult.textContent = "Speed: —"; // Reset speed display
      accuracyResult.textContent = "Accuracy: —"; // Reset accuracy display
    }
  } // End of typing test section

}); // End of DOMContentLoaded wrapper

