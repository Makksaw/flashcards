const flashcardContainer = document.querySelector('.flashcard-container');
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');

let currentCard = 0;

async function getFlashcards() {
    await fetch('/words')
        .then((res) => res.json())
        .then((data) => {
            if (data.words.length > 0) {
                data.words.forEach((word, index) => {
                    const { originalWord, translatedWord } = word;
                    let flashCardDiv = document.createElement('div');
                    flashCardDiv.classList.add('flashcard', 'hidden');
                    flashCardDiv.innerHTML += `
                        <div class="front">${originalWord}</div>
                        <div class="back">${translatedWord}</div>
                    `;

                    if (index === 0) {
                        flashCardDiv.classList.remove('hidden');
                    }

                    flashcardContainer.append(flashCardDiv);
                });

                updateNavigationButton();
            } else {
                const noCardsDiv = document.createElement('div');
                noCardsDiv.classList.add('no-cards');
                noCardsDiv.innerHTML = 'No flashcards available';
                flashcardContainer.appendChild(noCardsDiv);
                nextButton.disabled = true;
                prevButton.disabled = true;
            }
        });
}

getFlashcards();

flashcardContainer.addEventListener('click', (e) => {
    if (e.target.closest('.flashcard')) {
        e.target.closest('.flashcard').classList.toggle('flipped');
    }
});

function updateFlashcardVisibility() {
    const flashcards = document.querySelectorAll('.flashcard');
    flashcards.forEach((flashcard, index) => {
        if (index === currentCard) {
            flashcard.classList.remove('hidden');
        } else {
            flashcard.classList.add('hidden');
        }
    });
}

function updateNavigationButton() {
    if (currentCard === 0) {
        prevButton.disabled = true;
    } else {
        prevButton.disabled = false;
    }

    if (currentCard === document.querySelectorAll('.flashcard').length - 1) {
        nextButton.disabled = true;
    } else {
        nextButton.disabled = false;
    }
}

nextButton.addEventListener('click', () => {
    currentCard++;
    updateFlashcardVisibility();
    updateNavigationButton();
});

prevButton.addEventListener('click', () => {
    currentCard--;
    updateFlashcardVisibility();
    updateNavigationButton();
});
