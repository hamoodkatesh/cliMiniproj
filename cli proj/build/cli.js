"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class Command {
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return 'This is a base command and does nothing.';
        });
    }
}
class PalindromeCommand extends Command {
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (input === input.split('').reverse().join('')) {
                return 'True';
            }
            else {
                return 'False';
            }
        });
    }
}
class LowerCommand extends Command {
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (/^[a-z]+$/.test(input)) {
                return 'True';
            }
            else {
                return 'False';
            }
        });
    }
}
class DigitsCommand extends Command {
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (/^\d+$/.test(input)) {
                return 'True';
            }
            else {
                return 'False';
            }
        });
    }
}
class ArmstrongCommand extends Command {
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const num = parseInt(input);
            const numStr = num.toString();
            const numDigits = numStr.length;
            let sum = 0;
            for (let i = 0; i < numDigits; i++) {
                const digit = parseInt(numStr[i]);
                sum += Math.pow(digit, numDigits);
            }
            return sum === num ? 'True' : 'False';
        });
    }
}
class NationalizeCommand extends Command {
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`https://api.nationalize.io/?name=${input}`);
                const data = response.data;
                const mostProbable = data.country[0];
                return `${mostProbable.country_id} ${mostProbable.probability * 100}%`;
            }
            catch (error) {
                console.error('Error fetching nationality data:', error);
                return 'Unknown';
            }
        });
    }
}
class CLI {
    constructor() {
        this.commands = {
            '1': new PalindromeCommand(),
            '2': new LowerCommand(),
            '3': new DigitsCommand(),
            '4': new ArmstrongCommand(),
            '5': new NationalizeCommand(),
            '6': {
                execute(input) {
                    return __awaiter(this, void 0, void 0, function* () {
                        console.log('Exiting the application.');
                        process.exit(0);
                        return '';
                    });
                },
            },
        };
    }
    run() {
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
            readline.question('Enter the number of the command: ', (command) => {
                if (this.commands[command]) {
                    if (command === '6') {
                        this.commands[command].execute('');
                        readline.close();
                    }
                    else {
                        askInput(command);
                    }
                }
                else {
                    console.log('Invalid command. Please choose a valid command.');
                    askCommand();
                }
            });
        };
        const askInput = (command) => {
            readline.question('Enter the input: ', (input) => {
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
