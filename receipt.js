const tg = window.Telegram.WebApp;
tg.expand();

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация анимаций
    document.body.style.opacity = '1';
    document.querySelectorAll('.back-btn, .receipt-container').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });

    // Элементы управления
    const fileInput = document.getElementById('fileInput');
    const chooseFileBtn = document.getElementById('chooseFileBtn');
    const fileName = document.getElementById('fileName');
    const sendBtn = document.getElementById('sendBtn');
    const uploadArea = document.getElementById('uploadArea');

    // Обработчик кнопки "Назад"
    document.getElementById('backButton').addEventListener('click', () => {
        window.history.back();
    });

    // Выбор файла
    chooseFileBtn.addEventListener('click', () => fileInput.click());

    // Обработка выбора файла
    fileInput.addEventListener('change', function() {
        const file = this.files[0];
        if (!file) return;

        // Проверка типа файла
        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (!allowedTypes.includes(file.type)) {
            tg.showAlert('Пожалуйста, выберите файл в формате JPG, PNG или PDF');
            return;
        }

        // Проверка размера файла (5MB)
        if (file.size > 5 * 1024 * 1024) {
            tg.showAlert('Максимальный размер файла - 5 МБ');
            return;
        }

        fileName.textContent = file.name;
        sendBtn.disabled = false;
        uploadArea.style.backgroundColor = 'rgba(36, 129, 204, 0.05)';
    });

    // Отправка файла
    sendBtn.addEventListener('click', async () => {
        const file = fileInput.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            const fileData = e.target.result;

            // Отправка данных в Telegram бота
            tg.sendData(JSON.stringify({
                type: 'receipt',
                filename: file.name,
                mimeType: file.type,
                data: fileData.split(',')[1] // Удаляем префикс data:...
            }));

            tg.showAlert('Квитанция успешно отправлена!');
            tg.close();
        };
        reader.onerror = () => tg.showAlert('Ошибка чтения файла');
        reader.readAsDataURL(file);
    });
});