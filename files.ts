import fs from "fs/promises";
import path from "path";
import os from "os";
import fsBase, { access } from "fs";
import { IChord, IServices } from "./IChord";

export const applicationRoot = async () => {
	return process.cwd();
};

export const canRead = async (filePath: string) => {
	return await fs.access(filePath, fsBase.constants.R_OK)
		.then(() => true)
		.catch(() => false);
}

export enum FileType {
	None,
	File,
	Directory
}

export const fileType = async (dirPath: string) => {
	try {
		const stat = await fs.stat(dirPath);
		if (stat.isDirectory()) return FileType.Directory;
		if (stat.isFile()) return FileType.File;
	} catch { }
	return FileType.None;
}

export const publicRoot = async () => {
	const appRoot = await applicationRoot();
	const reactStdPublicIndex = path.resolve(appRoot, "public", "index.html");
	if (await canRead(reactStdPublicIndex)) {
		return path.resolve(appRoot, 'public');
	}
	const wwwPublicIndex = path.resolve(appRoot, "www", "index.html");
	if (await canRead(wwwPublicIndex)) {
		return path.resolve(appRoot, "www");
	}

	return '';
}

export const buildDir = async () => {
	const appRoot = await applicationRoot();

	let buildRoot = path.join(appRoot, "build");
	let fType = await fileType(buildRoot);
	if (fType === FileType.Directory) return "/build";

	buildRoot = path.join(appRoot, "dist");
	fType = await fileType(buildRoot);
	if (fType === FileType.Directory) return "/dist";

	return '';
}

export const getConfigPath = () => {
	const configDir = path.join(os.homedir(), "restspace");
	const configPath = path.join(configDir, "config.json");
	return [ configDir, configPath ];
}

export const updateServicesJson = async (newServices: IServices) => {
	const servicesJsonPath = path.join(await applicationRoot(), 'services.json');
	let services = { chords: {} as Record<string, IChord> } as IServices;
	if (await canRead(servicesJsonPath)) {
		const existingServicesBuf = await fs.readFile(servicesJsonPath);
		services = JSON.parse(existingServicesBuf.toString());
	}
	let added = 0;
	Object.values(newServices.chords).forEach(chord => {
		if (!services.chords[chord.id]) {
			services.chords[chord.id] = chord;
			console.log(`Adding new package spec: ${chord.id}`);
			added++;
		} else {
			console.log(`Package spec ${chord.id} already exists`);
		}
	});
	await fs.writeFile(servicesJsonPath, JSON.stringify(services));
	console.log(`Written service configuration at ${servicesJsonPath}`);
	return added;
}