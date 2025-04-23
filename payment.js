// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand();

// Копирование номера карты
document.getElementById('cardNumber').addEventListener('click', function() {
    const cardNumber = '2202206861274053'; // Без пробелов
    navigator.clipboard.writeText(cardNumber)
        .then(() => {
            tg.showPopup({
                title: 'Скопировано',
                message: 'Номер карты скопирован в буфер обмена',
                buttons: [{ id: 'ok', type: 'ok' }]
            });
        })
        .catch(err => {
            console.error('Ошибка копирования: ', err);
        });
});

// Подтверждение оплаты
document.getElementById('confirmPayment').addEventListener('click', function() {
    tg.showPopup({
        title: 'Подтверждение',
        message: 'Вы уверены, что произвели оплату?',
        buttons: [
            { id: 'cancel', type: 'cancel' },
            {
                id: 'confirm',
                type: 'default',
                text: 'Да, оплатил(а)'
            }
        ]
    });

    tg.onEvent('popupClosed', function(data) {
        if (data.button_id === 'confirm') {
            tg.sendData(JSON.stringify({
                action: 'payment_confirmed',
                amount: 500
            }));
            tg.close();
        }
    });
});

// Плавное появление элементов
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.payment-header, .payment-instructions, .confirm-btn, .payment-help');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});