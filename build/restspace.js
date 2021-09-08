import { Command } from "commander";
import { sendAction } from "./sendAction";
import { generateAction } from "./generateAction";
import { instanceAction } from "./instanceAction";
var program = new Command();
program.command("instance <host> [email] [password]")
    .description("store access details for a Restspace instance")
    .action(instanceAction);
program.command("send [host]")
    .description("send required configuration to Restspace instance")
    .action(sendAction);
program.command("generate [path]")
    .description("generate configuration for building a Restspace instance")
    .action(generateAction);
program.parse(process.argv);
