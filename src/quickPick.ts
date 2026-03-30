import * as vscode from 'vscode';
import { localeParameters, numberParameters, dateParameters, booleanParameters, ParameterDefinition, ParameterValueType } from './parameters';

interface FormatStringInfo {
	formatString: string;
	stringRange?: vscode.Range;
}

interface NavigationState {
	currentType?: ParameterType;
	selectedParams: Map<string, string>;
	formatInfo?: FormatStringInfo;
}

enum ParameterType {
    Locale = 'locale',
    Number = 'number',
    Date = 'date',
    Boolean = 'boolean'
}

let activeNavigationState: NavigationState | undefined;
let activeQuickPick: vscode.QuickPick<any> | undefined;
let activeResolve: ((value: any) => void) | undefined;

function getUseRussianTerms(): boolean {
    const config = vscode.workspace.getConfiguration('bsl-format-string-wizard');
    return config.get<boolean>('useRussianTerms') ?? false;
}

function getTerm(def: ParameterDefinition, useRussianTerms: boolean): string {
    return useRussianTerms ? def.rusTerm : def.engTerm;
}

function getAllParameterDefinitions(): ParameterDefinition[] {
	return [...localeParameters, ...numberParameters, ...dateParameters, ...booleanParameters];
}

function getParameterDefinitionsByType(type: ParameterType): ParameterDefinition[] {
	switch (type) {
		case ParameterType.Locale:
			return localeParameters;
		case ParameterType.Number:
			return numberParameters;
		case ParameterType.Date:
			return dateParameters;
		case ParameterType.Boolean:
			return booleanParameters;
		default:
			return [];
	}
}

function isValidParameterType(type: ParameterType | undefined): type is ParameterType {
	if (type === undefined) {
		return false;
	}
	const validTypes = [ParameterType.Locale, ParameterType.Number, ParameterType.Date, ParameterType.Boolean];
	return validTypes.includes(type);
}

function createQuickPickItemWithButton<T extends vscode.QuickPickItem & { paramId?: string; paramType?: ParameterType }>(
	config: {
		label: string;
		hasValue: boolean;
		description?: string;
		paramId?: string;
		paramType?: ParameterType;
		iconPath?: vscode.ThemeIcon;
	}
): T {
	const buttons = config.hasValue ? [
		{
			iconPath: new vscode.ThemeIcon('eraser'),
			tooltip: vscode.l10n.t('Clear')
		}
	] : [];

	const item: any = {
		label: config.label,
		description: config.description,
		buttons,
		paramId: config.paramId,
		paramType: config.paramType
	};
	if (config.iconPath) {
		item.iconPath = config.iconPath;
	}
	return item as T;
}

function convertBooleanInputToStoredValue(inputValue: string): string | undefined {
	return inputValue === vscode.l10n.t('Yes') ? '' : undefined;
}

function createEnumQuickPickItems(values: { value: string; label?: string }[]): (vscode.QuickPickItem & { value?: string })[] {
	const items: (vscode.QuickPickItem & { value?: string })[] = [];
	for (let i = 0; i < values.length; i++) {
		const v = values[i];
		const item: vscode.QuickPickItem & { value?: string } = {
			label: v.label ?? v.value,
			value: v.value
		};

		if (v.value === '') {
			item.iconPath = new vscode.ThemeIcon('skip');
		}
		items.push(item);

		if (v.value === '' && i < values.length - 1) {
			items.push({ kind: vscode.QuickPickItemKind.Separator, label: '' });
		}
	}
	return items;
}

function getCurrentFormatStringAtCursor(): FormatStringInfo | null {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return null;
	}

	const document = editor.document;
	const cursorOffset = document.offsetAt(editor.selection.active);

	let text = document.getText();
	const quoteRegex = /"(?:""|\r?\n\s*\||[^"])*"/g;

	let currentString;
	let stringRange: vscode.Range | undefined = undefined;

	let match;
	while ((match = quoteRegex.exec(text)) !== null) {
		const start = match.index;
		const end = match.index + match[0].length;
		const content = match[0];

		if (cursorOffset >= start && cursorOffset <= end) {
			currentString = content.slice(1, -1);
			stringRange = new vscode.Range(
				document.positionAt(start),
				document.positionAt(end)
			);
			break;
		}
	}

	if (!currentString) {
		return { formatString: '', stringRange: undefined };
	}

	currentString = currentString
		.replace(/^[ \t]*\|/gm, '')
		.replace(/""/g, '"')
		.replace(/''/g, '\'');

	return { formatString: currentString, stringRange };
}

function parseCurrentLineAndSetParams(selectedParams: Map<string, string>, formatInfo: FormatStringInfo | null): void {
	if (!formatInfo || !formatInfo.formatString) {
		return;
	}
	const currentString = formatInfo.formatString;

	const regex = /\s*([^;=\s]+)\s*=\s*([^;']*(?:'[^']*'[^;']*)*)/g;
	let match;
	while ((match = regex.exec(currentString)) !== null) {
		const key = match[1];
		let value = match[2];

		if (value.startsWith("'") && value.endsWith("'")) {
			value = value.slice(1, -1);
		}

		const allParamDefs = getAllParameterDefinitions();
		const paramDef = allParamDefs.find(def => def.rusTerm === key || def.engTerm === key);
		if (paramDef) {
			selectedParams.set(paramDef.id, value);
		}
	}
}

function setActiveQuickPick(qp: vscode.QuickPick<any>, resolve: (value: any) => void) {
	activeQuickPick = qp;
	activeResolve = resolve;
	vscode.commands.executeCommand('setContext', 'isMyQuickPickActive', true);
}

function clearActiveQuickPick() {
	activeQuickPick = undefined;
	activeResolve = undefined;
	vscode.commands.executeCommand('setContext', 'isMyQuickPickActive', false);
}

export function triggerDone() {
	if (activeResolve) {
		activeResolve('done');
		if (activeQuickPick) {
			activeQuickPick.hide();
		}
		clearActiveQuickPick();
	}
}

function validateInput(value: string, paramDef: ParameterDefinition): string | null {
	if (paramDef.type === ParameterValueType.Number) {
		const num = Number(value);
		const isNumber = value.trim() !== '' && !isNaN(num);
		const constraints = paramDef.constraints;

		if (!(isNumber && Number.isInteger(num)) && !constraints?.values) {
			return vscode.l10n.t('Must be an integer');
		}
		if (constraints?.min !== undefined && num < constraints.min) {
			return vscode.l10n.t("Must be ≥ {0}", constraints.min);
		}
		if (constraints?.max !== undefined && num > constraints.max) {
			return vscode.l10n.t("Must be ≤ {0}", constraints.max);
		}

		if (constraints?.values && constraints.optionalValues === false) {
			const valueStrings = constraints.values.map(v => v.value);
			if (!valueStrings.includes(value)) {
				return vscode.l10n.t('Allowed values: {0}', valueStrings.join(', '));
			}
		}
	}
	if (paramDef.type === ParameterValueType.String) {
		const constraints = paramDef.constraints;
		if (constraints?.maxLength !== undefined && value.length > constraints.maxLength) {
			return vscode.l10n.t('Max length {0}', constraints.maxLength);
		}

		if (constraints?.values && constraints.optionalValues === false) {
			const valueStrings = constraints.values.map(v => v.value);
			if (!valueStrings.includes(value)) {
				return vscode.l10n.t('Allowed values: {0}', valueStrings.join(', '));
			}
		}
	}
	return null;
}

async function pickParameterValue(paramDef: ParameterDefinition, defaultValue?: string): Promise<string | undefined> {
    if (paramDef.type === ParameterValueType.Boolean) {
        const items = [vscode.l10n.t('Yes'), vscode.l10n.t('No')];
        const boolPick = await vscode.window.showQuickPick(items, {
            placeHolder: vscode.l10n.t('Select a value')
        });
        if (boolPick === undefined) {
            return undefined;
        }
        return boolPick;
	} else if (paramDef.constraints?.values) {
		const valueOptions = paramDef.constraints.values.map(v => v.value);
		const isStrictEnum = paramDef.constraints.optionalValues === false;

		if (isStrictEnum) {
			const items = createEnumQuickPickItems(paramDef.constraints.values);
			const valuePick = await vscode.window.showQuickPick(items, {
				placeHolder: vscode.l10n.t('Select a value')
			});
			if (valuePick === undefined) {
				return undefined;
			}
			return valuePick.value;
		} else {
			const quickPick = vscode.window.createQuickPick();
			const staticItems = createEnumQuickPickItems(paramDef.constraints.values);

			quickPick.placeholder = vscode.l10n.t('Select or enter a value');
			quickPick.items = staticItems;
			if (defaultValue !== undefined && defaultValue !== '') {
				quickPick.value = defaultValue;

				const matchingItem = staticItems.find(item => item.value === defaultValue);
				if (matchingItem) {
					quickPick.activeItems = [matchingItem];
				}
			}
			let customItem: (vscode.QuickPickItem & { value?: string }) | undefined;
			const promise = new Promise<string | undefined>((resolve) => {
				quickPick.onDidAccept(() => {
					const selected = quickPick.activeItems[0];
					let value: string;
					if (selected && 'value' in selected) {
						value = (selected as any).value;
					} else {
						value = quickPick.value || (selected ? selected.label : '');
					}

					const error = validateInput(value, paramDef);
					if (error) {
						(quickPick as any).validationMessage = error;
						return;
					}
					resolve(value);
					quickPick.hide();
				});

				quickPick.onDidHide(() => {
					resolve(undefined);
				});
			});

			quickPick.onDidChangeValue(value => {
				(quickPick as any).validationMessage = undefined;

				const items = staticItems.slice();
				let newCustomItem: (vscode.QuickPickItem & { value?: string }) | undefined;

				const emptyValueLabel = vscode.l10n.t('<empty>');
				if (value && (!valueOptions.includes(value) || value === emptyValueLabel)) {
					const error = validateInput(value, paramDef);
					if (error) {
						newCustomItem = {
							label: value,
							description: error,
							iconPath: new vscode.ThemeIcon('error'),
							value: value
						};

						(quickPick as any).validationMessage = error;
					} else {
						newCustomItem = { label: value, description: vscode.l10n.t('(custom)'), value: value };
					}
					items.unshift(newCustomItem);
				}
				customItem = newCustomItem;
				quickPick.items = items;

				if (newCustomItem) {
					quickPick.activeItems = [newCustomItem];
				}
			});

			quickPick.show();
			const result = await promise;
			quickPick.dispose();

			if (result === undefined) {
				return undefined;
			}
			return result;
		}
	} else {
		const inputValue = await vscode.window.showInputBox({
			placeHolder: vscode.l10n.t('Enter a value'),
			value: defaultValue,
			validateInput: (value) => validateInput(value, paramDef)
		});
		return inputValue;
	}
}

function buildFormatString(selectedParams: Map<string, string>): string | null {
	const allParamDefs = getAllParameterDefinitions();
	const paramDefMap = new Map<string, ParameterDefinition>();
	allParamDefs.forEach(def => paramDefMap.set(def.id, def));

	if (selectedParams.size === 0) {
		return null;
	}
	const useRussianTerms = getUseRussianTerms();
	const paramStrings = Array.from(selectedParams.entries())
		.map(([id, value]) => {
			const def = paramDefMap.get(id);
			if (!def) {
				return `${id}=${value}`;
			}

			if (def.type === ParameterValueType.Boolean) {
				return `${getTerm(def, useRussianTerms)}=`;
			}

			let formattedValue = value;
			if (def.type === ParameterValueType.String && /[\s"';]/.test(value)) {
				formattedValue = value.replace(/"/g, '""').replace(/'/g, "''");

				formattedValue = `'${formattedValue}'`;
			}
			return `${getTerm(def, useRussianTerms)}=${formattedValue}`;
		})
		.filter((s): s is string => s !== null);

	if (paramStrings.length === 0) {
		return null;
	}
	return '"' + paramStrings.join('; ') + '"';
}

function insertFormatStringAndClear(formatString: string) {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		activeNavigationState = undefined;
		return;
	}


	const formatInfo = activeNavigationState?.formatInfo;
	let targetRange: vscode.Range | undefined = undefined;

	if (formatInfo?.stringRange) {
		targetRange = formatInfo.stringRange;
	}

	editor.edit(editBuilder => {
		if (targetRange) {
			editBuilder.replace(targetRange, formatString);
		} else {
			editBuilder.insert(editor.selection.active, formatString);
		}
	});

	activeNavigationState = undefined;
}
const doneButton = {
	iconPath: new vscode.ThemeIcon('check'),
	tooltip: vscode.l10n.t('Done (CTRL+Enter)')
};

async function showStartScreen(): Promise<void> {
	if (!activeNavigationState) {
		return;
	}

	function buildTypeItemsWithButtons(): (vscode.QuickPickItem & { paramId?: string; paramType?: ParameterType })[] {
		const localeValue = activeNavigationState!.selectedParams.get('Locale');
		const hasLocaleValue = localeValue !== undefined && localeValue !== '';
		
		const localeItem = createQuickPickItemWithButton<vscode.QuickPickItem & { paramId?: string; paramType?: ParameterType }>({
			label: vscode.l10n.t('Language (Country)'),
			description: localeValue ? `= ${localeValue}` : undefined,
			hasValue: hasLocaleValue,
			paramId: 'Locale',
			paramType: ParameterType.Locale
		});
		
		const items: (vscode.QuickPickItem & { paramId?: string; paramType?: ParameterType })[] = [
			localeItem,
			{ kind: vscode.QuickPickItemKind.Separator, label: '' },
			{ label: vscode.l10n.t('Number'), iconPath: new vscode.ThemeIcon('symbol-numeric'), paramType: ParameterType.Number },
			{ label: vscode.l10n.t('Date'), iconPath: new vscode.ThemeIcon('calendar'), paramType: ParameterType.Date },
			{ label: vscode.l10n.t('Boolean'), iconPath: new vscode.ThemeIcon('symbol-boolean'), paramType: ParameterType.Boolean }
		];
		return items;
	}

	const quickPick = vscode.window.createQuickPick();
	quickPick.placeholder = vscode.l10n.t("Select a type");
	quickPick.items = buildTypeItemsWithButtons();
	quickPick.buttons = [doneButton];

	const result = await new Promise<'done' | 'cancel' | { type: ParameterType }>((resolve) => {
		setActiveQuickPick(quickPick, resolve);

		quickPick.onDidTriggerItemButton(async (event) => {
			const item = event.item as (vscode.QuickPickItem & { paramId?: string });
			if (item.paramId === 'Locale') {
				activeNavigationState!.selectedParams.delete(item.paramId);

				quickPick.items = buildTypeItemsWithButtons();
			}
		});

		quickPick.onDidTriggerButton((button) => {
			if (button === doneButton) {
				resolve('done');
				quickPick.hide();
			}
		});

		quickPick.onDidAccept(() => {
			const selected = quickPick.activeItems[0] as (vscode.QuickPickItem & { paramType?: ParameterType });
			if (!selected) {
				return;
			}
			const paramType = selected.paramType;
			if (isValidParameterType(paramType)) {
				resolve({ type: paramType });
				quickPick.hide();
			}
		});

		quickPick.onDidHide(() => {
			clearActiveQuickPick();
			resolve('cancel');
		});

		quickPick.show();
	});

	quickPick.dispose();

	if (result === 'cancel') {
		activeNavigationState = undefined;
		return;
	}
	if (result === 'done') {
		const formatString = buildFormatString(activeNavigationState.selectedParams);
		if (!formatString) {
			activeNavigationState = undefined;
			return;
		}
		insertFormatStringAndClear(formatString);
		activeNavigationState = undefined;
		return;
	}


	const type = result.type;
	activeNavigationState.currentType = type;
	await showTypeSettings(type);
}

async function showTypeSettings(type: ParameterType): Promise<void> {
	if (!activeNavigationState) {
		return;
	}


	const paramDefs = getParameterDefinitionsByType(type);

	if (type === ParameterType.Locale && paramDefs.length === 1) {
		const localeParam = paramDefs[0];
		const value = await pickParameterValue(localeParam);
		if (value !== undefined) {
			activeNavigationState.selectedParams.set(localeParam.id, value);
		}

		await showStartScreen();
		return;
	}

	const selectedParams = activeNavigationState.selectedParams;

	function buildParamItemsWithButtons(): (vscode.QuickPickItem & { paramId?: string })[] {
		const items: (vscode.QuickPickItem & { paramId?: string })[] = paramDefs.map(def => {
			const value = selectedParams.get(def.id);
			let displayValue: string | undefined = undefined;
			if (value !== undefined) {
				if (def.type === ParameterValueType.Boolean) {
					displayValue = displayValue !== undefined ? vscode.l10n.t('Yes') : '';
				} else {
					let emptyLabel = vscode.l10n.t('<empty>');
					if (def.constraints?.values) {
						const emptyItem = def.constraints.values.find(v => v.value === '');
						if (emptyItem?.label) {
							emptyLabel = emptyItem.label;
						}
					}

					if (value === '') {
						displayValue = '';
					} else if (value === emptyLabel) {
						displayValue = value;
					} else {
						displayValue = value;
					}
				}
			}
			const hasValue = def.type === ParameterValueType.Boolean ? value !== undefined : value !== undefined;
			return createQuickPickItemWithButton<vscode.QuickPickItem & { paramId?: string }>({
				label: def.label,
				description: displayValue !== undefined ? `= ${displayValue}` : undefined,
				hasValue,
				paramId: def.id
			});
		});
		return items;
	}

	const quickPick = vscode.window.createQuickPick();
	quickPick.buttons = [vscode.QuickInputButtons.Back, doneButton];
	quickPick.placeholder = vscode.l10n.t("Select a parameter");
	quickPick.items = buildParamItemsWithButtons();

	const result = await new Promise<'back' | 'done' | { paramDef: ParameterDefinition } | undefined>((resolve) => {
		setActiveQuickPick(quickPick, resolve);

		quickPick.onDidTriggerItemButton(async (event) => {
			const item = event.item as (vscode.QuickPickItem & { paramId?: string });
			if (item.paramId) {
				selectedParams.delete(item.paramId);

				quickPick.items = buildParamItemsWithButtons();
			}
		});

		quickPick.onDidTriggerButton((button) => {
			if (button === vscode.QuickInputButtons.Back) {
				resolve('back');
				quickPick.hide();
			} else if (button === doneButton) {
				resolve('done');
				quickPick.hide();
			}
		});

		quickPick.onDidAccept(() => {
			const selected = quickPick.activeItems[0] as (vscode.QuickPickItem & { paramId?: string });
			if (!selected) {
				return;
			}
			const paramId = selected.paramId;
			if (paramId) {
				const paramDef = paramDefs.find(def => def.id === paramId);
				if (paramDef) {
					resolve({ paramDef });
					quickPick.hide();
				}
			}
		});

		quickPick.onDidHide(() => {
			clearActiveQuickPick();
			resolve('back');
		});

		quickPick.show();
	});

	quickPick.dispose();

	if (result === undefined) {
		activeNavigationState = undefined;
		return;
	}
	if (result === 'back') {
		await showStartScreen();
		return;
	}
	if (result === 'done') {
		const formatString = buildFormatString(selectedParams);
		if (!formatString) {
			activeNavigationState = undefined;
			return;
		}
		insertFormatStringAndClear(formatString);
		activeNavigationState = undefined;
		return;
	}


	const { paramDef } = result;
	await showValueInput(paramDef);
}

async function showValueInput(paramDef: ParameterDefinition): Promise<void> {
	if (!activeNavigationState) {
		return;
	}

	const selectedParams = activeNavigationState.selectedParams;

	let defaultValue: string | undefined = undefined;
	if (!selectedParams.has(paramDef.id) && paramDef.constraints?.predefinedValue !== undefined) {
		defaultValue = paramDef.constraints.predefinedValue;
	}


	const inputValue = await pickParameterValue(paramDef, defaultValue);
	if (inputValue === undefined) {
		await showTypeSettings(activeNavigationState.currentType!);
		return;
	}

	let storedValue: string | undefined = inputValue;

	if (paramDef.type === ParameterValueType.Boolean) {
		const processed = convertBooleanInputToStoredValue(inputValue);
		if (processed !== undefined) {
			storedValue = processed;
			selectedParams.set(paramDef.id, storedValue);
		} else {
			storedValue = undefined;
			if (selectedParams.has(paramDef.id)) {
				selectedParams.delete(paramDef.id);
			}
		}
	} else {
		if (paramDef.type === ParameterValueType.Number && !paramDef.constraints?.values) {
			const num = Number(inputValue);
			storedValue = num.toString();
		}
	}

	if (storedValue !== undefined) {
		selectedParams.set(paramDef.id, storedValue);
	}


	await showTypeSettings(activeNavigationState.currentType!);
}

export async function quickPickFormatString() {
	const formatInfo = getCurrentFormatStringAtCursor();
	if (!formatInfo) {
		return;
	}

	if (!activeNavigationState) {
		activeNavigationState = {
			selectedParams: new Map<string, string>(),
			formatInfo
		};
	} else {
		activeNavigationState.formatInfo = formatInfo;
	}
	parseCurrentLineAndSetParams(activeNavigationState.selectedParams, formatInfo);
	await showStartScreen();
}