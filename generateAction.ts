import fs from "fs/promises";
import path from "path";
import { fetchCreds } from "./fetchCreds";

type ScanMode = "node_modules" | "project-dir" | "namespace-dir";

async function* scanDir(absPath: string, mode: ScanMode): AsyncGenerator<string> {
	const entries = await fs.readdir(absPath, { withFileTypes: true });
	const { name } = path.parse(absPath);
	for (const ent of entries) {
		const entAbsPath = path.join(absPath, ent.name);
		if (ent.isDirectory()) {
			const recurse = mode !== "project-dir" || ent.name === "node_modules";

			if (recurse) {
				let nextMode = "project-dir" as ScanMode;
				if (ent.name === "node_modules") nextMode = "node_modules";
				else if (ent.name.startsWith("@")) nextMode = "namespace-dir";

				for await (const chord of scanDir(entAbsPath, nextMode))
					yield chord;
			}
		} else if (ent.isFile()) {
			if (ent.name === 'services.json') {
				yield entAbsPath;
			}
		} else if (ent.isSymbolicLink()) {
			const target = await fs.readlink(entAbsPath);
			for await (const chord of scanDir(target, "project-dir")) yield chord;
		}
	};
}

export const generateAction = async (dirPath?: string) => {
	if (!dirPath) dirPath = ".";
	const absDirPath = path.resolve(process.cwd(), dirPath);
	const absPath = path.resolve(absDirPath, "./node_modules");
	console.log(`Scanning ${absPath}...`);

	const chords = {} as Record<string, unknown>;
	for await (const chordFile of scanDir(absPath, "node_modules")) {
		console.log(`Found ${chordFile}`);
		let chord: Record<string, unknown> & { id: string } = { id: 'none' };
		try {
			const chordBuf = await fs.readFile(chordFile);
			const chordStr = chordBuf.toString();
			chord = JSON.parse(chordStr);
		} catch (err) {
			console.error(`Failed to parse at ${chordFile}: ${err}`);
			continue;
		}
		if (chords[chord.id]) {
			console.log(`Ignored duplicated chord id: ${chord.id}`);
		} else {
			chords[chord.id] = chord;
		}
	}

	const [ , , base ] = await fetchCreds();
	const services = {
		base,
		chords
	};

	await fs.writeFile(path.join(absDirPath, 'services.json'), JSON.stringify(services));
}