const questionList = document.querySelector('#question-list');
const blogError = document.querySelector('#blog-error');
const fallbackBlog = {
    title: 'Frequently Asked Questions',
    questions: [
        {
            question: 'What is a donation?',
            answer: 'A donation is money given to support people, communities, or organizations that need help. Every contribution can make a meaningful difference.'
        },
        {
            question: 'How does my donation help?',
            answer: 'Your donation helps provide emergency supplies, medical support, food, clean water, and other essential assistance to affected communities.'
        },
        {
            question: 'Can I donate to more than one campaign?',
            answer: 'Yes. You can donate to any campaign from the Donation page. Each successful donation is recorded separately in your History page.'
        },
        {
            question: 'Where can I see my donation records?',
            answer: 'Open the History button on the Donation page to see each donation amount, campaign name, and the date and time of the transaction.'
        }
    ]
};

function renderBlog(blog) {
    document.title = `${blog.title} | Donate Bangladesh`;
    document.querySelector('#blog-content h1').textContent = blog.title;

    blog.questions.forEach(({ question, answer }) => {
        const details = document.createElement('details');
        details.className = 'group rounded-xl border border-[#e7e7e7] bg-white px-5 py-4 shadow-sm';

        const summary = document.createElement('summary');
        summary.className = 'flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-[#202020] marker:hidden';
        summary.innerHTML = `${question}<span class="text-xl text-[#789b32] transition group-open:rotate-45">+</span>`;

        const answerText = document.createElement('p');
        answerText.className = 'mt-4 border-t border-[#eeeeee] pt-4 text-sm leading-6 text-[#666]';
        answerText.textContent = answer;

        details.append(summary, answerText);
        questionList.append(details);
    });
}

fetch('blog.json')
    .then((response) => {
        if (!response.ok) {
            throw new Error('Unable to load blog data.');
        }
        return response.json();
    })
    .then((blog) => {
        renderBlog(blog);
    })
    .catch(() => {
        renderBlog(fallbackBlog);
    });
