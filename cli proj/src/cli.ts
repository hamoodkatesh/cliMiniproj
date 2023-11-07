import * as readline from 'readline';
import { CommandExecutor } from './CommandExecutor';

export class CLI {
  private commandExecutor: CommandExecutor;

  constructor() {
    this.commandExecutor = new CommandExecutor();
  }

  async run(): Promise<void> {
    console.log('The available commands are:');
    console.log('1- Palindrome - Check if the input is a palindrome');
    console.log('2- Lower - Check if all characters in the input are lowercase');
    console.log('3- Digits - Check if all characters in the input are digits');
    console.log('4- Armstrong - Check if the input is an "Armstrong Number"');
    console.log('5- Nationalize - Check the nationality probability of a given first name');
    console.log('6 - Exit - Exit successfully from the application');

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const askCommand = () => {
      rl.question('Enter the number of the command: ', async (command) => {
        if (command === '6') {
          console.log('Exiting the application.');
          rl.close();
        } else {
          askInput(command);
        }
      });
    };

    const askInput = (command: string) => {
      rl.question('Enter the input: ', async (input) => {
        const result = await this.commandExecutor.executeCommand(command, input);
        console.log(`The answer is: ${result}`);
        askCommand();
      });
    };

    askCommand();
  }
}