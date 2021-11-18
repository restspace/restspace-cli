import * as path from "path";
import fs from "fs/promises";
import { exec } from "child_process";
import * as TJS from "typescript-json-schema";
import { ModuleKind, ScriptTarget } from "typescript";

const execPromise = async (cmd: string) => new Promise((resolve, reject) => exec(cmd, (error, stdout, stderr) => {
	if (error) {
		reject(error);
	} else if (stderr) {
		reject(stderr);
	} else {
		resolve(stdout);
	}
}));

export const applyTransforms = async (filePath: string, allFilenames: string[], extensions: string[]) => {
	if (filePath.endsWith('.ts') && extensions.includes('.schema.json')) {
		const schemaPath = filePath.replace('.ts', '.schema.json');
		if (allFilenames.some(fn => fn === schemaPath)) {
			console.log(`Not converting ${filePath} as ${schemaPath} already exists`);
			return ''; // no new file to send
		} else {
			console.log(`converting ${filePath} to ${schemaPath}`);
			let schema: TJS.Definition | null;
			let typename = path.basename(filePath).split('.')[0];
			typename = typename.charAt(0).toUpperCase() + typename.substring(1);
			try {
				//schemaAllStr = await execPromise(`typescript-json-schema ${filePath} * --propOrder --validationKeywords editor pathPattern`) as string;
				const compilerOptions: TJS.CompilerOptions = {
					skipLibCheck: true,
					target: ScriptTarget.ES5,
					module: ModuleKind.CommonJS,
					lib: [ "ES2017" ],
					strict: true
				};
				const settings: TJS.PartialArgs = {
					propOrder: true,
					validationKeywords: [ 'editor', 'pathPattern' ]
				}
				const program = TJS.getProgramFromFiles([ filePath ], compilerOptions);
				schema = TJS.generateSchema(program, typename, settings);
			} catch (err) {
				console.error(`Failed to translate ${filePath} to JSON schema: ${err}`);
				return '';
			}

			// const schemaAll = JSON.parse(schemaAllStr);
			// const definitionsEntries = Object.entries(schemaAll.definitions);
			// const schema = definitionsEntries.find(([k]) => k.toLowerCase() === typename)?.[1] as any;
			// if (!schema) {
			// 	console.log(`Couldn't find type named ${typename}`);
			// 	return '';
			// } else if (definitionsEntries.length > 1) {
			// 	schema.definitions = Object.fromEntries(definitionsEntries.filter(([k]) => k.toLowerCase() !== typename));
			// }

			const schemaStr = JSON.stringify(schema);

			await fs.writeFile(schemaPath, schemaStr);
			return schemaPath;
		}
	}
	return filePath;
}