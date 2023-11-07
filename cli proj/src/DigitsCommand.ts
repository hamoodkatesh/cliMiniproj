import { Command } from './Command';

export class DigitsCommand implements Command {
  async execute(input: string): Promise<string> {
    if (/^\d+$/.test(input)) {
      return 'True';
    } else {
      return 'False';
    }
  }
}