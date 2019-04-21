import { Component, OnInit } from '@angular/core';
import { AppService } from '../base/appService';
import { CommandFactory } from '../base/CommandFactory';
import { AbstractCommand, MenuTypeCommands } from '../base/AbstractCommands';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	sampleText: string;
	selectedText: string;
	public tabItems = [];
	public contentsArr: string[] = [];
	isPasteCommandExecuted: boolean = false;
	commandFactory: CommandFactory = null;
	abstractCommands: Array<AbstractCommand> = [];
	lastCommand: AbstractCommand;
	file: any;
	imageShow: string | ArrayBuffer;
	constructor( private appService: AppService ) { }

	ngOnInit() {
		this.appService.cuttedContent.subscribe((res: any) => {
			if(res) {
				this.sampleText = this.sampleText.replace(res, '');
			}
		});
		
		this.appService.copiedContent.subscribe((res: any) => {
			if(res) {
				this.selectedText = res;
			}
		});

		this.appService.pasteContent.subscribe((res: any) => {
			if(res) {
				this.contentsArr.push(res);
			}
			this.selectedText = '';
		})

		this.appService.displayModal.subscribe((cmdName: string) => {
			alert(cmdName.toUpperCase() + " Coming Soon...")
		})

		this.appService.uploadedFile.subscribe((res: any) => {
			this.file = res.files[0]
			const reader = new FileReader();
			reader.readAsDataURL(this.file);
			reader.onload = (event) => {
			this.imageShow = (<FileReader>event.target).result;
			}
		})

		this.commandFactory = new CommandFactory();
		const commandType = MenuTypeCommands['Home'];
		const iconsList = [];
		const jsonItem = {
			icons: []
		}
		for (const elem in commandType) {
			const commandTypeValue = commandType[elem];
			const command = this.commandFactory.createCommand(commandTypeValue);
			command.setupServices(this.appService);
			this.appService.addCommand(command);
			iconsList.push(command);
		}
		jsonItem.icons = iconsList;
		this.tabItems.push(jsonItem);
		
		this.sampleText = "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.";
	  }
	
	private executeCurrentCommand(currentCommand): void {
		this.lastCommand = currentCommand;
		this.lastCommand.execute(this.selectedText);
	}

	private terminateCommand(command: AbstractCommand): void {
		command.terminate();
		this.lastCommand = null;
	}

	onTextSelection = (event: any): void => {
		this.selectedText = window.getSelection().toString();
	}

	executeCommand = (currentCommand: AbstractCommand): void => {
		if (currentCommand && currentCommand.active === true) {
			this.terminateCommand(currentCommand);
		}
		else {
			if(this.lastCommand) {
				this.lastCommand.terminate();
			}
			this.executeCurrentCommand(currentCommand);
		}
	}

	removeFile(): void {
		this.imageShow = null;
	}
}
