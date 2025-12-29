# Onboarding: Начало работы с проектом

Пошаговая инструкция для нового разработчика (Windows).

---

## 1. Получи доступ к аккаунту

1. Открой почту, которую тебе дали
2. Проверь входящие — там может быть письмо для подтверждения

⚠️ **ВАЖНО:**
- Эту почту **НЕЛЬЗЯ использовать в личных целях**
- Claude в браузере (claude.ai) **использовать НЕЛЬЗЯ**
- Работай **ТОЛЬКО через терминал** (Claude Code)

---

## 2. Установи необходимые программы

### 2.1 Установи Node.js

1. Перейди на https://nodejs.org/
2. Скачай **LTS версию** (зелёная кнопка)
3. Запусти установщик, жми "Next" везде
4. После установки **перезапусти компьютер**

---

### 2.2 Установи Git + Git Bash

**Важно:** Git Bash — это терминал, в котором ты будешь работать!

1. Перейди на https://git-scm.com/download/win
2. Скачай и запусти установщик
3. При установке:
   - Оставь галочку **"Git Bash Here"** (важно!)
   - Остальное можно по умолчанию
4. После установки найди **Git Bash** в меню Пуск

**Как открыть Git Bash:**
- Нажми Win, напиши "Git Bash", нажми Enter
- Или правой кнопкой в папке → "Git Bash Here"

---

### 2.3 Зарегистрируйся на GitHub

1. Перейди на https://github.com
2. Нажми **"Sign up"**
3. Введи свой email, придумай пароль и username
4. Подтверди email (придёт письмо)

---

### 2.4 Установи GitHub CLI

1. Перейди на https://cli.github.com/
2. Нажми **"Download for Windows"**
3. Запусти установщик
4. **Перезапусти Git Bash** после установки

---

### 2.5 Авторизуйся в GitHub

Открой **Git Bash** и выполни:

```bash
gh auth login
```

Отвечай на вопросы:
1. **What account?** → `GitHub.com`
2. **Preferred protocol?** → `HTTPS`
3. **Authenticate Git?** → `Yes`
4. **How to authenticate?** → `Login with a web browser`

Откроется браузер:
1. Скопируй код из терминала
2. Вставь его на странице GitHub
3. Нажми "Authorize"
4. Вернись в Git Bash — должно написать "Logged in"

**Проверь:**
```bash
gh auth status
```

---

### 2.6 Настрой Git со своим именем

```bash
git config --global user.name "Твоё Имя"
git config --global user.email "твой@email.com"
```

**Пример:**
```bash
git config --global user.name "Alena Ivanova"
git config --global user.email "alena@gmail.com"
```

---

### 2.7 Установи Claude Code

Открой **Git Bash** и выполни:

```bash
npm install -g @anthropic-ai/claude-code
```

**Проверь установку:**
```bash
claude --version
```

Если ошибка "command not found" — закрой Git Bash и открой заново.

---

## 3. Авторизуйся в Claude Code

В Git Bash выполни:

```bash
claude
```

При первом запуске:
1. Откроется браузер для авторизации
2. Войди через **почту, которую тебе дали**
3. Подтверди доступ
4. Вернись в Git Bash — должно написать что авторизация успешна

---

## 4. Склонируй репозиторий

В Git Bash выполни:

```bash
# Создай папку для проектов
mkdir -p /c/projects
cd /c/projects

# Склонируй репозиторий
git clone https://github.com/michaelpautov/nha-trang.git

# Перейди в папку проекта
cd nha-trang
```

---

## 5. Запусти Claude Code в проекте

```bash
claude
```

Claude автоматически прочитает `CLAUDE.md` и поймёт контекст проекта.

---

## 6. Решение проблем

### "claude" не найден

1. Закрой Git Bash
2. Открой заново
3. Попробуй ещё раз

Если не помогло:
```bash
npx @anthropic-ai/claude-code
```

---

### "npm" не найден

Node.js не установлен. Установи Node.js и **перезагрузи компьютер**.

---

### "git" не найден

Git не установлен. Установи Git и **перезагрузи компьютер**.

---

### Ошибка прав доступа при npm install -g

Попробуй:
```bash
npm install -g @anthropic-ai/claude-code --force
```

---

## Структура проекта

```
nha-trang/
├── CLAUDE.md           # Контекст для AI
├── README.md           # Описание проекта
├── ONBOARDING.md       # Эта инструкция
├── tasks/              # Задачи для выполнения
│   ├── 001-visa-website.md
│   └── 002-improve-design.md
└── docs/
    ├── user-stories.md
    ├── data-models.md
    └── pages.md
```

---

## Полезные команды Git Bash

```bash
# Показать текущую папку
pwd

# Список файлов
ls

# Перейти в папку
cd имя_папки

# Вернуться на уровень выше
cd ..

# Очистить экран
clear
```

---

## Контакты

Если что-то не работает — пиши в Telegram: [указать контакт]

---

Удачи!
