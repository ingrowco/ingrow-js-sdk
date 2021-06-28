import { uglify } from "rollup-plugin-uglify";
import babel from 'rollup-plugin-babel';

const babelConfig = {
  "presets": [
    "@babel/preset-env",
  ],
  "plugins": [
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-proposal-optional-chaining"
  ]
}

export default {
  input: './index.js',
  plugins: [
    babel(babelConfig),
    uglify(),
  ],
  output: [
    {file: './dist/bundle.min.js',  name: "Ingrow", format: 'iife'},
    {file: './dist/index.js', exports: "default", format: 'cjs' }
  ]
}
