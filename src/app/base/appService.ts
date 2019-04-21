import { Injectable, EventEmitter } from '@angular/core';
import { AbstractCommand } from './AbstractCommands';

@Injectable()
export class AppService {

    private allCommands= [];
    public cuttedContent = new EventEmitter();
    public copiedContent = new EventEmitter();
    public displayModal = new EventEmitter();
    public uploadedFile = new EventEmitter();
    public pasteContent = new EventEmitter<boolean>();

    constructor() { }
    
    addCommand(command: AbstractCommand): any {
		let name = command.commandName;
		this.allCommands[name] = command;
	}

}
