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

                    if (index !== 0) {
                        flashCardDiv.classList.add('hidden');
                    }

                    flashcardContainer.append(flashCardDiv);
                });

                updateFlashcardVisibility();
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
        flashcard.classList.add('hidden');
        if (index === currentCard) {
            flashcard.classList.remove('hidden');
        }
    });
}

// function
