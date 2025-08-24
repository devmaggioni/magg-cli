# 🚀 MAGG CLI

Um CLI simples para criar projetos baseados em templates prontos.  
Atualmente suporta **React**, **API com Fastify**, **API com Express** e **CLI Exemplo**.

Os templates estão hospedados em:  
👉 [devmaggioni/templates](https://github.com/devmaggioni/templates)

---

## 📦 Uso rápido:

```bash
# instale globalmente
npm i -g @devmaggioni/magg-cli

# uso:
magg create # => seleciona as opções
# npx @devmaggioni/magg-cli create #=> testar sem instalar globalmente
```

---

## 📦 Instalação

Clone este repositório e instale as dependências:

```bash
git clone https://github.com/devmaggioni/magg-cli.git
cd magg-cli
npm install
npm run build
# node dist/index.js create
```

Opcionalmente, você pode linkar globalmente para usar o comando em qualquer lugar:

```bash
npm link
```

---

## ▶️ Uso

Para iniciar o CLI:

```bash
magg create
```

### 📋 Passo a passo

1. Escolha um template no menu (React, Fastify, Express ou CLI Exemplo).
2. Informe o nome da pasta onde o projeto será criado.
3. O CLI irá baixar automaticamente apenas o template escolhido do repositório remoto.

---

## 🔧 Requisitos

- **Node.js** (>= 18)
- **curl** instalado

  - Linux/macOS: já vem por padrão
  - Windows: disponível no PowerShell moderno

---

## 💻 Exemplos de uso

### Linux / macOS

```bash
magg create
```

👉 Isso executa internamente:

```bash
curl -L https://github.com/devmaggioni/templates/archive/refs/heads/main.zip -o repo.zip \
&& unzip -q repo.zip "templates-main/api-express/*" \
&& mv templates-main/api-express ./meu-projeto \
&& rm -rf templates-main repo.zip
```

---

### Windows (PowerShell)

```powershell
magg create
```

👉 Isso executa internamente:

```powershell
curl -L https://github.com/devmaggioni/templates/archive/refs/heads/main.zip -o repo.zip;
Expand-Archive -Force repo.zip -DestinationPath .;
Move-Item -Path "templates-main/api-express" -Destination "./meu-projeto";
Remove-Item -Recurse -Force templates-main, repo.zip;
```

---

## 📚 Templates disponíveis

- `React`
- `API com Express`
- `API com Fastify`
- `CLI Exemplo`

---

## ⚠️ Observações

- Se o diretório já existir, o CLI não sobrescreve.
- Necessário ter `curl` instalado.
- Em Windows, o script usa **PowerShell**.

---

## 🛠️ Futuro

- Suporte a novos templates (NestJS, Next.js, etc).
- Download via GitHub API (sem `curl`).
- Suporte a customização (ex: instalar dependências após criar).

---
