import { Command } from './Command';

export class LowerCommand implements Command {
  async execute(input: string): Promise<string> {
    if (/^[a-z]+$/.test(input)) {
      return 'True';
    } else {
      return 'False';
    }
  }
}