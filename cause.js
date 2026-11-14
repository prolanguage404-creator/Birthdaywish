// အကြောင်းပြချက်များ ဒေတာဘေ့စ်
const reasons = [
    {
        text: "မင်းက အရမ်းကြင်နာပြီး အံ့ဖွယ်ကောင်းတဲ့ လူတစ်ယောက်ပါ၊ မင်းနဲ့ ဒီလိုကောင်းမွန်တဲ့ နှောင်ကြိုးကို မျှဝေရတာ ငါကံကောင်းတယ်လို့ ခံစားရတယ်။ 💖",
        emoji: "🌟",
        gif: "gif1.gif"
    },
    {
        text: "မင်းရဲ့ နေ့တစ်နေ့က အချစ်၊ ရယ်မောသံနဲ့ အဆုံးမဲ့ ပျော်ရွှင်မှုတွေနဲ့ ပြည့်နှက်ပါစေ။ 🌸",
        emoji: "💗",
        gif: "gif2.gif"
    },
    {
        text: "မင်းအတွက် အောင်မြင်မှု၊ ပျော်ရွှင်မှုနဲ့ မင်းရဲ့နှလုံးသား တောင့်တတဲ့ အရာအားလုံး ဖြစ်ပါစေလို့ ဆုတောင်းပါတယ်။ ✨",
        emoji: "💕",
        gif: "gif1.gif"
    },
    {
        text: "မင်းဖြစ်နေတဲ့ ဒီအံ့ဖွယ်ကောင်မလေးအတိုင်း ဆက်လက်နေပါ—အမြဲတမ်း အပြုသဘောဆောင်မှုတွေ ဖြန့်ဝေပေးပါ။ ရှေ့လာမယ့်နှစ်က ပျော်ရွှင်ဆုံးနှစ် ဖြစ်ပါစေ! 🥳",
        emoji: "🌟",
        gif: "gif2.gif"
    }
];

// အခြေအနေ စီမံခန့်ခွဲမှု
let currentReasonIndex = 0;
const reasonsContainer = document.getElementById('reasons-container');
const shuffleButton = document.querySelector('.shuffle-button');
const reasonCounter = document.querySelector('.reason-counter');
let isTransitioning = false;

// gif နဲ့အတူ အကြောင်းပြချက် ကတ် ဖန်တီးခြင်း
function createReasonCard(reason) {
    const card = document.createElement('div');
    card.className = 'reason-card';

    const text = document.createElement('div');
    text.className = 'reason-text';
    text.innerHTML = `${reason.emoji} ${reason.text}`;

    const gifOverlay = document.createElement('div');
    gifOverlay.className = 'gif-overlay';
    gifOverlay.innerHTML = `<img src="${reason.gif}" alt="ခင်မင်ရင်းနှီးမှု အမှတ်တရ">`;

    card.appendChild(text);
    card.appendChild(gifOverlay);

    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "back.out"
    });

    return card;
}

// အကြောင်းပြချက်အသစ် ပြသခြင်း
function displayNewReason() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentReasonIndex < reasons.length) {
        const card = createReasonCard(reasons[currentReasonIndex]);
        reasonsContainer.appendChild(card);

        // ကောင်တာ အပ်ဒိတ်လုပ်ခြင်း
        reasonCounter.textContent = `အကြောင်းပြချက် ${currentReasonIndex + 1} / ${reasons.length}`;

        currentReasonIndex++;

        // ခလုတ်ကို ပြောင်းလဲသင့်သလား စစ်ဆေးခြင်း
        if (currentReasonIndex === reasons.length) {
            gsap.to(shuffleButton, {
                scale: 1.1,
                duration: 0.5,
                ease: "elastic.out",
                onComplete: () => {
                    shuffleButton.textContent = "ငါတို့ရဲ့ ဇာတ်လမ်းထဲ ဝင်လာပါ 💫";
                    shuffleButton.classList.add('story-mode');
                    shuffleButton.addEventListener('click', () => {
                        gsap.to('body', {
                            opacity: 0,
                            duration: 1,
                            onComplete: () => {
                                window.location.href = 'last.html'; // နောက်စာမျက်နှာရဲ့ URL နဲ့ အစားထိုးပါ
                            }
                        });
                    });
                }
            });
        }

        // မျောနေတဲ့ အရာလေးများ ဖန်တီးခြင်း
        createFloatingElement();

        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    } else {
        // စာမျက်နှာအသစ် သို့မဟုတ် အပိုင်းအသစ်သို့ သွားခြင်းကို ကိုင်တွယ်ခြင်း
        window.location.href = "#storylane";
        // ဒါမှမဟုတ် မင်းရဲ့ နောက်စာမျက်နှာ လုပ်ဆောင်ချက်ကို စတင်ပါ
    }
}

// ခလုတ်နှိပ်မှုကို စတင်ခြင်း
shuffleButton.addEventListener('click', () => {
    gsap.to(shuffleButton, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
    displayNewReason();
});

// မျောနေတဲ့ အရာလေးများ ဖန်တီးခြင်း function
function createFloatingElement() {
    const elements = ['🌸', '✨', '💖', '🦋', '⭐'];
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = Math.random() * window.innerHeight + 'px';
    element.style.fontSize = (Math.random() * 20 + 10) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -500,
        duration: Math.random() * 10 + 10,
        opacity: 0,
        onComplete: () => element.remove()
    });
}

// Custom cursor
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX - 15,
        y: e.clientY - 15,
        duration: 0.2
    });
});

// ကနဦး မျောနေတဲ့ အရာလေးများ ဖန်တီးခြင်း
setInterval(createFloatingElement, 2000);