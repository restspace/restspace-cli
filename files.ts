import fs from "fs/promises";
import path from "path";
import fsBase, { access } from "fs";

export const applicationRoot = async () => {
	return process.cwd();
};

export const canRead = async (filePath: string) => {
	return await fs.access(filePath, fsBase.constants.R_OK)
		.then(() => true)
		.catch(() => false);
}

export const publicRoot = async () => {
	const appRoot = await applicationRoot();
	const reactStdPublicIndex = path.resolve(appRoot, "public", "index.html");
	if (await canRead(reactStdPublicIndex)) {
		return path.resolve(appRoot, 'public');
	}

	return '';
}