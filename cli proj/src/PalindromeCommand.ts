import { Command } from './Command';

export class PalindromeCommand implements Command {
  async execute(input: string): Promise<string> {
    if (input === input.split('').reverse().join('')) {
      return 'True';
    } else {
      return 'False';
    }
  }
}