document.getElementById('exploreBtn').addEventListener('click', function ()
{
    const cardsSection = document.getElementById('cardsSection');

    const pages = [
        { title: "Register now", link: "RegisterPage.html" },
        { title: "Load your personal transactions", link: "TransactionsPage.html" },
        { title: "Add new credit Card", link: "AddNewCardPage.html" },
        { title: "See Financial tips", link: "FinancialTipsPage.html" },
        { title: "Login to your account", link: "LoginPage.html" },
        { title: "See some statistics about yor payments", link: "MyPayments.html" }];

    cardsSection.innerHTML = '';

    // foreach loop to create the 6 cards
    pages.forEach(page =>
    {
        let card = document.createElement('div');
        card.classList.add('card');

        // create an <a> element for each card
        let cardLink = document.createElement('a');
        cardLink.href = page.link;
        cardLink.style.textDecoration = 'none';

        const cardTitle = document.createElement('h3');
        cardTitle.textContent = page.title;

        cardLink.appendChild(cardTitle);  // append the title to the link
        card.appendChild(cardLink);  // append the link to the card
        cardsSection.appendChild(card); // append the card to the cardSection div
    });
    cardsSection.style.visibility = 'visible';
});