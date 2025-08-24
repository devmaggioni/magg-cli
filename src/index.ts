#!/usr/bin/env node
import { Command } from "commander";
import fs from "node:fs";
const pkg = JSON.parse(fs.readFileSync("./package.json", "utf-8"));

//comandos
import create from "./commands/create.js";

const program = new Command();

program
  .name("magg")
  .description("CLI para criar novos projetos a partir de templates já prontos")
  .version(pkg.version, "-v, --version", "Mostra a versão da CLI")
  .showHelpAfterError("(Use --help para ver os comandos disponíveis)");

create(program);

// Mostra ajuda se nenhum comando for passado
if (process.argv.length < 3) {
  program.outputHelp();
}

// Parse dos argumentos
program.parse(process.argv);
