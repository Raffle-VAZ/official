// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand();

const dice = document.querySelector('.dice');

// Функция для проигрывания анимации
function playDiceAnimation() {
    dice.style.animation = 'none';
    void dice.offsetWidth; // Триггер рефлоу
    dice.style.animation = 'dice-effect 1.5s ease-out forwards';
}

// Плавное появление элементов при загрузке
document.addEventListener('DOMContentLoaded', () => {
    // Анимация для body
    document.body.style.opacity = '1';
    document.body.style.transform = 'translateY(0)';
    document.body.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

    // Анимация для всех элементов интерфейса
    const elements = document.querySelectorAll('.header, .dice-container, .price-card, .btn, .counter, .details-btn');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100 * index);
    });

    // Запуск анимации кости с задержкой (после появления элементов)
    setTimeout(playDiceAnimation, 300 + (elements.length * 100));
});

// Обработчик клика на кость
dice.addEventListener('click', playDiceAnimation);

// Обработчики кнопок
document.getElementById('buyBtn').addEventListener('click', () => {
    tg.sendData(JSON.stringify({
        action: 'buy_ticket',
        quantity: 1
    }));
    window.location.href = 'payment.html';
});

document.getElementById('detailsBtn').addEventListener('click', (e) => {
    e.preventDefault();
    tg.showPopup({
        title: 'Условия розыгрыша',
        message: '1. Купите билет(ы) по 500₽\n2. После продажи всех 500 билетов будет проведен розыгрыш\n3. Победитель выбирается случайным образом в прямом эфире\n\nАвтомобиль ВАЗ 2109 на ходу, все документы в порядке.',
        buttons: [{
            id: 'ok',
            type: 'ok'
        }]
    });
});

// Обработка нативной кнопки назад Telegram
if (tg.BackButton) {
    tg.BackButton.onClick(function() {
        window.history.back();
    });
}