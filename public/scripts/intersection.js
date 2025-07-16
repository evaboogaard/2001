const h1 = document.querySelector('.title h1');

const observer = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Use setTimeout to introduce a delay of 1000 milliseconds (1 second)
                setTimeout(() => {
                    h1.style.opacity = 1; // Make the h1 visible after the delay
                }, 1000);

                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.5 }
);

observer.observe(h1);

document.addEventListener('DOMContentLoaded', function () {
    const aiImage = document.getElementById('aiImage');
    // const aiImageOverlay = document.getElementById('aiImageOverlay');
    const aiImageScreen = document.getElementById('aiImageScreen');
    const aiImageTeams = document.getElementById('aiImageTeams');

    const picturePhoneSection = document.querySelector('.picture-phone');

    // Intersection Observer options
    const options = {
        root: null, // Use the viewport as the root
        rootMargin: '0px', // No margin around the root
        threshold: 0.5, // Trigger when 50% of the picture-phone section is visible
    };

    // Create an Intersection Observer
    const observer = new IntersectionObserver(handleIntersection, options);

    // Observe the picture-phone section
    observer.observe(picturePhoneSection);

    function handleIntersection(entries, observer) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // The picture-phone section is in view
                updateImageSrc();
                // Stop observing to avoid unnecessary updates
                observer.unobserve(picturePhoneSection);
            }
        });
    }

    function updateImageSrc() {
        // Update the img src attribute when the section is in view
        aiImage.src = 'img/ai-2.png';
        setTimeout(() => {
            aiImage.src = 'img/ai-3.png';
        }, 500); // Adjust the delay as needed
        setTimeout(() => {
            aiImage.src = 'img/ai-4.png';
        }, 1000); // Adjust the delay as needed
        setTimeout(() => {
            aiImage.src = 'img/ai-5.png';
        }, 1250); // Adjust the delay as needed
        setTimeout(() => {
            aiImage.src = 'img/ai-6.png';
        }, 1500); // Adjust the delay as needed
        setTimeout(() => {
            aiImage.src = 'img/ai-7.png';
        }, 1750); // Adjust the delay as needed
        setTimeout(() => {
            aiImage.src = 'img/ai-8.png';
        }, 2000); // Adjust the delay as needed
        setTimeout(() => {
            aiImage.src = 'img/ai-9.png';
        }, 2250); // Adjust the delay as needed

        setTimeout(() => {
            aiImage.src = 'img/ai-final.png';
        }, 2500); // Adjust the delay as needed
        // setTimeout(() => {
        //     aiImageOverlay.src = 'img/ai-overlay.png';
        // }, 2500);
        setTimeout(() => {
            aiImageScreen.src = 'img/ai-screen.png';
        }, 2500);
    }

    const teamsAudio = new Audio('audio/teams.mp3');

    aiImageScreen.addEventListener('click', () => {
        aiImageScreen.src = 'img/teams.png';
        teamsAudio.currentTime = 9;
        teamsAudio.play();

        setTimeout(() => {
            // aiImageOverlay.src = '';
            aiImageScreen.src = '';
            teamsAudio.pause();
            aiImage.src = 'img/ai-calling.png';
        }, 3400);
    });
});
