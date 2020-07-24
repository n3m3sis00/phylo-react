import React from 'react'
import MSA from '../src/components/MSA'

const temptree = [
  {
    name: 'UniProt/Swiss-Prot|P36835|IL2_CAPHI',
    x: 10,
    y: 333,
  },
  {
    name: 'UniProt/Swiss-Prot|Q8BZM1|GLMN_MOUSE',
    x: 30,
    y: 333,
  },
  {
    name: 'UniProt/Swiss-Prot|Q7JFM4|IL2_AOTVO',
    x: 50,
    y: 333,
  },
  {
    name: 'UniProt/Swiss-Prot|P26896|IL2RB_RAT',
    x: 70,
    y: 333,
  },
  {
    name: 'UniProt/Swiss-Prot|Q29416|IL2_CANFA',
    x: 90,
    y: 333,
  },
  {
    name: 'UniProt/Swiss-Prot|Q95118|IL2RG_BOVIN',
    x: 110,
    y: 333,
  },
  {
    name: 'UniProt/Swiss-Prot|P40321|IL2RG_CANFA',
    x: 130,
    y: 333,
  },
  {
    name: 'UniProt/Swiss-Prot|P01590|IL2RA_MOUSE',
    x: 150,
    y: 333,
  },
  {
    name: 'UniProt/Swiss-Prot|P26898|IL2RA_SHEEP',
    x: 170,
    y: 333,
  },
  {
    name: 'UniProt/Swiss-Prot|P41690|IL2RA_FELCA',
    x: 190,
    y: 333,
  },
  {
    name: 'UniProt/Swiss-Prot|Q5MNY4|IL2RA_MACMU',
    x: 210,
    y: 333,
  },
  {
    name: 'UniProt/Swiss-Prot|P01589|IL2RA_HUMAN',
    x: 230,
    y: 333,
  },
]

const temptreeSeq = `
#CLUSTAL O(1.2.3) multiple sequence alignment
UniProt/Swiss-Prot|P26898|IL2RA_SHEEP      MEPSLLMWRFFVFIVVPGCVTEACHDDPPSLRNA----------MFKVLRYE----VGTM
UniProt/Swiss-Prot|P01590|IL2RA_MOUSE      MEPRLLMLGFLSLTIVPSCRAELCLYDPPEVPNA----------TFKALSYK----NGTI
UniProt/Swiss-Prot|P41690|IL2RA_FELCA      MEPSLLLWGILTFVVVHGHVTELCDENPPDIQHA----------TFKALTYK----TGTM
UniProt/Swiss-Prot|P01589|IL2RA_HUMAN      MDSYLLMWGLLTFIMVPGCQAELCDDDPPEIPHA----------TFKAMAYK----EGTM
UniProt/Swiss-Prot|Q5MNY4|IL2RA_MACMU      MDPYLLMWGLLTFITVPGCQAELCDDDPPKITHA----------TFKAVAYK----EGTM
UniProt/Swiss-Prot|Q95118|IL2RG_BOVIN      -----------------------------------LLMWGLLT-----------------
UniProt/Swiss-Prot|P40321|IL2RG_CANFA      MLKPPLPLRSLLFLQLSLLGVGLNSTVPMPNGNEDIT------PDFFLTATPSETLSVSS
UniProt/Swiss-Prot|P26896|IL2RB_RAT        MATVDLSWRLPLYILLLLLATT--------------------------------WVSAAV
UniProt/Swiss-Prot|Q8BZM1|GLMN_MOUSE       PLPLRSLLFLQLPLLGVGLNP------------------PLPLRSLLFLQLPLLGVGLNP
UniProt/Swiss-Prot|P36835|IL2_CAPHI        -----------LLGVGLNPKFLTP------------------------------------
UniProt/Swiss-Prot|Q7JFM4|IL2_AOTVO        MLKPPLPLRSLLFLQLPLLGVGLNPKFLTPSGNEDIGGKPGTGGDFFLTSTPAGTLDVST
UniProt/Swiss-Prot|Q29416|IL2_CANFA        --------------LFLQLSLLG-------------------------------------
`

export default { title: 'MSA' }

export const SimpleMSA = () => (
  <MSA data={temptreeSeq} heigtoftree={240} dataToShow={temptree} />
)

export const BGColoredMSA = () => (
  <MSA
    data={temptreeSeq}
    heigtoftree={240}
    dataToShow={temptree}
    bgColor={true}
  />
)
