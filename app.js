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

// Первая анимация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    // Плавное появление элементов
    const elements = document.querySelectorAll('.header, .dice-container, .price-card, .btn, .counter, .details-btn');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100 * index);
    });

    // Запуск анимации кости с небольшой задержкой
    setTimeout(playDiceAnimation, 300);
});

// Обработчик клика на кость
dice.addEventListener('click', playDiceAnimation);

// Обработчики кнопок (остаются без изменений)
document.getElementById('buyBtn').addEventListener('click', () => {
    tg.sendData(JSON.stringify({
        action: 'buy_ticket',
        quantity: 1
    }));
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

document.getElementById('buyBtn').addEventListener('click', function() {
    window.location.href = 'payment.html';
});