export var pipelineSchema = {
    type: "array",
    items: {
        type: ["string", "array"],
        oneOf: [
            { title: "request", type: "string" },
            { title: "subpipeline", "$ref": "#/definitions/pipeline" }
        ],
        editor: "oneOfRadio"
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGlwZWxpbmVTcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vUGlwZWxpbmVTcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE1BQU0sQ0FBQyxJQUFNLGNBQWMsR0FBRztJQUMxQixJQUFJLEVBQUUsT0FBTztJQUNiLEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxDQUFFLFFBQVEsRUFBRSxPQUFPLENBQUU7UUFDM0IsS0FBSyxFQUFFO1lBQ0gsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7WUFDcEMsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLE1BQU0sRUFBRSx3QkFBd0IsRUFBRTtTQUM3RDtRQUNELE1BQU0sRUFBRSxZQUFZO0tBQ3ZCO0NBQ0osQ0FBQyJ9