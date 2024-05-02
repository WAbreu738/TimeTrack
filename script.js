window.addEventListener('load', function() {
  const line = document.querySelector('.line');
  const sections = document.querySelectorAll('.section');
  const halfWindowHeight = window.innerHeight / 2;

  function showSection(section) {
    const top = section.getBoundingClientRect().top;
    if (top <= halfWindowHeight) {
      section.classList.add('show-me');
    }
  }

  function handleScroll() {
    sections.forEach(section => {
      showSection(section);
    });
  }

  function showLine() {
    line.style.display = 'block';
  }

  showLine(); // Initially show line
  handleScroll(); // Initially handle scroll

  window.addEventListener('scroll', handleScroll);

  // Moved toggleMenu related code here
  const toggleMenu = document.querySelector('#toggleMenu');
  toggleMenu.addEventListener('click', () => {
    toggleMenu.classList.toggle('hamburger-toggle');
    handleScroll();
  });
});

// Get all the sections
const sections = document.querySelectorAll('.section');
// Index to track the current section
let currentIndex = 0;

// Function to show the current section
function showSection(index) {
    sections.forEach((section, i) => {
        if (i === index) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
}

// Initial call to show the first section
showSection(currentIndex);

// Event listener for the "Read More" button
document.querySelectorAll('.read-more-btn').forEach((btn, index) => {
    btn.addEventListener('click', () => {
        currentIndex = index + 1; // Move to the next section
        if (currentIndex >= sections.length) {
            currentIndex = 0; // Loop back to the first section
        }
        showSection(currentIndex);
    });
});
