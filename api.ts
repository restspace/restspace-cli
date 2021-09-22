import { exit } from "process";
import { fetchCreds } from "./fetchCreds";
import fetch, { Response } from "node-fetch";

export const login = async (hostArg?: string): Promise<[ string, string ]> => {
	const [host, creds, base] = await fetchCreds(hostArg);

	let res: Response;
	try {
		res = await fetch(base + 'auth/login', {
			method: 'POST',
			body: JSON.stringify({
				email: creds.email,
				password: creds.password
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (err) {
		console.error(`Login to instance failed: ${err}`);
		exit(1);
	}

	if (!res.ok) {
		switch (res.status) {
			case 404:
				console.error('Login to instance failed: no such user');
				break;
			case 400:
				console.error('Login to instance failed: bad password');
				break;
		}
		exit(1);
	}

	const cookie = res.headers.get('set-cookie');
	let token = '';
	try {
		token = cookie?.split(';').find(part => part.startsWith('rs-auth='))?.split('=')[1] || '';
	} catch {  }

	if (!token) {
		console.error('Login failed to return correct creds cookie');
		exit(1);
	}

	return [ token, base ];
}