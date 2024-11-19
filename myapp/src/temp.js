const { exec } = require('child_process');


const func =
    exec('pygbag .', { cwd: 'C:\\Users\\yagna\\OneDrive\\Desktop\\LJ\\Sem 4\\INDIVIDUAL\\pygbag' }, (error, stdout, stderr) => {
        console.log('hello')
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
