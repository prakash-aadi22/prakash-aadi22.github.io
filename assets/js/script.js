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
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

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
  }, 3000);
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
}


// Get all the audio icon elements
const audioIcons = document.querySelectorAll(".audioIcon");

// Variable to track the currently playing audio
let currentlyPlayingAudio = null;

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
    } else {
      audioPlayer.pause();
      currentlyPlayingAudio = null; // Clear the currently playing audio
    }
  });

  // Change the icon while playing/paused
  audioPlayer.addEventListener("play", () => {
    audioIconImage.src = "./assets/images/equalizer3.gif"; // Change icon when playing
  });

  audioPlayer.addEventListener("pause", () => {
    audioIconImage.src = "./assets/images/icons8-audio-100.png"; // Revert back when paused
  });

  // Stop tracking if audio ends
  audioPlayer.addEventListener("ended", () => {
    currentlyPlayingAudio = null; // Clear the currently playing audio when it ends
    audioIconImage.src = "./assets/images/icons8-audio-100.png"; // Reset icon when audio ends
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
        audioIconImage.src = "./assets/images/icons8-audio-100.png";
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
        audioIconImage.src = "./assets/images/icons8-audio-100.png";
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
let currentLanguage = localStorage.getItem('currentLanguage') || 'english';

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

// Function to apply translations
function applyTranslations(translations) {
  document.querySelectorAll('[data-translate]').forEach(element => {
    let key = element.getAttribute('data-translate');
    // element.textContent = translations[key] || key; // Update text content
    // Handle placeholders for input and textarea
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      if (translations[key]) {
        element.setAttribute('placeholder', translations[key]);
      }
    } else {
      // Update text content for other elements
      if (translations[key]) {
        element.textContent = translations[key];
      }
    }
  });
}

// Function to get the currently active page from the nav
function getActivePageFromNav() {
  const activeLink = document.querySelector('.navbar-link.active');
  return activeLink ? activeLink.getAttribute('data-nav-link') : 'about'; // Default to 'about' if no active link
}

// Event listener for language switcher dropdown
document.getElementById('languageSwitcher').addEventListener('change', (event) => {
  currentLanguage = event.target.value; // Update the current language
  localStorage.setItem('currentLanguage', currentLanguage); // Save the selected language to localStorage
  loadLanguage(currentLanguage); // Load and apply the new language
});

// Load the default language and active page on page load
document.addEventListener('DOMContentLoaded', () => {
  loadLanguage(currentLanguage); // Load the language from localStorage or default
  showActivePage(getActivePageFromNav()); // Show the active page
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

function changeTheme() {
  const root = document.documentElement;
  const themeToggle = document.querySelector('.theme-link');
  const iconBox = document.querySelector('.theme-box ion-icon');

  // Check the current theme
  const isDarkTheme = localStorage.getItem('theme') === 'dark';

  if (isDarkTheme) {
    // Switch to light theme
    root.style.setProperty('--smoky-black', 'hsl(0, 0%, 98%)'); // Light background
    root.style.setProperty('--onyx', 'hsl(0, 0%, 84%)');
    root.style.setProperty('--eerie-black-1', 'hsl(0, 0%, 90%)');
    root.style.setProperty('--eerie-black-2', 'hsl(0, 0%, 85%)');
    root.style.setProperty('--text-color', 'hsl(0, 0%, 10%)');

    themeToggle.setAttribute('data-translate', 'Light');
    themeToggle.textContent = 'Light';
    iconBox.setAttribute('name', 'sunny-outline');

    // Save the theme in localStorage
    localStorage.setItem('theme', 'light');
  } else {
    // Switch to dark theme
    root.style.setProperty('--smoky-black', 'hsl(0, 0%, 7%)'); // Dark background
    root.style.setProperty('--onyx', 'hsl(240, 1%, 17%)');
    root.style.setProperty('--eerie-black-1', 'hsl(240, 2%, 13%)');
    root.style.setProperty('--eerie-black-2', 'hsl(240, 2%, 12%)');
    root.style.setProperty('--text-color', 'hsl(0, 0%, 98%)');

    themeToggle.setAttribute('data-translate', 'Dark');
    themeToggle.textContent = 'Dark';
    iconBox.setAttribute('name', 'moon-outline');

    // Save the theme in localStorage
    localStorage.setItem('theme', 'dark');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const themeToggle = document.querySelector('.theme-link');
  const iconBox = document.querySelector('.theme-box ion-icon');
  let savedTheme = localStorage.getItem('theme') || 'dark';  

  if (savedTheme === 'light') {
    // Apply light theme
    root.style.setProperty('--smoky-black', 'hsl(0, 0%, 98%)'); // Light background
    root.style.setProperty('--onyx', 'hsl(0, 0%, 84%)');
    root.style.setProperty('--eerie-black-1', 'hsl(0, 0%, 90%)');
    root.style.setProperty('--eerie-black-2', 'hsl(0, 0%, 85%)');
    root.style.setProperty('--text-color', 'hsl(0, 0%, 10%)');

    themeToggle.setAttribute('data-translate', 'Light');
    themeToggle.textContent = 'Light';
    iconBox.setAttribute('name', 'sunny-outline');
  } else {
    // Set theme to localStorage
    localStorage.setItem('theme', 'dark');

    // Apply dark theme
    root.style.setProperty('--smoky-black', 'hsl(0, 0%, 7%)'); // Dark background
    root.style.setProperty('--onyx', 'hsl(240, 1%, 17%)');
    root.style.setProperty('--eerie-black-1', 'hsl(240, 2%, 13%)');
    root.style.setProperty('--eerie-black-2', 'hsl(240, 2%, 12%)');
    root.style.setProperty('--text-color', 'hsl(0, 0%, 98%)');

    themeToggle.setAttribute('data-translate', 'Dark');
    themeToggle.textContent = 'Dark';
    iconBox.setAttribute('name', 'moon-outline');
  }
});
