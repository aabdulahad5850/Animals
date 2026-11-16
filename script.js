window.addEventListener('load', function() {
    setTimeout(function() {
        const preloader = document.querySelector('.box1');
        if (preloader) {
            preloader.classList.add('box1-hide');
        }
        initScrollReveal();
        initCounters();
    }, 900);
});

function toggleTheme() {
    document.body.classList.toggle('dark');
}

function initScrollReveal() {
    const revealElements = document.querySelectorAll('.box-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('box-visible');
                }, index * 60);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    revealElements.forEach(el => observer.observe(el));
}

function initCounters() {
    const counters = document.querySelectorAll('.box140');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'), 10);
                let current = 0;
                const step = Math.ceil(target / 50);
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        el.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        el.textContent = current;
                    }
                }, 30);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.4 });

    counters.forEach(c => observer.observe(c));
}

let currentCategory = 'all';

function filterPets(category, button) {
    currentCategory = category;
    const buttons = document.querySelectorAll('.box32');
    buttons.forEach(btn => btn.classList.remove('box-active'));
    button.classList.add('box-active');
    applyPetFilters();
}

function searchPets() {
    applyPetFilters();
}

function applyPetFilters() {
    const query = document.getElementById('petSearch').value.toLowerCase().trim();
    const cards = document.querySelectorAll('.box34');

    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const cardName = card.getAttribute('data-name');
        const matchesCategory = currentCategory === 'all' || cardCategory === currentCategory;
        const matchesSearch = cardName.includes(query);

        if (matchesCategory && matchesSearch) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

function toggleFaq(button) {
    const item = button.parentElement;
    item.classList.toggle('box-faq-open');
}

let favorites = [];

function toggleFavorite(name, breed, img, button) {
    const icon = button.querySelector('i');
    const existingIndex = favorites.findIndex(item => item.name === name);

    if (existingIndex > -1) {
        favorites.splice(existingIndex, 1);
        icon.classList.remove('fa-solid');
        icon.classList.add('fa-regular');
        button.classList.remove('box85-liked');
    } else {
        favorites.push({ name, breed, img });
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
        button.classList.add('box85-liked');
    }

    updateWishlistUI();
}

function updateWishlistUI() {
    const countBadge = document.getElementById('wishCount');
    const container = document.getElementById('wishlistItems');
    countBadge.textContent = favorites.length;

    if (favorites.length === 0) {
        container.innerHTML = '<p class="box120">No favorite pets saved yet. Click the heart icon on any pet card to save them here.</p>';
        return;
    }

    container.innerHTML = favorites.map(pet => `
        <div class="box121">
            <img src="${pet.img}" alt="" class="box122">
            <div class="box123">
                <div class="box124">${pet.name}</div>
                <div class="box125">${pet.breed}</div>
            </div>
            <button class="box126" onclick="adoptFromWish('${pet.name}')">Adopt</button>
        </div>
    `).join('');
}

function toggleWishlist() {
    const drawer = document.getElementById('wishlistDrawer');
    drawer.classList.toggle('box117-open');
}

function adoptFromWish(petName) {
    toggleWishlist();
    openModal(petName);
}

function openModal(petName) {
    const modal = document.getElementById('adoptModal');
    const modalTitle = document.getElementById('modalTitle');
    modalTitle.textContent = 'Adopt ' + petName;
    modal.classList.add('box71-show');
}

function closeModal() {
    const modal = document.getElementById('adoptModal');
    modal.classList.remove('box71-show');
}

function handleAdopt(event) {
    event.preventDefault();
    const submitBtn = event.target.querySelector('.box80');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Loading...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        closeModal();
        event.target.reset();
    }, 2500);
}

function openArticle(title, text) {
    document.getElementById('articleTitle').textContent = title;
    document.getElementById('articleBody').textContent = text;
    document.getElementById('articleModal').classList.add('box71-show');
}

function closeArticle() {
    document.getElementById('articleModal').classList.remove('box71-show');
}

function selectAmount(amount, btn) {
    document.querySelectorAll('.box114').forEach(b => b.classList.remove('box-amt-active'));
    btn.classList.add('box-amt-active');
    document.getElementById('donateAmount').value = amount;
}

function handleDonate(event) {
    event.preventDefault();
    const btn = event.target.querySelector('.box116');
    const originalText = btn.textContent;

    btn.textContent = 'Loading...';
    btn.disabled = true;

    setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        event.target.reset();
        document.getElementById('donateAmount').value = 15;
    }, 2500);
}