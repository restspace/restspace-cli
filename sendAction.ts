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
import { exit } from "process";



async function* readdirGenerator(dir: string): AsyncGenerator<string, void, unknown> {
	const dirents = await fs.readdir(dir, { withFileTypes: true });
	for (const dirent of dirents) {
		const res = path.resolve(dir, dirent.name);
		if (dirent.isDirectory()) {
			for await (const subres of readdirGenerator(res)) {
				yield subres;
			}
		} else {
			yield res;
		}
	}
}

async function readdirRecursive(dir: string) {
	const results = [] as string[];
	for await (const res of readdirGenerator(dir)) {
		results.push(res);
	}
	return results;
}

export const syncLocalDir = async (absDirPath: string, urlBase: string, { localDir, basePath }: IChordServiceConfig, headers: Record<string, string>) => {
	if (!localDir) return;
	const localDirRoot = localDir.path.startsWith('/') ? '.' : 'serviceFiles';
	const localDirParts = localDir.path.split('/').filter(p => !!p);
	const localDirPath = path.join(absDirPath, localDirRoot, ...localDirParts);
	const remoteUrl = `${urlBase}${basePath.substr(1)}`;

	let resp = await fetch(remoteUrl + '/?$list=recursive,all,nodirs', {
		headers: { "X-Restspace-Request-Mode": "manage" }
	});
	let remoteList = resp.status === 404 ? [] : (await resp.json()) as string[];
	const extensions = localDir.extensions || [];
	remoteList = remoteList.filter(name => extensions.length ? extensions.some(ext => name.endsWith(ext)) : true);
	const localList = await readdirRecursive(localDirPath);

	// update with local files
	for await (const localPath of localList) {
		const transformedPath = await applyTransforms(localPath, localList, extensions);
		if (transformedPath === '') continue;

		let remoteServicePath = transformedPath.substr(localDirPath.length + 1);
		remoteServicePath = remoteServicePath.replaceAll(path.sep, '/').toLowerCase();

		let remoteUrlPath = `${remoteUrl}${remoteServicePath}`;
		try {
			if (localDir.pathUrlMap) {
				remoteServicePath = resolvePathPattern(localDir.pathUrlMap, { currentPath: remoteServicePath });
				remoteUrlPath = `${remoteUrl}/${remoteServicePath}`;
			}

			const fileStr = await fs.readFile(transformedPath);
			console.log(`Sending ${transformedPath} to remote url: ${remoteUrlPath}`);
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

export const sendAction = () => doSendAction();

export const doSendAction = async (chordId?: string) => {
	const absDirPath = await applicationRoot();

	const servicesStr = await fs.readFile(path.join(absDirPath, "services.json"));
	const services = JSON.parse(servicesStr.toString());

	const [ token, base ] = await login();

	console.log(services);

	const headers = {
		'Authorization': 'Bearer ' + token,
		'Content-Type': 'application/json'
	} as Record<string, string>;

	let chords = services.chords as Record<string, IChord>;
	if (chordId) {
		if (!chords[chordId]) {
			console.error(`Failed to find chord with id ${chordId}`);
			exit(1);
		}
		chords = { [chordId]: chords[chordId] };
	}

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