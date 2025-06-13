async function checkGPTCommands() {
  try {
    const res = await fetch('https://lira-gpt-bridge.onrender.com/input.json?' + Date.now());
    const cmd = await res.json();
    if (!cmd || !cmd.action) return;

    if (cmd.action === "add_task") {
      addTaskFromGPT(cmd.content);
    } else if (cmd.action === "log") {
      logMessage("🤖 GPT: " + cmd.content);
    } else if (cmd.action === "clear_tasks") {
      clearTasks();
    }

    // Обнуляем команду через мост
    await fetch('https://lira-gpt-bridge.onrender.com/update', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "", content: "" })
    });
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
