// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand();

// Плавное появление элементов
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.opacity = '1';
    document.body.style.transform = 'translateY(0)';

    const elements = document.querySelectorAll('.back-btn, .payment-header, .payment-content, .confirm-btn');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100 * index);
    });

    // Инициализация копирования номера карты
    const cardNumber = document.getElementById('cardNumber');
    cardNumber.addEventListener('click', function() {
        const textToCopy = this.textContent.replace(/\s/g, '');
        navigator.clipboard.writeText(textToCopy).then(() => {
            if (tg.showAlert) {
                tg.showAlert('Номер карты скопирован');
            } else {
                this.classList.add('copied');
                setTimeout(() => {
                    this.classList.remove('copied');
                }, 2500);
            }
        }).catch(err => {
            console.error('Ошибка копирования: ', err);
            if (tg.showAlert) {
                tg.showAlert('Не удалось скопировать номер карты');
            }
        });
    });

    // Обработка кнопки назад
    document.getElementById('backButton').addEventListener('click', function() {
        if (tg.BackButton && tg.BackButton.isVisible) {
            // Используем нативную кнопку назад Telegram
            tg.BackButton.onClick(function() {
                window.location.href = 'index.html';
            });
            tg.BackButton.show();
        } else {
            // Fallback для браузера или если кнопка недоступна
            window.location.href = 'index.html';
        }
    });
});

// Подтверждение оплаты
document.getElementById('confirmPayment').addEventListener('click', function() {
    tg.sendData(JSON.stringify({
        action: 'payment_confirmed'
    }));
    tg.close();
});

// Обработка нативной кнопки назад Telegram
if (tg.BackButton) {
    tg.BackButton.onClick(function() {
        window.location.href = 'index.html';
    });
}