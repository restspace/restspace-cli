import { exit } from "process";
import { fetchCreds } from "./fetchCreds";
import fetch from "node-fetch";
import { login } from "./api";
import fs from "fs/promises";
import path from "path";

export const sendAction = async () => {
	const absDirPath = process.cwd();

	const servicesStr = await fs.readFile(path.join(absDirPath, "services.json"));
	const services = JSON.parse(servicesStr.toString());
	const base = services.base;

	const [ token, ] = await login(base);

	console.log(services);

	const putChords = await fetch(base + '.well-known/restspace/chords', {
		method: 'PUT',
		headers: {
			'Authorization': 'Bearer ' + token,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(services.chords)
	});

	if (!putChords.ok) {
		console.error(`Failed to send, result was ${putChords.status} ${putChords.statusText}`);
	} else {
		console.log(`Sent services to ${base}`);
	}
};