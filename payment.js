// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand();

// Плавное появление элементов
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.opacity = '1';
    document.body.style.transform = 'translateY(0)';

    const elements = document.querySelectorAll('.payment-header, .payment-content, .confirm-btn');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100 * index);
    });

    // Инициализация копирования номера карты
    const cardNumber = document.getElementById('cardNumber');
    cardNumber.addEventListener('click', function() {
        // Удаляем пробелы для копирования
        const textToCopy = this.textContent.replace(/\s/g, '');

        // Копируем в буфер обмена
        navigator.clipboard.writeText(textToCopy).then(() => {
            // Показываем уведомление в Telegram
            if (tg.showAlert) {
                tg.showAlert('Номер карты скопирован');
            } else {
                // Fallback для браузера
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
});

// Подтверждение оплаты
document.getElementById('confirmPayment').addEventListener('click', function() {
    tg.sendData(JSON.stringify({
        action: 'payment_confirmed'
    }));
    tg.close();
});