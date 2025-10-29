// ===== Wait for DOM to load =====
document.addEventListener("DOMContentLoaded", () => 
{

  // ========================
  // ===== LOGIN PAGE =======
  // ========================

const loginForm = document.getElementById("usernameLogin");
const usernameInput = document.getElementById("username");
const enterButton = document.getElementById("button");

if (loginForm) 
{
    //when the button is clicked
    enterButton.addEventListener("click", (event) =>
    {
        event.preventDefault();

        const username = usernameInput.value.trim();

        //only continue if the username is not empty
        if (username !== "")
        {
             // Store username in local storage
            localStorage.setItem("storedUsername", username);

            //redirect to typing test page
            window.location.href = "../templates/index2.html";  
        }
    });
    //when the user presses the enter key on the keyboard
    usernameInput.addEventListener("keydown", (e) =>
    {
    if (e.key === "Enter")
    {
        e.preventDefault();

        const username = usernameInput.value.trim();

        if (username !== "")
            {
                localStorage.setItem("storedUsername", username);
                window.location.href = "../templates/index2.html";
            }
        }
    }); 
};

  // ================================
  // ===== TYPING TEST PAGE ========
  // ================================

const typingTestContainer = document.querySelector(".typing-test-container");

if (typingTestContainer)
{
    // ===== Retrieve stored username =====
    const username = localStorage.getItem("storedUsername");

    if (!username) {
      // Redirect to login if no username
    window.location.href = "../index.html";
    return;
    
}

    // Add welcome message
    const welcomeMessage = document.createElement("h1");
    welcomeMessage.id = "welcome-message";
    welcomeMessage.textContent = `Welcome, ${username}!`;
    typingTestContainer.insertBefore(welcomeMessage, typingTestContainer.firstChild);

    // ===== LOGOUT =====
    const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn)
{
    logoutBtn.addEventListener("click", () => 
    {
        localStorage.removeItem("storedUsername");
        window.location.href = "../index.html";
    });
}

    // ===============================
    // ===== TYPING TEST LOGIC =======
    // ===============================

    // Task 3: Sample Paragraphs
const randomParagraphs = 
[
    "The quick brown fox just texted the lazy dog, “You up?”",
    "JavaScript walked into a bar and said, “NaN, I’m not a number.”", 
    "Coding is 10% writing code and 90% fixing what you wrote last night."
];

    // DOM Elements
const randomParagraphElement = document.getElementById("text-to-type");
const textInputElement = document.getElementById("typing-input");
const timerDisplay = document.getElementById("timer-display");
const speedResult = document.getElementById("speed-result");
const accuracyResult = document.getElementById("accuracy-result");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");

    // State Variables
let selectedParagraph = "";
let testRunning = false;
let timer = 0;
let timerInterval = null;

    // Task 3: Display random paragraph
function displayRandomParagraph() 
{
      const randomIndex = Math.floor(Math.random() * randomParagraphs.length);
    selectedParagraph = randomParagraphs[randomIndex];
    randomParagraphElement.textContent = selectedParagraph;
}

    // Task 4: End test when paragraph is fully typed
textInputElement.addEventListener("input", () => 
{
    if (textInputElement.value.trim() === selectedParagraph) 
    {
        endTest();
    }
});

    // Start test
function startTest() 
{
    clearData();
    if (testRunning) return;

    displayRandomParagraph();
    timer = 0;
    updateTimerDisplay();

    testRunning = true;
    textInputElement.disabled = false;
    textInputElement.focus();

    timerInterval = setInterval(() => 
    {
        timer++;
        updateTimerDisplay();
    }, 1000);
}

    // Stop test
function endTest() 
{
if (!testRunning) return;

    testRunning = false;
    clearInterval(timerInterval);

    const speed = calculateTypingSpeed(textInputElement.value, timer);
    speedResult.textContent = `Speed: ${speed} WPM`;

    const accuracy = calculateAccuracy(textInputElement.value, selectedParagraph);
    accuracyResult.textContent = `Accuracy: ${accuracy}%`;

    textInputElement.disabled = true;
}

    // Timer Display
function updateTimerDisplay() 
{
    timerDisplay.textContent = `Time: ${formatTime(timer)}`;
}

function formatTime(seconds) 
{
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

    // Speed (WPM)
function calculateTypingSpeed(typedText, timeInSeconds) 
{
    const words = typedText.trim().split(/\s+/).length;
    const minutes = timeInSeconds / 60;
    if (minutes === 0) return 0;
    return Math.round(words / minutes);
}

    // Accuracy (%)
function calculateAccuracy(typedText, originalText) 
{
    const typedChars = typedText.split("");
    const originalChars = originalText.split("");
    let correct = 0;

    for (let i = 0; i < typedChars.length; i++) 
    {
        if (typedChars[i] === originalChars[i]) correct++;
    }

      return Math.round((correct / originalChars.length) * 100);
}

    // Button event listeners
    startBtn.addEventListener("click", startTest);
    stopBtn.addEventListener("click", endTest);

    // Clear data and reset UI
function clearData() 
{
    clearInterval(timerInterval);
    timer = 0;
    updateTimerDisplay();
    textInputElement.value = "";
    speedResult.textContent = "Speed: —";
    accuracyResult.textContent = "Accuracy: —";
}
}
});