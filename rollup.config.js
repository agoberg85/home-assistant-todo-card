import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
    input: 'src/todo-card.js',
    output: {
        file: 'todo-card.js',
        format: 'es',
        sourcemap: true,
    },
    plugins: [
        nodeResolve(),
        terser({
            format: {
                comments: false,
            },
        }),
    ],
};
