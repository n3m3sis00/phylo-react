import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

function Toolbar(props) {
    return <div>
    Toolbar
            </div>
}

function Viewer(props) {
    const {data} = props
    return <div>
                {data}
            </div>
}

function Utils(props) {
    const {code} = props
    return <div>
                <SyntaxHighlighter language="javascript" style={docco}>
                    {code}
                </SyntaxHighlighter>
        </div>
}

function Description(props) {
    const {data} = props
    return <div>
                {data}
            </div>
}

function PropTable(props) {
    const {data} = props
    return <div>
                <table>
                    {data.map(a => 
                        <tr key={a[0]}>
                            <td>{a[0]}</td>
                            <td>{a[1]}</td>
                            <td>{a[2]}</td>
                        </tr>
                    )}
                </table>
            </div>
}

export default function MSA(props) {
    const { name, View, description, proptable, code} = props
    return <div>
                <h1>{name}</h1>
                <Toolbar />
                <Viewer data={View}/>
                <Utils code={code}/>
                <Description data={description}/>
                <PropTable data={proptable}/>
            </div>
}
