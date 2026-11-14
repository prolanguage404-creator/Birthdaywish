// Cursor လိုက်ပါလာမယ့် effect
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// နှုတ်ဆက်စာသားအတွက် စာရိုက်ပြသမယ့် effect
const greetingText = "မင်းသိလား! မင်းက ငါတွေ့ဖူးသမျှထဲမှာ အချစ်စရာအကောင်းဆုံး လူသားပဲ! 💖";
const greetingElement = document.querySelector('.greeting');
let charIndex = 0;

function typeGreeting() {
    if (charIndex < greetingText.length) {
        greetingElement.textContent += greetingText.charAt(charIndex);
        charIndex++;
        setTimeout(typeGreeting, 100);
    }
}

// မျောနေမယ့် အရာလေးတွေ ဖန်တီးခြင်း
const floatingElements = ['💖', '✨', '🌸', '💫', '💕'];
function createFloating() {
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = floatingElements[Math.floor(Math.random() * floatingElements.length)];
    element.style.left = Math.random() * 100 + 'vw';
    element.style.top = Math.random() * 100 + 'vh';
    element.style.fontSize = (Math.random() * 20 + 20) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -500,
        x: Math.random() * 100 - 50,
        rotation: Math.random() * 360,
        duration: Math.random() * 5 + 5,
        opacity: 1,
        ease: "none",
        onComplete: () => element.remove()
    });
}

// Animation တွေ စတင်ခြင်း
window.addEventListener('load', () => {
    // ခေါင်းစဉ် animation
    gsap.to('h1', {
        opacity: 1,
        duration: 1,
        y: 20,
        ease: "bounce.out"
    });

    // ခလုတ် animation
    gsap.to('.cta-button', {
        opacity: 1,
        duration: 1,
        y: -20,
        ease: "back.out"
    });

    // စာရိုက်ပြသမှု စတင်ခြင်း
    typeGreeting();

    // မျောနေတဲ့ အရာလေးတွေကို အချိန်တိုင်း ဖန်တီးခြင်း
    setInterval(createFloating, 1000);
});

// Hover effect များ
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('mouseenter', () => {
        gsap.to(button, {
            scale: 1.1,
            duration: 0.3
        });
    });

    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            scale: 1,
            duration: 0.3
        });
    });

    // နှိပ်လိုက်ရင် စာမျက်နှာ ချောမွေ့စွာ ကူးပြောင်းခြင်း
    button.addEventListener('click', () => {
        gsap.to('body', {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                window.location.href = 'cause.html'; // နောက်စာမျက်နှာရဲ့ URL နဲ့ အစားထိုးပါ
            }
        });
    });
});