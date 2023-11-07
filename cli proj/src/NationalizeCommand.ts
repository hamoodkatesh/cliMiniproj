import axios from 'axios';
import { Command } from './Command';

export class NationalizeCommand implements Command {
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