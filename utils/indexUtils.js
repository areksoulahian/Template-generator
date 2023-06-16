export const generateIndexHTML = () => {
  return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Instigate Template Generator</title>
    <link rel="stylesheet" href="./style.css">
</head>

<body>
    <div class="container">
        <div class="content">
            <h1 class="title">Welcome to Template Generator</h1>
            <p class="description">Generate customized templates with ease.</p>
            <div class="counter-container">
                <button id="counter-btn" class="counter-btn">0</button>
            </div>
        </div>
        <div id="app"></div>
    </div>
    <script>
        //welcome code
        const appDiv = document.querySelector('#app');
        appDiv.innerHTML = htmlContent;
        //counter code
        const counterBtn = document.getElementById('counter-btn');
        let count = 0;

        counterBtn.addEventListener('click', () => {
            count++;
            counterBtn.textContent = count;
        });

    </script>
    <script src="server.js"></script>
</body>

</html>`;
};
