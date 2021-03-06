import React, { useState } from 'react'
import MSAsvg from '../components/MSAsvg'
import Tree from '../components/Tree'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles(theme => ({
  tree_div: {
    display: 'flex',
    flexDirection: 'row',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    width: 'calc(100vw - 32px)',
  },
}))

const temptree =
  '(((UniProt/Swiss-Prot|P26898|IL2RA_SHEEP:0.24036,(UniProt/Swiss-Prot|P41690|IL2RA_FELCA:0.17737,(UniProt/Swiss-Prot|P01589|IL2RA_HUMAN:0.03906,UniProt/Swiss-Prot|Q5MNY4|IL2RA_MACMU:0.03787):0.13033):0.04964):0.02189,UniProt/Swiss-Prot|P01590|IL2RA_MOUSE:0.23072):0.06814,(((UniProt/Swiss-Prot|Q95118|IL2RG_BOVIN:0.09600,UniProt/Swiss-Prot|P40321|IL2RG_CANFA:0.09845):0.25333,UniProt/Swiss-Prot|Q29416|IL2_CANFA:-0.35055):0.10231,(UniProt/Swiss-Prot|P26896|IL2RB_RAT:0.33631,UniProt/Swiss-Prot|Q7JFM4|IL2_AOTVO:-0.33631):0.10166):0.01607,(UniProt/Swiss-Prot|Q8BZM1|GLMN_MOUSE:0.32378,UniProt/Swiss-Prot|P36835|IL2_CAPHI:-0.32378):0.09999)'

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

export default { title: 'Tree MSA' }

export const TreeMSA = () => {
  const [treeresponse, setTreeresponse] = useState(null)
  const classes = useStyles()
  const layout = 'linear'

  return (
    <Grid key={1} item>
      <div className={classes.tree_div}>
        <Box width="20%">
          <Tree
            data={temptree}
            layout={layout}
            getConfig={treeresponse === null ? setTreeresponse : d => {}}
          />
        </Box>
        <Box width="80%" style={{ overflowX: 'scroll' }}>
          {treeresponse !== null ? (
            <MSAsvg
              data={temptreeSeq}
              heightoftree={treeresponse.treeheight}
              dataToShow={treeresponse.leafloc}
            />
          ) : null}
        </Box>
      </div>
    </Grid>
  )
}
