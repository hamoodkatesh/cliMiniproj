import { ArmstrongCommand } from './ArmstrongCommand';
import { Command } from './Command';
import { DigitsCommand } from './DigitsCommand';
import { LowerCommand } from './LowerCommand';
import { NationalizeCommand } from './NationalizeCommand';
import { PalindromeCommand } from './PalindromeCommand';

export class CommandExecutor {
  private commands: { [key: string]: Command };

  constructor() {
    this.commands = {
      '1': new PalindromeCommand(),
      '2': new LowerCommand(),
      '3': new DigitsCommand(),
      '4': new ArmstrongCommand(),
      '5': new NationalizeCommand(),
    };
  }

  async executeCommand(commandNumber: string, input: string): Promise<string> {
    const command = this.commands[commandNumber];

    if (command) {
      return command.execute(input);
    } else {
      return 'Invalid command. Please choose a valid command.';
    }
  }
}