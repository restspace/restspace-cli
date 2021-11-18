import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import copy from 'rollup-plugin-copy';

export default {
    input: 'restspace.ts',
    output: {
        file: 'dist/restspace.js',
        format: 'cjs',
        strict: false,
        banner: '#! /usr/bin/env node\n',
    },
    plugins: [
        replace({
          delimiters: ['', ''],
          values: {
            'require(\'readable-stream/transform\')': 'require(\'stream\').Transform',
            'require("readable-stream/transform")': 'require("stream").Transform',
            'readable-stream': 'stream',
            'var Glob = require(\'./glob.js\').Glob': '' // hack to remove unused circ ref in glob module
          },
          preventAssignment: true
        }),
        resolve({ preferBuiltins: true }),
        typescript(),json(),
        commonjs({
          include: 'node_modules/**',
          dynamicRequireTargets: [
            'node_modules/ts-node/**/*.js'
          ]
        }),
        copy({
          targets: [
            { src: "node_modules/typescript/lib/lib.*.d.ts", dest: "dist" }
          ]
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