import * as path from "path";
import fs from "fs/promises";
import { exec } from "child_process";

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
			let schemaAllStr: string;
			try {
				schemaAllStr = await execPromise(`typescript-json-schema ${filePath} * --propOrder --validationKeywords editor pathPattern`) as string;
			} catch (err) {
				console.error(`Failed to translate ${filePath} to JSON schema: ${err}`);
				return '';
			}
			const typename = path.basename(filePath).split('.')[0].toLowerCase();
			const schemaAll = JSON.parse(schemaAllStr);
			const definitionsEntries = Object.entries(schemaAll.definitions);
			const schema = definitionsEntries.find(([k]) => k.toLowerCase() === typename)?.[1] as any;
			if (!schema) {
				console.log(`Couldn't find type named ${typename}`);
				return '';
			} else if (definitionsEntries.length > 1) {
				schema.definitions = Object.fromEntries(definitionsEntries.filter(([k]) => k.toLowerCase() !== typename));
			}

			const schemaStr = JSON.stringify(schema);

			await fs.writeFile(schemaPath, schemaStr);
			return schemaPath;
		}
	}
	return filePath;
}