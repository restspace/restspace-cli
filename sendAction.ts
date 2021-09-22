import fetch from "node-fetch";
import { login } from "./api";
import fs from "fs/promises";
import path from "path";
import { applicationRoot } from "./files";
import { IChordServiceConfig } from "./IServiceConfig";
import { resolvePathPattern } from "./resolvePathPattern";
import inquirer from "inquirer";
import { IChord } from "./IChord";
import { applyTransforms } from "./applyTransforms";

const syncLocalDir = async (absDirPath: string, urlBase: string, newService: IChordServiceConfig, headers: Record<string, string>) => {
	if (!newService.localDir) return;
	const localDirPath = path.join(absDirPath, 'serviceFiles', ...newService.localDir.path.split('/'));
	const remoteUrl = `${urlBase}${newService.basePath.substr(1)}`;

	let resp = await fetch(remoteUrl + '/?$list=recursive,all,nodirs');
	let remoteList = (await resp.json()) as string[];
	const extensions = newService.localDir.extensions || [];
	remoteList = remoteList.filter(name => extensions.length ? extensions.some(ext => name.endsWith(ext)) : true);
	const localList = await fs.readdir(localDirPath);

	// update with local files
	for (const localFile of localList) {
		const transformedFilename = await applyTransforms(localFile, localDirPath, localList, extensions);
		if (transformedFilename === '') continue;

		let remoteServicePath = transformedFilename.toLowerCase();

		let remoteUrlPath = `${remoteUrl}/${remoteServicePath}`;
		try {
			if (newService.localDir.pathUrlMap) {
				remoteServicePath = resolvePathPattern(newService.localDir.pathUrlMap, { currentPath: transformedFilename.toLowerCase() });
				remoteUrlPath = `${remoteUrl}/${remoteServicePath}`;
			}
			const localFilePath = path.join(localDirPath, transformedFilename);
			const fileStr = await fs.readFile(localFilePath);
			console.log(`Sending ${localFilePath} to remote url: ${remoteUrlPath}`);
			resp = await fetch(remoteUrlPath, {
				method: 'PUT',
				headers,
				body: fileStr
			});
			if (!resp.ok) throw new Error(`HTTP send to ${remoteUrlPath} failed: ${resp.status} ${resp.statusText}`);
		} catch (err) {
			console.error(`Failed to send file ${remoteUrlPath}: ${err}`);
		}
		const remoteItemIdx = remoteList.indexOf(remoteServicePath);
		remoteList.splice(remoteItemIdx, 1);
	}

	// delete files not existing locally
	for (const removeRemoteUrl of remoteList) {
		const message = `Confirm deletion of remote file at ${removeRemoteUrl}`;
		const { canDelete } = await inquirer
			.prompt({ type: "confirm", name: "canDelete", message });
		if (canDelete) {
			try {
				resp = await fetch(`${remoteUrl}/${removeRemoteUrl}`, {
					method: 'DELETE',
					headers
				});
			} catch (err) {
				console.error(`Failed to delete: ${err}`);
			}
		}
	}
}

export const sendAction = async () => {
	const absDirPath = await applicationRoot();

	const servicesStr = await fs.readFile(path.join(absDirPath, "services.json"));
	const services = JSON.parse(servicesStr.toString());

	const [ token, base ] = await login();

	console.log(services);

	const headers = {
		'Authorization': 'Bearer ' + token,
		'Content-Type': 'application/json'
	} as Record<string, string>;

	const chords = services.chords as Record<string, IChord>;

	const putChords = await fetch(base + '.well-known/restspace/chords', {
		method: 'PUT',
		headers,
		body: JSON.stringify(services.chords)
	});

	if (!putChords.ok) {
		console.error(`Failed to send, result was ${putChords.status} ${putChords.statusText}`);
	} else {
		console.log(`Sent services to ${base}`);
	}

	for (const chord of Object.values(chords)) {
		for (const newService of chord.newServices || []) {
			await syncLocalDir(absDirPath, base, newService, headers);
		}
	}
};