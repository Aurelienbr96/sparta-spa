const { exec } = require('child_process');

function runCommand(command: string) {
  return new Promise((resolve, reject) => {
    exec(command, (error: any, stdout: unknown, stderr: any) => {
      if (error) {
        console.error(`exec error: ${error}`);
        reject(error);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
      resolve(stdout);
    });
  });
}

export async function resetBd() {
  try {
    await runCommand('cd ../backend && yarn reset');
  } catch (error) {
    console.log('an error occured:', error);
  }
}

export async function seedBackend() {
  try {
    // Run the seed script
    console.log('Seeding the database for E2E tests...');
    await runCommand('cd ../backend && yarn seed:e2efront');

    // Start Cypress
    console.log('Starting Cypress tests...');
    await runCommand('test:e2eopen');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}
