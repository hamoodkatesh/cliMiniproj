import axios from 'axios';

class Command {
  async execute(input: string): Promise<string> {
    return 'This is a base command and does nothing.';
  }
}

class PalindromeCommand extends Command {
  async execute(input: string): Promise<string> {
    if (input === input.split('').reverse().join('')) {
      return 'True';
    } else {
      return 'False';
    }
  }
}

class LowerCommand extends Command {
  async execute(input: string): Promise<string> {
    if (/^[a-z]+$/.test(input)) {
      return 'True';
    } else {
      return 'False';
    }
  }
}

class DigitsCommand extends Command {
  async execute(input: string): Promise<string> {
    if (/^\d+$/.test(input)) {
      return 'True';
    } else {
      return 'False';
    }
  }
}

class ArmstrongCommand extends Command {
  async execute(input: string): Promise<string> {
    const num = parseInt(input);
    const numStr = num.toString();
    const numDigits = numStr.length;
    let sum = 0;

    for (let i = 0; i < numDigits; i++) {
      const digit = parseInt(numStr[i]);
      sum += digit ** numDigits;
    }

    return sum === num ? 'True' : 'False';
  }
}

class NationalizeCommand extends Command {
  async execute(input: string): Promise<string> {
    try {
      const response = await axios.get(`https://api.nationalize.io/?name=${input}`);
      const data = response.data;
      const mostProbable = data.country[0];
      return `${mostProbable.country_id} ${mostProbable.probability * 100}%`;
    } catch (error) {
      console.error('Error fetching nationality data:', error);
      return 'Unknown';
    }
  }
}

class CLI {
  private commands: { [key: string]: Command };

  constructor() {
    this.commands = {
      '1': new PalindromeCommand(),
      '2': new LowerCommand(),
      '3': new DigitsCommand(),
      '4': new ArmstrongCommand(),
      '5': new NationalizeCommand(),
      '6': {
        async execute(input: string): Promise<string> {
          console.log('Exiting the application.');
          process.exit(0);
          return '';
        },
      },
    };
  }

  run(): void {
    console.log('The available commands are:');
    console.log('1- Palindrome - Check if the input is a palindrome');
    console.log('2- Lower - Check if all characters in the input are lowercase');
    console.log('3- Digits - Check if all characters in the input are digits');
    console.log('4- Armstrong - Check if the input is an "Armstrong Number"');
    console.log('5- Nationalize - Check the nationality probability of a given first name');
    console.log('6 - Exit - Exit successfully from the application');

    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const askCommand = () => {
      readline.question('Enter the number of the command: ', (command: string) => {
        if (this.commands[command]) {
          if (command === '6') {
            this.commands[command].execute('');
            readline.close();
          } else {
            askInput(command);
          }
        } else {
          console.log('Invalid command. Please choose a valid command.');
          askCommand();
        }
      });
    };

    const askInput = (command: string) => {
      readline.question('Enter the input: ', (input: string) => {
        this.commands[command].execute(input).then((result) => {
          console.log(`The answer is: ${result}`);
          askCommand();
        });
      });
    };

    askCommand();
  }
}

const cli = new CLI();
cli.run();