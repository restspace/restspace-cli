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

export const applyTransforms = async (filename: string, localDirPath: string, allFilenames: string[], extensions: string[]) => {
	if (filename.endsWith('.ts') && extensions.includes('.schema.json')) {
		const schemaFilename = filename.replace('.ts', '.schema.json');
		if (allFilenames.some(fn => fn === schemaFilename)) {
			console.log(`Not converting ${filename} as ${schemaFilename} already exists`);
			return ''; // no new file to send
		} else {
			const filePath = path.join(localDirPath, filename);
			console.log(`converting ${filePath} to ${schemaFilename}`);
			let schemaAll: string;
			try {
				schemaAll = await execPromise(`typescript-json-schema ${filePath} *`) as string;
			} catch (err) {
				console.error(`Failed to translate ${filePath} to JSON schema: ${err}`);
				return '';
			}
			const typename = filename.split('.')[0].toLowerCase();
			const schema = Object.entries(JSON.parse(schemaAll).definitions).find(([k, v]) => k.toLowerCase() === typename);
			if (!schema) {
				console.log(`Couldn't find type named ${typename}`);
				return '';
			}
			const schemaStr = JSON.stringify(schema);
			console.log('SCHEMA: ' + JSON.stringify(schemaAll));
			//const schema = tsj.createGenerator({ path: path.join(localDirPath, filename), type: "*" });

			const schemaPath = path.join(localDirPath, schemaFilename);
			await fs.writeFile(schemaPath, schemaStr);
			return schemaFilename;
		}
	}
	return filename;
}