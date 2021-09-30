
import { Command } from "commander";
import { sendAction } from "./sendAction";
import { generateAction } from "./generateAction";
import { instanceAction } from "./instanceAction";
import { hostAction } from "./hostAction";

const program = new Command();

program.command("instance <host> [email] [password]")
	.description("store access details for a Restspace instance")
	.action(instanceAction);

program.command("send")
	.description("send required configuration to Restspace instance")
	.action(sendAction);

program.command("generate [path]")
	.description("generate configuration for building a Restspace instance")
	.action(generateAction);

program.command("host [urlPath]")
	.description("host a static site on the Restspace instance")
	.action(hostAction);

program.parse(process.argv);