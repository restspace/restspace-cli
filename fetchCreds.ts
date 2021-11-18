import fs from "fs/promises";
import { exit } from "process";
import { Creds } from "./Creds";
import { getConfigPath } from "./files";

export const readConfig = async () => {
	const [ configDir, configPath ] = getConfigPath();

	let config: Record<string, Creds> = {};
	try {
		const configStr = await fs.readFile(configPath, { encoding: "utf8" });
		config = JSON.parse(configStr);
	} catch (err) {
		console.error(`Failed reading existing config at ${configPath}: ${err}`);
		exit(1);
	}

	return config;
}

export const fetchCreds = async (host?: string): Promise<[ string, Creds, string ]> => {
	const config = await readConfig();

	let creds: Creds;
	if (Object.keys(config).length === 0) {
		console.error('No instances have been configured yet: please configure one using the command: restspace configure');
		exit(1);
	} if (Object.keys(config).length > 1) {
		if (!host) {
			console.error('You have multiple Restspace instances configured, please give the host name');
			exit(1);
		}
		creds = config[host];
		if (!creds) {
			console.error(`Host ${host} has no configuration information saved using the command: restspace instance`);
		}
	} else {
		host = Object.keys(config)[0];
		creds = config[host];
	}

	let scheme = host.startsWith('localhost') ? 'http' : 'https';
	const base = `${scheme}://${host}/`;

	return [ host, creds, base ];
}