import { Command } from './Command';

export class ArmstrongCommand implements Command {
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