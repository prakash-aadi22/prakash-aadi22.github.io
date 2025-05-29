"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector(
      "[data-testimonials-title]"
    ).innerHTML;
    modalText.innerHTML = this.querySelector(
      "[data-testimonials-text]"
    ).innerHTML;

    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const selectProject = document.querySelector("[data-select-project]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

selectProject.addEventListener("click", function () {
  elementToggleFunc(this);
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    // elementToggleFunc(select);
    elementToggleFunc(selectProject);
    // filterFunc(selectedValue);
    filterFuncForProject(selectedValue);
  });
}

// filter variables
// const filterItems = document.querySelectorAll("[data-filter-item]");
// const filterFunc = function (selectedValue) {
//   for (let i = 0; i < filterItems.length; i++) {
//     if (selectedValue === "all") {
//       filterItems[i].classList.add("active");
//     } else if (selectedValue === filterItems[i].dataset.category) {
//       filterItems[i].classList.add("active");
//     } else {
//       filterItems[i].classList.remove("active");
//     }
//   }
// };

// filter Project
const filterProject = document.querySelectorAll("[data-filter-project]");
const filterFuncForProject = function (selectedValue) {
  for (let i = 0; i < filterProject.length; i++) {
    if (selectedValue === "all") {
      filterProject[i].classList.add("active");
    } else if (selectedValue === filterProject[i].dataset.category) {
      filterProject[i].classList.add("active");
    } else {
      filterProject[i].classList.remove("active");
    }
  }
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];
for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    // filterFunc(selectedValue);
    filterFuncForProject(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// Name Validation
function validateName() {
  let nameInput = document.getElementById('fullName');
  let name = nameInput.value.trim(); // Get trimmed input value

  if (name.length > 50) {
    nameInput.style.border = "1px solid var(--bittersweet-shimmer)"; // Apply red border
  } else if (name.length <= 0) {
    nameInput.style.border = ""; // Rest border
  } else {
    nameInput.style.border = "1px solid var(--orange-yellow-crayola)"; // Apply yellow border
  }
}

// Email Validation
function validateEmail() {
  let emailInput = document.getElementById('email');
  let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,10}$/;

  if (emailInput.value && !emailRegex.test(emailInput.value)) {
    emailInput.style.border = "1px solid var(--bittersweet-shimmer)"; // Highlight input border in red
  } else if (emailInput.value == "") {
    emailInput.style.border = ""; // Rest border
  } else {
    emailInput.style.border = "1px solid var(--orange-yellow-crayola)"; // Highlight input border in yellow
  }
}

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// Add event to all form input fields to enable/disable the submit button
formInputs.forEach((input) => {
  input.addEventListener("input", () => {
    formBtn.disabled = !form.checkValidity();
  });
});

// Function to show the success message
const showSuccessMessage = () => {
  const successMessage = document.createElement("div");
  successMessage.className = "success-message";
  successMessage.textContent = "Message sent successfully";
  document.body.appendChild(successMessage);
  setTimeout(() => {
    successMessage.remove();
  }, 3000);
};

// Add submit event to the form
form.addEventListener("submit", (event) => {
  event.preventDefault();

  let nameInput = document.getElementById('fullName');
  let emailInput = document.getElementById('email');
  nameInput.style.border = ""; // Rest border
  emailInput.style.border = ""; // Rest border

  // Collect form data
  const formData = new FormData(form);
  const fullName = formData.get("fullName");
  const email = formData.get("email");
  const message = formData.get("message");

  // Construct mailto link
  const subject = `New message from ${fullName}`;
  const body = `Full Name: ${fullName}\nEmail: ${email}\nMessage: ${message}`;
  const mailtoLink = `mailto:aditya.ap2209@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  // Redirect to mailto link
  window.location.href = mailtoLink;

  showSuccessMessage();
  form.reset();
  formBtn.disabled = true;
});

// Function to show the copied message
const showCopiedMessage = () => {
  const successMessage = document.createElement("div");
  successMessage.className = "success-message";
  successMessage.textContent = "Email Id copied successfully";
  document.body.appendChild(successMessage);
  setTimeout(() => {
    successMessage.remove();
  }, 2000);
};

function copyToClipboard() {
  const tempInput = document.createElement("input");
  tempInput.value = "aditya.ap2209@gmail.com";
  document.body.appendChild(tempInput);

  tempInput.select();
  tempInput.setSelectionRange(0, 99999);
  document.execCommand("copy");

  document.body.removeChild(tempInput);

  showCopiedMessage();

  const icon = document.getElementById("emailId-icon");
  icon.setAttribute("name", "checkmark-done-outline");

  setTimeout(() => {
    icon.setAttribute("name", "clipboard-outline");
  }, 1500);
}


// Get all the audio icon elements
const audioIcons = document.querySelectorAll(".audioIcon");

// Variable to track the currently playing audio
let currentlyPlayingAudio = null;

// Background music
const musciToggle = document.querySelector('.music-toggle');

let backgroundMusic = new Audio();
backgroundMusic.src = "./assets/music/background-music.mp3";
backgroundMusic.loop = true;

// const validThemes = [
//   "dark-theme",
//   "light-theme",
//   "oceanic-theme",
//   "sunset-theme",
//   "lavender-theme",
//   "forest-theme",
//   "coffee-theme",
//   "aqua-theme",
//   "golden-hour-theme"
// ];

// // Mapping each theme to a specific music file
// const themeMusicMap = {
//   "dark-theme": "./assets/music/background-music.mp3",
//   "light-theme": "./assets/music/background-music.mp3",
//   "oceanic-theme": "./assets/music/background-music.mp3",
//   "sunset-theme": "./assets/music/lo-fi-chill-saxophone.mp3",
//   "lavender-theme": "./assets/music/background-music.mp3",
//   "forest-theme": "./assets/music/background-music.mp3",
//   "coffee-theme": "./assets/music/background-music.mp3",
//   "aqua-theme": "./assets/music/background-music.mp3",
//   "golden-hour-theme": "./assets/music/background-music.mp3"
// };

// // Get selected theme from localStorage
// const selectedTheme = localStorage.getItem("theme");

// // Check if the selected theme is valid and update the music source
// if (validThemes.includes(selectedTheme)) {
//   backgroundMusic.src = themeMusicMap[selectedTheme];
// } else {
//   // Fallback music
//   backgroundMusic.src = "./assets/music/background-music.mp3";
// }


let wasBackgroundPlaying = false;

musciToggle.addEventListener('click', () => {
  const isOn = musciToggle.classList.toggle('active');
  if (isOn) {
    backgroundMusic.play();
  } else {
    backgroundMusic.pause();
  }
});

['mouseenter', 'mouseleave'].forEach(evt =>
  musciToggle.addEventListener(evt, () => {
    if (musciToggle.classList.contains('active')) {
      document.querySelectorAll('.eq-bar')
        .forEach(bar => bar.style.transition = 'height 0.2s ease');
    }
  })
);

// Add event listeners to each icon
audioIcons.forEach((icon) => {
  const audioId = icon.closest(".audio-icon").getAttribute("data-audio-id"); // Get the unique audio ID from the closest parent
  const audioPlayer = document.querySelector(`audio[data-audio-id="${audioId}"]`);
  const audioIconImage = icon; // Direct reference to the image element inside the audio icon

  icon.addEventListener("click", () => {
    // If there is an audio playing and it's not the current one, pause it
    if (currentlyPlayingAudio && currentlyPlayingAudio !== audioPlayer) {
      currentlyPlayingAudio.currentTime = 0; // Reset to the beginning
      currentlyPlayingAudio.pause(); // Pause it
    }

    // Play or pause the current audio
    if (audioPlayer.paused) {
      audioPlayer.play();
      currentlyPlayingAudio = audioPlayer; // Update the currently playing audio

      // pause the background track if it’s on
      if (!backgroundMusic.paused) {
        backgroundMusic.pause();
        wasBackgroundPlaying = true;
        musciToggle.classList.remove("active");
      }
    } else {
      audioPlayer.pause();
      currentlyPlayingAudio = null; // Clear the currently playing audio

      // on manual pause, restore BG if needed
      if (wasBackgroundPlaying) {
        backgroundMusic.play();
        wasBackgroundPlaying = false;
        musciToggle.classList.add("active");
      }
    }
  });

  // Change the icon while playing/paused
  audioPlayer.addEventListener("play", () => {
    audioIconImage.src = "./assets/images/equalizer3.gif"; // Change icon when playing
  });

  audioPlayer.addEventListener("pause", () => {
    audioIconImage.src = "./assets/images/audio-icon.png"; // Revert back when paused
  });

  // Stop tracking if audio ends
  audioPlayer.addEventListener("ended", () => {
    currentlyPlayingAudio = null; // Clear the currently playing audio when it ends
    audioIconImage.src = "./assets/images/audio-icon.png"; // Reset icon when audio ends

    // play the background track
    if (wasBackgroundPlaying) {
      backgroundMusic.play();
      wasBackgroundPlaying = false;
      musciToggle.classList.add("active");
    }
  });
});

// Get all navbar links
const navbarLinks = document.querySelectorAll(".navbar-link");

// Add click event listener to each navbar link
navbarLinks.forEach((link) => {
  link.addEventListener("click", () => {
    // If there is currently playing audio, stop and reset it
    if (currentlyPlayingAudio) {
      currentlyPlayingAudio.pause();
      currentlyPlayingAudio.currentTime = 0;

      // Reset the icon to default
      const audioIconImage = document.querySelector(`img[data-audio-id="${currentlyPlayingAudio.getAttribute("data-audio-id")}"]`);
      if (audioIconImage) {
        audioIconImage.src = "./assets/images/audio-icon.png";
      }

      // Clear the currently playing audio
      currentlyPlayingAudio = null;
    }
  });
});

const testimonials = document.querySelectorAll(".testimonials-item");
testimonials.forEach((link) => {
  link.addEventListener("click", () => {
    // If there is currently playing audio, stop and reset it
    if (currentlyPlayingAudio) {
      currentlyPlayingAudio.pause();
      currentlyPlayingAudio.currentTime = 0;

      // Reset the icon to default
      const audioIconImage = document.querySelector(`img[data-audio-id="${currentlyPlayingAudio.getAttribute("data-audio-id")}"]`);
      if (audioIconImage) {
        audioIconImage.src = "./assets/images/audio-icon.png";
      }

      // Clear the currently playing audio
      currentlyPlayingAudio = null;
    }
  });
});

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Function to show the active page
function showActivePage(targetPage) {
  // Loop through pages and set active
  pages.forEach(page => {
    if (page.dataset.page === targetPage) {
      page.classList.add("active");
    } else {
      page.classList.remove("active");
    }
  });

  // Loop through nav links and set active
  navigationLinks.forEach(link => {
    if (link.getAttribute('data-nav-link') === targetPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  window.scrollTo(0, 0); // Scroll to the top of the page
}

// Add event to all nav links
navigationLinks.forEach(link => {
  link.addEventListener("click", function () {
    const targetPage = this.getAttribute('data-nav-link');
    showActivePage(targetPage);
  });
});

// Default to 'english' if no language is stored in localStorage
const validLanguage = [
  "english",
  "hindi",
  "french",
  "spanish",
  "italian",
  "russian",
  "bengali",
  "mandarin",
  "arabic",
  "portuguese",
  "german",
  "marathi",
  "tamil",
  "telugu",
  "kannada",
  "gujarati",
  "odia",
  "malayalam",
  "punjabi",
  "assamese",
  "sanskrit",
  "japanese",
  "korean",
  "vietnamese",
];

let currentLanguage = localStorage.getItem("currentLanguage");

if (!validLanguage.includes(currentLanguage)) {
  localStorage.removeItem("currentLanguage");
  currentLanguage = "english";
  localStorage.setItem("currentLanguage", currentLanguage);
}

localStorage.setItem('currentLanguage', currentLanguage);

let texts = [];

function updateSelectedLanguageDisplay(languageValue) {
  const selectedOption = document.querySelector(`#languageSwitcher .option[data-value="${languageValue}"]`);
  const flagSrc = selectedOption.getAttribute("data-flag");
  const languageName = selectedOption.querySelector("span").textContent;

  const selectedLanguageDisplay = document.getElementById("selectedLanguageDisplay");
  selectedLanguageDisplay.querySelector("img").src = flagSrc;
  selectedLanguageDisplay.querySelector("img").alt = `${languageName} Flag`;
  selectedLanguageDisplay.querySelector("span").textContent = languageName;
}

// Function to load language data
function loadLanguage(language) {
  const url = `assets/languages/${language}.json`;

  fetch(url)
    .then(response => {
      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }
      return response.json();
    })
    .then(data => {
      applyTranslations(data);
      showActivePage(getActivePageFromNav()); // Show the active page after language change
    })
    .catch(error => console.error('Error loading language file!'));
}

// Map country -> default language
const countryLanguageMap = {
  "United States": "english",
  "United Kingdom": "english",
  "France": "french",
  "Spain": "spanish",
  "Italy": "italian",
  "Russia": "russian",
  "Bangladesh": "bengali",
  "China": "mandarin",
  "Saudi Arabia": "arabic",
  "Portugal": "portuguese",
  "Germany": "german",
  "Japan": "japanese",
  "South Korea": "korean",
  "Vietnam": "vietnamese"
};

// Map Indian region/state -> language
const regionLanguageMap = {
  "Andhra Pradesh": "telugu",
  "Arunachal Pradesh": "hindi",
  "Assam": "assamese",
  "Bihar": "hindi",
  "Chhattisgarh": "hindi",
  "Goa": "marathi",
  "Gujarat": "gujarati",
  "Haryana": "hindi",
  "Himachal Pradesh": "hindi",
  "Jharkhand": "hindi",
  "Karnataka": "kannada",
  "Kerala": "malayalam",
  "Madhya Pradesh": "hindi",
  "Maharashtra": "marathi",
  "Manipur": "hindi",
  "Meghalaya": "hindi",
  "Mizoram": "hindi",
  "Nagaland": "hindi",
  "Odisha": "odia",
  "Punjab": "punjabi",
  "Rajasthan": "hindi",
  "Sikkim": "hindi",
  "Tamil Nadu": "tamil",
  "Telangana": "telugu",
  "Tripura": "bengali",
  "Uttar Pradesh": "hindi",
  "Uttarakhand": "hindi",
  "West Bengal": "bengali",
};

fetch('https://freeipapi.com/api/json')
  .then(response => response.json())
  .then(data => {
    const country = data.countryName;
    const region = data.regionName;

    let detectedLanguage;

    if (country === "India") {
      // Try region-specific, else fallback to Hindi
      detectedLanguage = regionLanguageMap[region] || "hindi";
    } else {
      detectedLanguage = countryLanguageMap[country];
    }

    // If we got a valid language, apply it
    if (validLanguage.includes(detectedLanguage)) {
      localStorage.setItem("currentLanguage", detectedLanguage);
      updateSelectedLanguageDisplay(detectedLanguage);
      loadLanguage(detectedLanguage);

      // Show disclaimer message if not English
      if (detectedLanguage !== "english") {
        showDisclaimer("Please note: Translations contents are AI-generated and might contain inaccuracies.");
      } else {
        const disclaimer = document.getElementById("language-disclaimer");
        if (disclaimer) {
          disclaimer.remove();
        }
      }
    } else {
      // No mapping found — keep whatever's in localStorage (or your default)
      console.log(`Currently language not available for ${country}${country === "India" ? " / " + region : ""}.`);
    }

  })
  .catch(error => {
    console.error('Error fetching IP info:', error);
  });

// Function to apply translations
function applyTranslations(translations) {
  document.querySelectorAll('[data-translate]').forEach(element => {
    let key = element.getAttribute('data-translate');

    // For optgroup elements, update only the optgroup-label child if it exists
    if (element.classList.contains('optgroup')) {
      const labelElement = element.querySelector('.optgroup-label');
      if (labelElement && translations[key]) {
        labelElement.textContent = translations[key];
      }
      // Exit early so that child option elements are not removed.
      return;
    }

    // Update the texts array with new language data
    texts = translations.texts; // Fetch texts for the current language

    // Handle placeholders for input and textarea
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      if (translations[key]) {
        element.setAttribute('placeholder', translations[key]);
      }
    } else {
      // Update text content for other elements
      if (translations[key]) {
        element.textContent = translations[key];
        element.innerHTML = translations[key]; // Update the content, allowing HTML elements like <span>
      }
    }
  });

  resetTypingEffect();
  typeEffect();
}

// valid intro language
const languagesWithIntroAudio = [
  "arabic",
  "english",
  "french",
  "german",
  "hindi",
  "italian",
  "japanese",
  "mandarin",
  "portuguese",
  "russian",
  "spanish",
];

// aboutMeIntro <audio> from currentLanguage, shows it if the file loads, or hides it on error (404).
function setIntroAudio() {
  const introWrapper = document.querySelector('.audio-icon.aboutMeIntro');
  if (!introWrapper) return;

  // if this language has no intro-audio file, hide and exit
  if (!languagesWithIntroAudio.includes(currentLanguage)) {
    introWrapper.style.display = 'none';
    const audioEl = introWrapper.querySelector('audio.audioPlayer');
    if (audioEl) {
      audioEl.removeAttribute('src');
    }
    return;
  }

  const baseName = `${currentLanguage}-intro`;      // e.g. "french-intro"
  const url = `./assets/audio/${baseName}.mp3`;
  const audioEl = introWrapper.querySelector('audio.audioPlayer');

  // clear any old handlers
  audioEl.onloadedmetadata = null;
  audioEl.onerror = null;

  // if it loads metadata, it exists → show & wire up IDs
  audioEl.onloadedmetadata = () => {
    introWrapper.style.display = '';
    introWrapper.dataset.audioId = baseName;
    audioEl.dataset.audioId = baseName;
  };

  // if it errors (e.g. 404) → hide & clear src
  audioEl.onerror = () => {
    introWrapper.style.display = 'none';
    audioEl.removeAttribute('src');
  };

  // trigger a metadata-only load
  audioEl.preload = 'metadata';
  audioEl.src = url;
  audioEl.load();
}

function resetAllAudioIcons() {
  // if one clip is mid-play, stop it
  if (currentlyPlayingAudio) {
    currentlyPlayingAudio.pause();
    currentlyPlayingAudio.currentTime = 0;
    currentlyPlayingAudio = null;
  }
  // force every little speaker back to the “static” icon
  document.querySelectorAll(".audioIcon").forEach(img => {
    img.src = "./assets/images/audio-icon.png";
  });
}

// Function to get the currently active page from the nav
function getActivePageFromNav() {
  const activeLink = document.querySelector('.navbar-link.active');
  return activeLink ? activeLink.getAttribute('data-nav-link') : 'about'; // Default to 'about' if no active link
}

// Divder for language dropdown
document.querySelectorAll('.optgroup').forEach(group => {
  const label = group.getAttribute('data-label');
  if (label) {
    const labelElement = document.createElement('div');
    labelElement.className = 'optgroup-label';
    labelElement.textContent = label;
    group.prepend(labelElement);
  }
});

// Add click event listeners to each custom option
document.querySelectorAll("#languageSwitcher .option").forEach((option) => {
  option.addEventListener("click", function () {
    currentLanguage = this.getAttribute("data-value");
    localStorage.setItem("currentLanguage", currentLanguage);

    updateSelectedLanguageDisplay(currentLanguage);
    loadLanguage(currentLanguage); // Load and apply the new language

    // intro <audio> updates immediately
    setIntroAudio();
    resetAllAudioIcons();   // ← pause & reset *all* icons back to the default

    // Close the dropdown after selection
    languageSwitcherDiv.classList.remove("active");

    // Show disclaimer message if not English
    if (currentLanguage !== "english") {
      showDisclaimer("Please note: Translations contents are AI-generated and might contain inaccuracies.");
    } else {
      const disclaimer = document.getElementById("language-disclaimer");
      if (disclaimer) {
        disclaimer.remove();
      }
    }
  });
});

// Load the default language and active page on page load
document.addEventListener('DOMContentLoaded', () => {
  // Set the dropdown to the stored language or default
  const languageSwitcher = document.getElementById('languageSwitcher');
  languageSwitcher.value = currentLanguage; // Sync the dropdown with localStorage

  showActivePage(getActivePageFromNav()); // Show the active page
  updateSelectedLanguageDisplay(currentLanguage);
  loadLanguage(currentLanguage); // Load the language from localStorage or default
  setIntroAudio();              // make sure intro is wired up on initial load!
  resetAllAudioIcons();   // ← pause & reset *all* icons back to the default
});

// Language dropdown switcher logic 
const languageSwitcher = document.getElementById('languageSwitcher');
const languageSwitcherDiv = document.querySelector('.language-switcher');
const languageIcon = document.querySelector(".language-icon");

// Toggle the visibility of the dropdown when the icon is clicked
document.querySelector('.language-icon').addEventListener('click', function (event) {
  event.stopPropagation(); // Prevent the click from propagating to the document
  languageSwitcherDiv.classList.toggle('active');
});

// Close the dropdown when a language is selected
languageSwitcher.addEventListener('change', function () {
  languageSwitcherDiv.classList.remove('active');
});

// Close the dropdown when clicking anywhere else on the screen
document.addEventListener('click', function (event) {
  if (!languageSwitcherDiv.contains(event.target)) {
    languageSwitcherDiv.classList.remove('active');
  }
});

// Add 'dropdown-open' class when dropdown is focused
languageSwitcher.addEventListener("focus", () => {
  languageIcon.classList.add("dropdown-open");
});

// Remove 'dropdown-open' class when dropdown loses focus
languageSwitcher.addEventListener("blur", () => {
  languageIcon.classList.remove("dropdown-open");
});

// Toggle the dropdown on clicking the selected theme
function toggleThemeDropdown(event) {
  event.stopPropagation(); // Prevents immediate closure when clicking inside
  const dropdown = document.getElementById("themeDropdown");
  dropdown.classList.toggle("open");
}

// Close dropdown if user clicks anywhere else on the page
document.addEventListener("click", function () {
  const dropdown = document.getElementById("themeDropdown");
  dropdown.classList.remove("open");
});

// Apply a chosen theme
function selectTheme(theme) {
  const body = document.body;
  const themeIcon = document.querySelector(".theme-box ion-icon");
  const themeIconImg = document.querySelector(".theme-icons-img");
  const themeNameSpan = document.querySelector(".theme-name");

  // Possible icons for each theme
  const themeIcons = {
    "dark-theme": "moon-outline",
    "light-theme": "sunny-outline",
    "oceanic-theme": "boat-outline",
    "sunset-theme": "partly-sunny-outline",
    "lavender-theme": "flower-outline",
    "forest-theme": "leaf-outline",
    "coffee-theme": "cafe-outline",
    "aqua-theme": "water-outline",
    "golden-hour-theme": "contrast-outline",
  };

  const themeIconsImg = {
    "dark-theme": "./assets/theme/dark-theme.png",
    "light-theme": "./assets/theme/light-theme.png",
    "oceanic-theme": "./assets/theme/oceanic-theme.png",
    "sunset-theme": "./assets/theme/sunset-theme.png",
    "lavender-theme": "./assets/theme/lavender-theme.png",
    "forest-theme": "./assets/theme/forest-theme.png",
    "coffee-theme": "./assets/theme/coffee-theme.png",
    "aqua-theme": "./assets/theme/aqua-theme.png",
    "golden-hour-theme": "./assets/theme/golden-hour-theme.png",
  };

  // Theme translations (Modify these according to your language setup)
  const themeTranslations = {
    "dark-theme": "Dark",
    "light-theme": "Light",
    "oceanic-theme": "Oceanic",
    "sunset-theme": "Sunset",
    "lavender-theme": "Lavender",
    "forest-theme": "Forest",
    "coffee-theme": "Coffee",
    "aqua-theme": "Aqua",
    "golden-hour-theme": "Golden Hour",
  };

  // Remove all themes and add the new one
  body.classList.remove("dark-theme", "light-theme", "oceanic-theme", "sunset-theme", "lavender-theme", "forest-theme", "coffee-theme", "aqua-theme", "golden-hour-theme");
  body.classList.add(theme);

  // Update icon and text
  themeIcon.setAttribute("name", themeIcons[theme]);
  themeIconImg.setAttribute("src", themeIconsImg[theme]);
  themeNameSpan.textContent = themeTranslations[theme]; // Change text
  themeNameSpan.setAttribute("data-translate", themeTranslations[theme]); // Change data-translate

  // Save theme preference
  localStorage.setItem("theme", theme);

  // Change Language
  let selectedLanguage = localStorage.getItem('currentLanguage') ?? 'english';
  loadLanguage(selectedLanguage);

  disableTransitionDuringThemeChange();
}

function disableTransitionDuringThemeChange() {
  document.body.classList.add("no-transition");

  setTimeout(() => {
    document.body.classList.remove("no-transition");
  }, 500);
}

// On page load, apply the saved theme or default to dark-theme
document.addEventListener('DOMContentLoaded', () => {
  const validThemes = [
    "dark-theme",
    "light-theme",
    "oceanic-theme",
    "sunset-theme",
    "lavender-theme",
    "forest-theme",
    "coffee-theme",
    "aqua-theme",
    "golden-hour-theme"
  ];

  let savedTheme = localStorage.getItem("theme");

  if (!validThemes.includes(savedTheme)) {
    localStorage.removeItem("theme");
    savedTheme = "dark-theme";
    localStorage.setItem("theme", savedTheme);
  }

  localStorage.setItem('theme', savedTheme);

  document.body.classList.add(savedTheme);

  // Update icon and text
  const themeIcon = document.querySelector(".theme-box ion-icon");
  const themeIconImg = document.querySelector(".theme-icons-img");
  const themeNameSpan = document.querySelector(".theme-name");

  const themeIcons = {
    "dark-theme": "moon-outline",
    "light-theme": "sunny-outline",
    "oceanic-theme": "boat-outline",
    "sunset-theme": "partly-sunny-outline",
    "lavender-theme": "flower-outline",
    "forest-theme": "leaf-outline",
    "coffee-theme": "cafe-outline",
    "aqua-theme": "water-outline",
    "golden-hour-theme": "contrast-outline",
  };

  const themeIconsImg = {
    "dark-theme": "./assets/theme/dark-theme.png",
    "light-theme": "./assets/theme/light-theme.png",
    "oceanic-theme": "./assets/theme/oceanic-theme.png",
    "sunset-theme": "./assets/theme/sunset-theme.png",
    "lavender-theme": "./assets/theme/lavender-theme.png",
    "forest-theme": "./assets/theme/forest-theme.png",
    "coffee-theme": "./assets/theme/coffee-theme.png",
    "aqua-theme": "./assets/theme/aqua-theme.png",
    "golden-hour-theme": "./assets/theme/golden-hour-theme.png",
  };

  const themeTranslations = {
    "dark-theme": "Dark",
    "light-theme": "Light",
    "oceanic-theme": "Oceanic",
    "sunset-theme": "Sunset",
    "lavender-theme": "Lavender",
    "forest-theme": "Forest",
    "coffee-theme": "Coffee",
    "aqua-theme": "Aqua",
    "golden-hour-theme": "Golden Hour",
  };

  themeIcon.setAttribute("name", themeIcons[savedTheme]);
  themeIconImg.setAttribute("src", themeIconsImg[savedTheme]);
  themeNameSpan.textContent = themeTranslations[savedTheme];
  themeNameSpan.setAttribute("data-translate", themeTranslations[savedTheme]);

  // Change Language
  let selectedLanguage = localStorage.getItem('currentLanguage') ?? 'english';
  loadLanguage(selectedLanguage);

  disableTransitionDuringThemeChange();
});

// Typing Effect
function getArticle(word) {
  if (typeof word !== 'string' || word.length === 0) {
    return ''; // Return an empty string or default article if word is not valid
  }

  const firstLetter = word[0].toLowerCase();
  return ['a', 'e', 'i', 'o', 'u'].includes(firstLetter) ? 'an' : 'a';
}

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout;

function typeEffect() {
  const typingElement = document.querySelector("#typing-text");
  let currentText = texts[textIndex];

  if (currentLanguage == "english") {
    const article = getArticle(currentText);  // Get the correct article (a/an)
    // Assuming you're inserting the article dynamically as well
    currentText = `${article} ${currentText}`;
  }

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typingElement.innerHTML = currentText.substring(0, charIndex);

  let typingSpeed = isDeleting ? 50 : 100; // Typing speed

  if (!isDeleting && charIndex === currentText.length) {
    typingSpeed = 1500; // Pause before deleting
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
  }

  typingTimeout = setTimeout(typeEffect, typingSpeed); // Store the timeout ID
}

// Reset typing effect state
function resetTypingEffect() {
  clearTimeout(typingTimeout); // Clear the previous timeout
  textIndex = 0;
  charIndex = 0;
  isDeleting = false;
  const typingElement = document.querySelector("#typing-text");
  if (typingElement) {
    typingElement.innerHTML = ''; // Clear the current text
  }
}

// Disclaimer
function showDisclaimer(message) {
  // Remove existing disclaimer if any
  const existingDisclaimer = document.getElementById("language-disclaimer");
  if (existingDisclaimer) {
    existingDisclaimer.remove();
  }

  const disclaimer = document.createElement('div');
  disclaimer.textContent = message;
  disclaimer.id = "language-disclaimer";

  document.body.appendChild(disclaimer);

  // Remove disclaimer when clicked
  disclaimer.addEventListener('click', () => {
    disclaimer.remove();
  });

  // Remove after 5 seconds
  setTimeout(() => {
    disclaimer.remove();
  }, 5000);
}
