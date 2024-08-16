// script.js
document.getElementById('generateNumberButton').addEventListener('click', () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    document.getElementById('numberDisplay').textContent = `Generated Number: ${randomNumber}`;
});
