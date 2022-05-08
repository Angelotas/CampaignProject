const path = require('path');
const sol = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const capaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(capaignPath, 'utf8');
const output = sol.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);

for (let contract in output) { 
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        output[contract]);
}