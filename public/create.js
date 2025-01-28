const flashCardForm = document.querySelector('.flashcard-form');

flashCardForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(flashCardForm);
    const originalWord = formData.get('question');
    const translatedWord = formData.get('answer');
    const response = await fetch('/words', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ originalWord, translatedWord }),
    });

    if (response.ok) {
        flashCardForm.reset();
        alert('Flashcard created successfully!');
        window.location.href = '/learn';
    } else {
        const errorMessage = await response.text();
        alert(errorMessage);
    }
});
