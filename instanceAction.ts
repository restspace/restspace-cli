import inquirer from "inquirer";
import path from "path";
import os from "os";
import fs from "fs/promises";
import { exit } from "process";
import { readConfig } from "./fetchCreds";

export interface Creds {
	email: string;
	password: string;
}

export const getConfigPath = () => {
	const configDir = path.join(os.homedir(), "restspace");
	const configPath = path.join(configDir, "config.json");
	return [ configDir, configPath ];
}

export const instanceAction = async (host: string, emailLine: string, passwordLine: string) => {
	if (host === "list") {
		const config = await readConfig();
		Object.entries(config).forEach(([host, conf]) =>
			console.log(`${host}: ${conf.email}`));
		return;
	}

	const { email, password } = await inquirer.prompt([
		{ name: "email", message: "Account email" },
		{ type: "password", name: "password", message: "Account password" }
	], {
		email: emailLine,
		password: passwordLine
	});

	const [ configDir, configPath ] = getConfigPath();
	let exists = true;
	await fs.access(configPath).catch(() => exists = false);

	let config: Record<string, Creds> = {};
	if (exists) {
		try {
			const configStr = await fs.readFile(configPath, { encoding: "utf8" });
			config = JSON.parse(configStr);
		} catch (err) {
			console.error(`Failed reading existing config at ${configPath}: ${err}`);
			exit(1);
		}
	} else {
		exists = true;
		await fs.access(configDir).catch(() => exists = false);

		if (!exists) await fs.mkdir(configDir);
	}

	config[host] = { email, password };

	try {
		await fs.writeFile(configPath, JSON.stringify(config));
	} catch (err) {
		console.error(`Failed to write config to ${configPath}: ${err}`);
		exit(1);
	}

	console.log(`Config written to ${configPath}`);
}