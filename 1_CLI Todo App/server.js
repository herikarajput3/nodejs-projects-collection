const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ''
});

const tasks = [];

const showMenu = () => {
    console.log("\n===== Task Manager =====");
    console.log("1: Add a task");
    console.log("2: View all tasks");
    console.log("3: Exit");

    rl.question("Choose an option: ", handleInput);
};

const handleInput = (option) => {
    switch (option.trim()) {
        case '1':
            rl.question("Enter the task: ", (task) => {
                if (task.trim()) {
                    tasks.push(task.trim());
                    console.log(`Task added: ${task.trim()}`);
                } else {
                    console.log("Task cannot be empty.");
                }
                showMenu();
            });
            break;

        case '2':
            console.log("\nYour Tasks:");
            if (tasks.length === 0) {
                console.log("No tasks yet.");
            } else {
                tasks.forEach((task, index) => {
                    console.log(`${index + 1}: ${task}`);
                });
            }
            showMenu();
            break;

        case '3':
            console.log("Goodbye!");
            rl.close();
            break;

        default:
            console.log("Invalid option. Please enter 1, 2, or 3.");
            showMenu();
            break;
    }
};

showMenu();
