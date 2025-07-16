let bg = document.getElementById('hill1');
let sun = document.getElementById('hill2');
let monolith = document.getElementById('hill3');
let moon = document.getElementById('hill4');

const parent = document.querySelector('.parent');

// Set initial position
sun.style.top = '20rem';
monolith.style.top = '15rem';

parent.addEventListener('scroll', () => {
    let value = parent.scrollTop;

    // Calculate new position based on scroll with slower multipliers
    sun.style.top = 22 - value * 0.07 + 'rem'; // Adjusted multiplier for slower sun movement
    monolith.style.top = 15 - value * 0.01 + 'rem'; // Adjusted multiplier for slower monolith movement
    moon.style.top = value * 0.012 + 'rem';

    // Adjust background position for a very slow scroll
    let bgScrollFraction = 0.0005; // Experiment with different values for the desired speed
    bg.style.backgroundPositionY = value * bgScrollFraction + 'px';
});
