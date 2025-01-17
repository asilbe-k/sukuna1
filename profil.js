document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.getElementById('profileForm');
    const cardForm = document.getElementById('cardForm');
    const cardsContainer = document.getElementById('cardsContainer');

    profileForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const profileImage = document.getElementById('profileImage').files[0];

        const formData = new FormData();
        formData.append('name', name);
        formData.append('profileImage', profileImage);

        const response = await fetch('/api/profile', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        console.log(data);
    });

    cardForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const title = document.getElementById('cardTitle').value;
        const cardImage = document.getElementById('cardImage').files[0];

        const formData = new FormData();
        formData.append('title', title);
        formData.append('cardImage', cardImage);

        const response = await fetch('/api/cards', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        addCardToDOM(data);
    });

    function addCardToDOM(card) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.innerHTML = `
            <h3>${card.title}</h3>
            ${card.cardImage ? `<img src="${card.cardImage}" alt="Card Image">` : ''}
        `;
        cardsContainer.appendChild(cardElement);
    }
});
