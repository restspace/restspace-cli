import { Command } from "commander";
import { sendAction } from "./sendAction";
import { generateAction } from "./generateAction";
import { instanceAction } from "./instanceAction";
var program = new Command();
program.command("instance <host> [email] [password]")
    .description("store access details for a Restspace instance")
    .action(instanceAction);
program.command("send")
    .description("send required configuration to Restspace instance")
    .action(sendAction);
program.command("generate [path]")
    .description("generate configuration for building a Restspace instance")
    .action(generateAction);
program.parse(process.argv);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdHNwYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vcmVzdHNwYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDcEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUMxQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRWxELElBQU0sT0FBTyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7QUFFOUIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxvQ0FBb0MsQ0FBQztLQUNuRCxXQUFXLENBQUMsK0NBQStDLENBQUM7S0FDNUQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBRXpCLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO0tBQ3JCLFdBQVcsQ0FBQyxtREFBbUQsQ0FBQztLQUNoRSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7QUFFckIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztLQUNoQyxXQUFXLENBQUMsMERBQTBELENBQUM7S0FDdkUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBRXpCLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDIn0=