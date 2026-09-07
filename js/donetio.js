function handleDonation(event) {
    const card = event.currentTarget.closest('[data-campaign]');
    const input = card.querySelector('input[type="number"]');
    const amountText = card.querySelector('p');
    const balanceText = document.querySelector('#balance-display span');
    const confirmationModal = document.querySelector('#confirmation-modal');

    const donationAmount = input.valueAsNumber;
    const currentDonation = Number(amountText.textContent.replace(/[^\d.]/g, ''));
    const currentBalance = Number(balanceText.textContent.replace(/[^\d.]/g, ''));

    if (!Number.isFinite(donationAmount) || donationAmount <= 0) {
        alert('Please enter a valid donation amount.');
        return;
    }

    if (donationAmount > currentBalance) {
        alert('Insufficient balance.');
        return;
    }

    amountText.lastChild.textContent = ` ${currentDonation + donationAmount} BDT`;
    balanceText.textContent = `${currentBalance - donationAmount} BDT`;

    input.value = '';
    confirmationModal.classList.remove('hidden');
    confirmationModal.classList.add('flex');
}

document.querySelectorAll('[data-campaign] button').forEach((button) => {
    button.addEventListener('click', handleDonation);
});

document.querySelector('#close-confirmation').addEventListener('click', () => {
    const confirmationModal = document.querySelector('#confirmation-modal');
    confirmationModal.classList.add('hidden');
    confirmationModal.classList.remove('flex');
});