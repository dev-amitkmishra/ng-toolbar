import { CommandNames } from './Enums';
import { AbstractCommand,
	About as About, Help, MenuTypeCommands, Open, Copy, Cut, Paste } from './AbstractCommands';

export class CommandFactory {
	public createCommand(type: any) {
		let command: AbstractCommand;
		switch (type) {
            case MenuTypeCommands.Home.Open:
                command = new Open(CommandNames.Open, 'folder-open-o', 'Open file', 
                false, false)
                break;
                case MenuTypeCommands.Home.Cut:
                command = new Cut(CommandNames.Cut, 'cut', 'Cut', 
                false, false)
                break;
                case MenuTypeCommands.Home.Copy:
                command = new Copy(CommandNames.Copy, 'copy', 'Copy', 
                false, false)
                break;
                case MenuTypeCommands.Home.Paste:
                command = new Paste(CommandNames.Paste, 'paste', 'Paste', 
                false, false)
                break;
			case MenuTypeCommands.Home.About:
                command = new About(CommandNames.About, 'info', 'About', 
                false, false);
				break;
			case MenuTypeCommands.Home.Help:
                command = new Help(CommandNames.Help, 'question', 'Help', false, false);
				break;
			default:
				break;
		}
		return command;
	}
}
