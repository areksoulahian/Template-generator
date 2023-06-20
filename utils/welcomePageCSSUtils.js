export const generateWelcomePageCSS = () => {
  const cssContent = `body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background-color: #f7f7f7;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: linear-gradient(to bottom right, #edc988, #f9da8b);
}

.content {
    text-align: center;
}

.title {
    font-size: 48px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.description {
    font-size: 24px;
    color: #666;
    margin-bottom: 40px;
}

.counter-container {
    margin-top: 40px;
}

.counter-btn {
    background-color: #fff;
    color: #333;
    font-size: 18px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    cursor: pointer;
}

.container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.4);
    z-index: -1;
}

.container::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    width: 80%;
    height: 80%;
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.2);
    z-index: -1;
}`;

  return cssContent;
};
