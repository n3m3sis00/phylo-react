import React from 'react'
import { MicroSynteny } from '../components/Synteny'

const temptree = [
  {
    name: 'UniProt/Swiss-Prot|P36835|IL2_CAPHI',
    x: 10,
    y: 333,
    child: [
      { start: 100, end: 200, dir: 1, code: 0 },
      { start: 250, end: 300, dir: 0, code: 1 },
      { start: 320, end: 600, dir: 1, code: 2 },
      { start: 700, end: 780, dir: 1, code: 3 },
      { start: 820, end: 940, dir: 0, code: 4 },
    ],
  },
]

export default { title: 'Synteny' }

export const SimpleMicroSynteny = () => (
  <MicroSynteny data={temptree} heigtoftree={240} />
)
