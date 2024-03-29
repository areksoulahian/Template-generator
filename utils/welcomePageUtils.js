export const generateWelcomePage = (answers) => {
  let fm = `${answers.framework.toLowerCase()}`;
  let db = `${answers.database.toLowerCase()}`;
  let welcomeMessage = `Hello User, you started ${fm} with ${db} App!`;
  const htmlContent = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css" type="text/css">
    <title>Instigate Template Generator</title>
</head>

<body>
    <div class="container">
        <div class="content">
            <h1 class="title">${welcomeMessage}</h1>
            <div class="counter-container">
                <button id="counter-btn" class="counter-btn">0</button>
            </div>
        </div>
        <div id="app"></div>
    </div>
    <script>
        //counter code
        const counterBtn = document.getElementById('counter-btn');
        let count = 0;
        //
        counterBtn.addEventListener('click', () => {
            count++;
            counterBtn.textContent = count;
        });
    </script>
    <style>
    /* CSS styles go here */
    </style>
</body>

</html>`;

  return htmlContent;
};
