import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';

export default {
    input: 'restspace.ts',
    output: {
        file: 'dist/restspace.js',
        format: 'cjs',
        strict: false,
        banner: '#! /usr/bin/env node\n',
    },
    plugins: [resolve(), typescript(),json(),
              commonjs({include: 'node_modules/**'}),
			  replace({
				delimiters: ['', ''],
				values: {
				  'require(\'readable-stream/transform\')': 'require(\'stream\').Transform',
				  'require("readable-stream/transform")': 'require("stream").Transform',
				  'readable-stream': 'stream'
				}
			  })
			],
    external: [
        'child_process',
        'fs',
		'fs/promises',
        'path',
        'os',
        'https',
        'readline',
        'zlib',
        'events',
        'stream',
        'util',
        'buffer',
		'readable-stream',
		'readable-stream/transform'
    ]
};