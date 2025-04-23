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
            showCopiedAlert('Номер карты скопирован');
        }).catch(err => {
            console.error('Ошибка копирования: ', err);
            showCopiedAlert('Не удалось скопировать номер карты', true);
        });
    });

    // Инициализация копирования комментария
    const paymentComment = document.querySelector('.payment-comment');
    if (paymentComment) {
        paymentComment.style.cursor = 'pointer'; // Делаем курсор указателем
        paymentComment.addEventListener('click', function() {
            const textToCopy = this.textContent.trim();
            navigator.clipboard.writeText(textToCopy).then(() => {
                showCopiedAlert('Комментарий скопирован');
            }).catch(err => {
                console.error('Ошибка копирования: ', err);
                showCopiedAlert('Не удалось скопировать комментарий', true);
            });
        });
    }

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

// Обработка нативной кнопки назад Telegram
if (tg.BackButton) {
    tg.BackButton.onClick(function() {
        window.location.href = 'index.html';
    });
}

// Функция для показа уведомления о копировании
function showCopiedAlert(message, isError = false) {
    if (tg.showAlert) {
        tg.showAlert(message);
    } else {
        // Fallback для браузера (например, временный стиль)
        const element = document.createElement('div');
        element.textContent = message;
        element.style.position = 'fixed';
        element.style.bottom = '20px';
        element.style.left = '50%';
        element.style.transform = 'translateX(-50%)';
        element.style.backgroundColor = isError ? '#ff4444' : '#4CAF50';
        element.style.color = 'white';
        element.style.padding = '10px 20px';
        element.style.borderRadius = '5px';
        element.style.zIndex = '1000';
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.3s';

        document.body.appendChild(element);

        // Плавное появление и исчезновение
        setTimeout(() => {
            element.style.opacity = '1';
        }, 10);

        setTimeout(() => {
            element.style.opacity = '0';
            setTimeout(() => {
                element.remove();
            }, 300);
        }, 2000);
    }
}