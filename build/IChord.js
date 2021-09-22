export var schemaIChord = {
    type: "object",
    properties: {
        id: { type: "string" },
        newServices: {
            type: "object",
            properties: {
                name: { type: "string" },
                basePath: { type: "string" },
                source: { type: "string" }
            },
            required: ["name", "basePath", "source"]
        }
    },
    required: ["id"]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSUNob3JkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vSUNob3JkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE1BQU0sQ0FBQyxJQUFNLFlBQVksR0FBRztJQUN4QixJQUFJLEVBQUUsUUFBUTtJQUNkLFVBQVUsRUFBRTtRQUNSLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7UUFDdEIsV0FBVyxFQUFFO1lBQ1QsSUFBSSxFQUFFLFFBQVE7WUFDZCxVQUFVLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtnQkFDeEIsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtnQkFDNUIsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTthQUM3QjtZQUNELFFBQVEsRUFBRSxDQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFFO1NBQzdDO0tBQ0o7SUFDRCxRQUFRLEVBQUUsQ0FBRSxJQUFJLENBQUU7Q0FDckIsQ0FBQyJ9