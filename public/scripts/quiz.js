document
    .querySelector('#quiz-container button')
    .addEventListener('click', () => {
        var options = document.getElementsByName('quiz-option');
        var resultText = document.getElementById('result');
        var quizContainer = document.getElementById('quiz-container');
        var ultimateTripCard = document.querySelector('.ultimate-trip');

        for (var i = 0; i < options.length; i++) {
            if (options[i].checked && options[i].value === 'all') {
                resultText.innerHTML = 'Correct! All of the above.';
                resultText.className = 'correct';
                ultimateTripCard.classList.add('correct');
                ultimateTripCard.classList.remove('wrong');
                resultText.style.display = 'block';
                document
                    .querySelector('.ultimate-trip.none')
                    .classList.add('show');
            } else {
                ultimateTripCard.classList.add('wrong');
            }
        }
    });
