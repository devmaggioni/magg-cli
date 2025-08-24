import inquirer from "inquirer";
import ora from "ora";
async function choose(program) {
    program
        .command("choose")
        .description("Escolha uma opção no menu")
        .action(async () => {
        const answers = await inquirer.prompt([
            {
                type: "list",
                name: "option",
                message: "Selecione uma opção:",
                choices: ["Opção 1", "Opção 2", "Opção 3"],
            },
        ]);
        const spinner = ora(`Executando ${answers.option}...`).start();
        // Simula processamento
        await new Promise((resolve) => setTimeout(resolve, 2000));
        spinner.succeed(`${answers.option} concluída com sucesso!`);
    });
}
export default choose;
