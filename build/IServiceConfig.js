var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
export var schemaIServiceConfig = {
    "type": "object",
    "properties": {
        "name": { "type": "string" },
        "source": { "type": "string" },
        "basePath": { "type": "string" },
        "access": { "type": "object",
            "properties": {
                "readRoles": { "type": "string" },
                "writeRoles": { "type": "string" },
                "manageRoles": { "type": "string" },
                "createRoles": { "type": "string" }
            },
            "required": ["readRoles", "writeRoles"]
        },
        "caching": { "type": "object",
            "properties": {
                "cache": { "type": "boolean" },
                "sendETag": { "type": "boolean" },
                "maxAge": { "type": "number" }
            }
        },
        "adapterSource": { "type": "string" },
        "infraName": { "type": "string" },
        "adapterConfig": { "type": "object", "properties": {} }
    },
    "required": ["name", "source", "basePath", "access"]
};
export var schemaIChordServiceConfig = {
    "type": "object",
    "properties": __assign({}, schemaIServiceConfig.properties),
    "required": ["name", "source", "basePath"]
};
export var schemaIServiceConfigExposedProperties = ["name", "source", "basePath", "access", "caching", "adapterSource"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSVNlcnZpY2VDb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9JU2VydmljZUNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQTJEQSxNQUFNLENBQUMsSUFBTSxvQkFBb0IsR0FBRztJQUNoQyxNQUFNLEVBQUUsUUFBUTtJQUNoQixZQUFZLEVBQUU7UUFDVixNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFO1FBQzVCLFFBQVEsRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUU7UUFDOUIsVUFBVSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRTtRQUNoQyxRQUFRLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUTtZQUN4QixZQUFZLEVBQUU7Z0JBQ1YsV0FBVyxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRTtnQkFDakMsWUFBWSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRTtnQkFDbEMsYUFBYSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRTtnQkFDbkMsYUFBYSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRTthQUN0QztZQUNELFVBQVUsRUFBRSxDQUFFLFdBQVcsRUFBRSxZQUFZLENBQUU7U0FDNUM7UUFDRCxTQUFTLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUTtZQUN6QixZQUFZLEVBQUU7Z0JBQ1YsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRTtnQkFDOUIsVUFBVSxFQUFFLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRTtnQkFDakMsUUFBUSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRTthQUNqQztTQUNKO1FBQ0QsZUFBZSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBQztRQUNwQyxXQUFXLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFO1FBQ2pDLGVBQWUsRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRTtLQUMxRDtJQUNELFVBQVUsRUFBRSxDQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBRTtDQUN6RCxDQUFDO0FBRUYsTUFBTSxDQUFDLElBQU0seUJBQXlCLEdBQUc7SUFDckMsTUFBTSxFQUFFLFFBQVE7SUFDaEIsWUFBWSxlQUNMLG9CQUFvQixDQUFDLFVBQVUsQ0FDckM7SUFDRCxVQUFVLEVBQUUsQ0FBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBRTtDQUMvQyxDQUFDO0FBRUYsTUFBTSxDQUFDLElBQU0scUNBQXFDLEdBQUcsQ0FBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLGVBQWUsQ0FBRSxDQUFDIn0=