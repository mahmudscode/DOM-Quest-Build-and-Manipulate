function addHistoryCard(amount, campaignName) {
    const historyList = document.querySelector('#history-list');
    const historyCard = document.createElement('article');

    const cleanName = campaignName.replace(/^Donate for\s+/i, '');

    const currentDate = new Date().toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    });

    historyCard.className =
        'rounded-xl border border-[#e7e7e7] bg-white px-6 py-6 sm:px-8';

    historyCard.innerHTML = `
        <h3 class="text-base font-bold text-[#202020] sm:text-lg">
            ${amount} Taka is Donated for ${cleanName}
        </h3>
        <p class="mt-4 text-sm text-[#666]">
            Date : ${currentDate}
        </p>
    `;

    historyList.prepend(historyCard);
}

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
    const campaignName = card.querySelector('h2').textContent;

    addHistoryCard(donationAmount, campaignName);

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
const donationTab = document.querySelector('#donation-tab');
const historyTab = document.querySelector('#history-tab');
const campaignList = document.querySelector('#campaign-list');
const historySection = document.querySelector('#history-section');

historyTab.addEventListener('click', () => {
    campaignList.classList.add('hidden');
    historySection.hidden = false;
    historySection.classList.remove('hidden');

    historyTab.classList.add('bg-lime');
    historyTab.classList.remove('border', 'border-[#d6d6d6]', 'bg-white', 'text-[#555]');

    donationTab.classList.remove('bg-lime');
    donationTab.classList.add('border', 'border-[#d6d6d6]', 'bg-white', 'text-[#555]');
});

donationTab.addEventListener('click', () => {
    campaignList.classList.remove('hidden');
    historySection.hidden = true;
    historySection.classList.add('hidden');

    donationTab.classList.add('bg-lime');
    donationTab.classList.remove('border', 'border-[#d6d6d6]', 'bg-white', 'text-[#555]');

    historyTab.classList.remove('bg-lime');
    historyTab.classList.add('border', 'border-[#d6d6d6]', 'bg-white', 'text-[#555]');
});