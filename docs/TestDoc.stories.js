import React from 'react';
import Docify from './Docify'
import Tree from '../src/components/Tree'

export default { title: 'Test Docs' };

const treedata = "(((UniProt/Swiss-Prot|P26898|IL2RA_SHEEP:0.24036,(UniProt/Swiss-Prot|P41690|IL2RA_FELCA:0.17737,(UniProt/Swiss-Prot|P01589|IL2RA_HUMAN:0.03906,UniProt/Swiss-Prot|Q5MNY4|IL2RA_MACMU:0.03787):0.13033):0.04964):0.02189,UniProt/Swiss-Prot|P01590|IL2RA_MOUSE:0.23072):0.06814,(((UniProt/Swiss-Prot|Q95118|IL2RG_BOVIN:0.09600,UniProt/Swiss-Prot|P40321|IL2RG_CANFA:0.09845):0.25333,UniProt/Swiss-Prot|Q29416|IL2_CANFA:-0.35055):0.10231,(UniProt/Swiss-Prot|P26896|IL2RB_RAT:0.33631,UniProt/Swiss-Prot|Q7JFM4|IL2_AOTVO:-0.33631):0.10166):0.01607,(UniProt/Swiss-Prot|Q8BZM1|GLMN_MOUSE:0.32378,UniProt/Swiss-Prot|P36835|IL2_CAPHI:-0.32378):0.09999);"
const Stree = () => <Tree
                            data={treedata}
                            clickName = {(d) => {console.log(d)}}
                            getConfig = {(d) => {console.log(d)}}
                        />;
const description = `
Another strategy for passing all props to a child 
component is the JavaScript spread operator. JavaScript's spread 
operator in React is a useful power feature and you can read people 
referring to it as the React ...props syntax even though it is not really a React 
feature but just a thing coming from JavaScript.
`

const proptable = [
    ['A', 'a', 'You can do all of this code formatting on your own'],
    ['B', 'b', 'You can do all of this code formatting on your own'],
    ['C', 'c', 'You can do all of this code formatting on your own']
]

const code = `
const treeData="<Newick String>"
const Stree = () => <Tree
                            data={treedata}
                            clickName = {(d) => {console.log(d)}}
                            getConfig = {(d) => {console.log(d)}}
                        />;
`

export const SimpleTree = () => <Docify name={"Phylogenetic Tree"} View={<Stree />} description={description} proptable={proptable} code={code}/>;
