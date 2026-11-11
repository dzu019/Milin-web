const hour = new Date().getHours();
const greetingEl = document.getElementById('greeting');
if (hour >= 5 && hour < 11) greetingEl.innerText = "Selamat Pagi 🌤️";
else if (hour >= 11 && hour < 15) greetingEl.innerText = "Selamat Siang ☀️";
else if (hour >= 15 && hour < 18) greetingEl.innerText = "Selamat Sore 🌅";
else greetingEl.innerText = "Selamat Malam 🌙";

window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('skeleton').classList.add('loaded');
        document.body.classList.add('web-ready');
    }, 600); 
});

setTimeout(() => {
    if(!document.body.classList.contains('web-ready')) {
        document.getElementById('skeleton').classList.add('loaded');
        document.body.classList.add('web-ready');
    }
}, 3000);

const shareBtn = document.getElementById('share-btn');
const toast = document.getElementById('toast');

shareBtn.addEventListener('click', async () => {
    const shareData = {
        title: 'Shotozakirei | Links',
        text: 'Temukan profil dan link resmi dari Shotozakirei.',
        url: window.location.href
    };
    
    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (err) {}
    } else {
        navigator.clipboard.writeText(window.location.href);
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }
});

const cards = document.querySelectorAll('.link-card');
cards.forEach(card => {
    card.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const circle = document.createElement('span');
        const diameter = Math.max(this.clientWidth, this.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - rect.left - radius}px`;
        circle.style.top = `${e.clientY - rect.top - radius}px`;
        circle.classList.add('ripple');
        
        const existingRipple = this.querySelector('.ripple');
        if(existingRipple) existingRipple.remove();
        
        this.appendChild(circle);
    });
});

document.addEventListener('click', function(e) {
    if(e.target.closest('.link-card') || e.target.closest('.share-btn')) return;
    
    const drop = document.createElement('div');
    const icons = ['✦', '✧', '⚡', '★'];
    drop.innerHTML = icons[Math.floor(Math.random() * icons.length)];
    drop.className = 'click-effect';
    drop.style.left = (e.clientX - 10) + 'px';
    drop.style.top = (e.clientY - 10) + 'px';
    document.body.appendChild(drop);
    
    setTimeout(() => drop.remove(), 700);
});
