import * as vscode from 'vscode';
import { quickPickFormatString, triggerDone } from './quickPick';

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('bsl-format-string-wizard.helloWorld', () => {
	});

	const quickPickDisposable = vscode.commands.registerCommand('bsl-format-string-wizard.quickPickFormatString', () => {
		quickPickFormatString();
	});

	const handleCtrlEnterDisposable = vscode.commands.registerCommand('bsl-format-string-wizard.handleCtrlEnter', () => {
		triggerDone();
	});

	context.subscriptions.push(disposable, quickPickDisposable, handleCtrlEnterDisposable);
}

export function deactivate() {}
