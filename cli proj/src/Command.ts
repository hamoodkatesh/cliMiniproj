export interface Command {
    execute(input: string): Promise<string>;
  }