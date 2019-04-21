import { AppService } from './appService';
import { CommandNames } from './Enums';

interface ICommand {
	execute(data?: any): void;
	terminate(): void;
}

export abstract class AbstractCommand implements ICommand {

	public commandName: CommandNames;
	protected icon: string;
	protected tooltip: string;
	protected isDisable: boolean;
	public active: boolean;
	protected appService: AppService;

	constructor(commandName: CommandNames,
				icon: string,
				tooltip: string,
                isDisable: boolean,
                isActive: boolean) {
        this.commandName = commandName;
		this.icon = icon;
		this.tooltip = tooltip;
		this.isDisable = isDisable;
        this.active = isActive;
    }
    
	setupServices(appService: AppService) {
		this.appService = appService;
	}

	abstract execute(data?: any): void;
	abstract terminate(): void;
}

//#region Home Commands
export class Open extends AbstractCommand {
	execute(): void {
        this.active = !this.active;
        this.onOpenFileclick();
	}

	terminate(): void {
        this.active = false;
    }
    onOpenFileclick() {
		let fileElement = <HTMLInputElement>document.getElementById('fileopen');
		if (fileElement == null) {
			return;
		}
		fileElement.setAttribute('accept', 'image/*');
		fileElement.onchange = (event) => {
            this.appService.uploadedFile.emit(event.target);
            this.terminate();
		};
        fileElement.click();
	}
}
export class Cut extends AbstractCommand {
	execute(data: string): void {
        this.active = !this.active;
        this.appService.cuttedContent.emit(data);
	}

	terminate(): void { 
        this.active = !this.active;
	}
}
export class Copy extends AbstractCommand {
	execute(data: string): void {
        this.active = !this.active;
        this.appService.copiedContent.emit(data);
	}

	terminate(): void { 
        this.active = !this.active;
	}
}
export class Paste extends AbstractCommand {
	execute(data: boolean): void {
        // this.active = !this.active;
        this.appService.pasteContent.emit(data);
	}

	terminate(): void { 
        // this.active = !this.active;
	}
}
export class About extends AbstractCommand {

	execute(): void {
        this.active = !this.active;
        this.appService.displayModal.emit("about");
	}

	terminate(): void {
        this.active = !this.active;
	}
}
export class Help extends AbstractCommand {
	execute(): void {
        this.active = !this.active;
        this.appService.displayModal.emit("help");
	}

	terminate(): void { 
        this.active = !this.active;
	}
}

//#endregion

export const MenuTypeCommands = {
	Home: {
        Open,
        Cut,
        Copy,
        Paste,
		About,
		Help
	}
};
