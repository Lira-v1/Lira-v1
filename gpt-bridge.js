async function checkGPTCommands() {
  try {
    const res = await fetch('https://raw.githubusercontent.com/Lira-v1/Lira-v1/main/input.json?' + Date.now());
    const cmd = await res.json();
    if (!cmd || !cmd.action) return;

    if (cmd.action === "add_task") {
      addTaskFromGPT(cmd.content);
    } else if (cmd.action === "log") {
      logMessage("🤖 GPT: " + cmd.content);
    } else if (cmd.action === "clear_tasks") {
      clearTasks();
    }

    // Обнуление теперь происходит через GitHub Actions
    logMessage("✅ Команда GPT выполнена: " + cmd.action);
  } catch (e) {
    logMessage("⚠ Ошибка gpt-bridge: " + e.message);
  }
}

function addTaskFromGPT(text) {
  const input = document.getElementById("task-input");
  input.value = text;
  addTask();
}

function clearTasks() {
  document.getElementById("task-list").innerHTML = '';
  logMessage("🧹 Задачи очищены по команде GPT");
}

setInterval(checkGPTCommands, 5000);
