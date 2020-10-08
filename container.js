const dependable = require('dependable');
const path = require('path');

const container = dependable.container();

const simpleDependencies = [
    ['_','lodash'],
    ['async','async']
];


simpleDependencies.forEach(function(val){

    container.register(val[0],function(){
        return require(val[1])
    })
})
container.load(path.join(__dirname,'/controllers'));
container.load(path.join(__dirname,'/helpers'));

container.register('container',function(){

    return container;
})


module.exports = container
// const _ = require('lodash')
















