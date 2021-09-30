import { exit } from "process";
import { buildDir, updateServicesJson } from "./files";
import { IServices } from "./IChord";
import { doSendAction } from "./sendAction";

export const hostAction = async (urlPath?: string) => {
	const buildDirPath = await buildDir();
	const basePath = urlPath || '/';
	
	const staticSiteChord = {
		id: "rs-host",
		newServices: [
			{
				basePath,
				name: "RS Host",
				source: "./services/static-site.rsm.json",
				access: { "readRoles": "all", "writeRoles": "A" },
				divertMissingToDefault: true,
				defaultResource: "index.html",
				adapterConfig: {
					basePath: 'rs-host'
				},
				localDir: {
					path: buildDirPath || '/build'
				}
			}
		]
	};

	if (!buildDirPath) {
		console.log('Could not find the build root folder, please edit services.json and set the chords.rs-host.newServices[0].localDir.path property to the build root');
		exit(1);
	}

	await updateServicesJson({ chords: { "rs-host": staticSiteChord } } as IServices);

	await doSendAction("rs-host");
}