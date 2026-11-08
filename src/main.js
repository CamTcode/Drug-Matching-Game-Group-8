export function updateStartButton() {
    const startButton = document.getElementById("start_btn");
    const selectedCount = document.querySelectorAll("#buttons .selected").length;
    startButton.disabled = selectedCount < 2;
}

export function init() {
    const toggles = document.querySelectorAll("#buttons button");

    toggles.forEach(function (button) {
        button.addEventListener("click", function () {
            button.classList.toggle("selected");
            updateStartButton();
        });
    });
}