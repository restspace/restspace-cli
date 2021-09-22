export type PipelineSpec = (string | Record<string, unknown> | PipelineSpec)[];

export const pipelineSchema = {
    type: "array",
    items: {
        type: [ "string", "array" ],
        oneOf: [
            { title: "request", type: "string" },
            { title: "subpipeline", "$ref": "#/definitions/pipeline" }
        ],
        editor: "oneOfRadio"
    }
};