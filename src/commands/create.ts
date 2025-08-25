import { Command } from "commander";
import inquirer from "inquirer";
import ora from "ora";
import fs from "node:fs";
import { exec } from "node:child_process";
import util from "node:util";
import os from "node:os";

const execAsync = util.promisify(exec);

async function create(program: Command): Promise<void> {
  program
    .command("create")
    .description("Escolha uma opção no menu")
    .action(async () => {
      const answers = await inquirer.prompt([
        {
          type: "list",
          name: "option",
          message: "Selecione uma opção:",
          choices: [
            "React",
            "API com Fastify",
            "API com Express",
            "CLI Exemplo",
          ],
        },
      ]);

      const dirName = await inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "Qual vai ser o nome da pasta?",
          validate: (input: string) =>
            input.trim() !== "" || "O nome não pode ser vazio",
        },
      ]);

      const spinner = ora(`Criando projeto: ${answers.option}...`).start();

      if (fs.existsSync("./" + dirName.name)) {
        spinner.fail(`O diretório ${dirName.name} já existe!`);
        return;
      }

      try {
        // 🔹 Verificar se o curl está instalado
        if (os.platform() === "win32") {
          await execAsync("where curl");
        } else {
          await execAsync("command -v curl");
        }
      } catch {
        spinner.fail(
          "O `curl` não está instalado. Instale antes de continuar."
        );
        return;
      }

      // 🔹 Mapear opções do menu para os caminhos do repositório
      const repoPaths: Record<string, string> = {
        "API com Express": "api-express",
        "API com Fastify": "api-fastify",
        React: "react",
        "CLI Exemplo": "cli",
      };

      const selectedPath = repoPaths[answers.option];
      if (!selectedPath) {
        spinner.fail("Opção inválida.");
        return;
      }

      // 🔹 Comandos diferentes para Linux/macOS e Windows
      const isWindows = os.platform() === "win32";

      const command = isWindows
        ? `
    $curl = Get-Command curl.exe -ErrorAction SilentlyContinue;
    if (-not $curl) { throw "O curl real não foi encontrado"; }
    curl.exe -L https://github.com/devmaggioni/templates/archive/refs/heads/main.zip -o repo.zip;
    Expand-Archive -Force repo.zip -DestinationPath .;
    Move-Item -Path "templates-main/${selectedPath}" -Destination "./${dirName.name}";
    Remove-Item -Recurse -Force templates-main, repo.zip;
  `
        : `
    curl -L https://github.com/devmaggioni/templates/archive/refs/heads/main.zip -o repo.zip \
    && unzip -q repo.zip "templates-main/${selectedPath}/*" \
    && mv templates-main/${selectedPath} "./${dirName.name}" \
    && rm -rf templates-main repo.zip
  `;

      try {
        await execAsync(command, {
          shell: isWindows ? "powershell.exe" : "/bin/bash",
        });
        spinner.succeed(
          `${answers.option} criado com sucesso em: ${dirName.name}`
        );
      } catch (err) {
        spinner.fail("Erro ao criar o projeto: " + (err as Error).message);
      }
    });
}

export default create;
