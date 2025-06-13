async function loadMemory() {
  try {
    const res = await fetch('memory.json');
    const memory = await res.json();
    logMessage(`🧠 Память загружена: ${memory.identity}, пользователь — ${memory.user.name}`);
  } catch (e) {
    logMessage("⚠️ Не удалось загрузить память.");
  }
}
function authenticate() {
  ['file-editor', 'tasks', 'voice-control', 'lira-actions', 'preview']
    .forEach(id => document.getElementById(id).style.display = 'block');
}
function logMessage(msg) {
  const log = document.getElementById("lira-log");
  log.value += msg + "\n";
  log.scrollTop = log.scrollHeight;
}
function saveFile() {
  const name = document.getElementById('file-name').value.trim();
  const ext = document.getElementById('file-type').value;
  const content = document.getElementById('file-content').value;
  if (!name) return alert("Пожалуйста, введите имя файла.");
  const filename = name + ext;
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  logMessage(`✅ Файл "${filename}" сохранён.`);
  if (ext === ".html") {
    document.getElementById('html-preview').srcdoc = content;
    logMessage("🌐 Превью обновлено.");
  }
}
function addTask() {
  const taskInput = document.getElementById("task-input");
  const task = taskInput.value.trim();
  if (task) {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.onchange = () => {
      li.style.textDecoration = checkbox.checked ? "line-through" : "none";
    };
    li.appendChild(checkbox);
    li.append(" " + task);
    document.getElementById("task-list").appendChild(li);
    taskInput.value = '';
    logMessage(`📝 Задача добавлена: ${task}`);
  }
}