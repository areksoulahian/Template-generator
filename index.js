const { program } = require("commander");
const fs = require("fs-extra");

program
  .command("express")
  .description("Generate Express template")
  .option("-o, --output <directory>", "Output directory")
  .action((cmd) => {
    // Logic to generate Express template
    console.log("Generating Express template...");
    console.log("Output directory:", cmd.output || "default");
  });

program
  .command("hapi")
  .description("Generate Hapi template")
  .option("-o, --output <directory>", "Output directory")
  .action((cmd) => {
    // Logic to generate Hapi template
    console.log("Generating Hapi template...");
    console.log("Output directory:", cmd.output || "default");
  });

program
  .command("koa")
  .description("Generate Koa template")
  .option("-o, --output <directory>", "Output directory")
  .action((cmd) => {
    // Logic to generate Koa template
    console.log("Generating Koa template...");
    console.log("Output directory:", cmd.output || "default");
  });

program
  .command("fastify")
  .description("Generate Fastify template")
  .option("-o, --output <directory>", "Output directory")
  .action((cmd) => {
    // Logic to generate Fastify template
    console.log("Generating Fastify template...");
    console.log("Output directory:", cmd.output || "default");
  });

program.parse(process.argv);
