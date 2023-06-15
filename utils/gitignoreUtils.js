export const generateGitignore = (answers) => {
  return `
# Node.js
node_modules

# Build output
/dist

# Environment variables
.env

# IDE settings
.vscode
.idea
  `;
};
