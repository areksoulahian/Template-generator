export const generateReadme = (answers) => {
  const projectName = answers['project-name'];

  return `
# ${projectName}

This is a README file for your project. Feel free to update it with relevant information about your project.

## Getting Started

1. cd output/${projectName}
2. Install dependencies:
   - npm install
3. Start the development server:
   - npm run dev

## License

This project is licensed under the [MIT License](LICENSE).`;
};
