import React from 'react';

import Box from '@mui/material/Box';
import S from '@mui/material/Typography';

import SectionObjectModel from './SectionObjectModel.js';
import SectionDataModel from './SectionDataModel.js';

export default function Classes () {
    return (
        <Box sx={{mt:3}}>
          <S variant="h5">Classes</S>

          <Box sx={{mt:3}}>
            <pre>{graph.join('\n')}</pre>
          </Box>
        </Box>
    );
}

const graph = [
    '+----------------------+            +------------------------+            +---------------------+',
    '| Entity               |            | Column                 |            | Relashonship        |',
    '|======================|            |========================|            |=====================|',
    '|- _place              |            |- _padding              |            |+ pool               |',
    '|- _padding            |            |- _values               |            |---------------------|',
    '|- _values             |            |+ pool                  |            |+ build              |',
    '|- _callbacks          |            |------------------------|            |+ checkClassOfFromTo |',
    '|- _Column             |            |+ build                 |            |                     |',
    '|+ port                |            |                        |            |+ injectPortAndTable |',
    '|+ pool                |            |- columnsWidth          |            |                     |',
    '|- _values             |            |- columnHeight          |            |- drawCore           |',
    '|- _callbacks          |            |- columnsContentsHeight |            |+ draw               |',
    '|+ column              |            |- columnsHeight         |            |+ removeEdgeAll      |',
    '|----------------------|            |- sortColumns           |            |+ moveEdges          |',
    '|<util>                |            |+ draw                  |            +---------------------+',
    '|  getCallbak          |            |+ resize                |',
    '|  callCallbak         |            +------------------------+',
    '|                      |',
    '|<Data manegement>     |            +----------------+',
    '|  build               |            | ColumnInstance |',
    '|                      |            |================|',
    '|<Sizing>              |            |+ pool          |',
    '|  headerWidth         |            |----------------|',
    '|  headerContentsHight |            |+ build         |',
    '|  headerHight         |            +----------------+',
    '|  baseHeight          |',
    '|                      |            +-----------------------+               +----------------+',
    '|<Draw>                |            | Port                  |               | Rectum         |',
    '|  removeGAll          |            |=======================|               |================|',
    '|  drawHeader          |            |+ pool                 |               |+ erdm          |',
    '|  drawBase            |            |+ geometry             |               |+ relashonship  |',
    '|  removeG             |            |-----------------------|               |- _table        |',
    '|  drawG               |            |<Data manegement>      |               |- _values       |',
    '|  move                |            |+ build                |               |- _callbacks    |',
    '|  resize              |            |                       |               |----------------|',
    '|  draw                |            |<Draw>                 |               |  initValues    |',
    '|                      |            |- calLinePoints        |               |  initCallbacks |',
    '|<Drag & Drop>         |            |- drawLine             |               |                |',
    '|  moveEntityStart     |            |- calOneLine           |               |<Getter>        |',
    '|  moveEntity          |            |- calThreeLine         |               |  entity        |',
    '|  moveEntityEnd       |            |- calCircle            |               |                |',
    '+----------------------+            |- drawCardinalityOne   |               |<Draw>          |',
    '                                    |- drawCardinalityThree |               |  drawEdges     |',
    '                                    |- drawCardinality      |               |  moveEdges     |',
    '                                    |- drawOptionalityOne   |               |  drawEntities  |',
    '                                    |- drawOptionalityZero  |               |  setting       |',
    '                                    |- drawOptionality      |               |  draw          |',
    '                                    |+ draw                 |               |                |',
    '                                    +-----------------------+               |<Data>          |',
    '                                                                            |  data          |',
    '                                                                            +----------------+',
    '',
    '',
    '+------------------------------+       +---------------------------+       +---------------------+',
    '| DataManeger                  |       | Geometry                  |       | Pool                |',
    '|==============================|       |===========================|       |=====================|',
    '|+ table                       |       |---------------------------|       |---------------------|',
    '|+ port                        |       |<Utilities>                |       |+ list2pool          |',
    '|+ column_instance             |       |  deg2rad                  |       |+ list2poolWithIndex |',
    '|+ relashonship                |       |                           |       +---------------------+',
    '|------------------------------|       |<Rect>                     |',
    '|  injectTable2ColumnInstances |       |  getFourSideLines         |',
    '|  injectColumnInstances2Ports |       |                           |',
    '|                              |       |<Rect>                     |',
    '|  <Respons data 2 Graph data> |       |  getPortLineFrom          |',
    '|  buildEdges                  |       |  getPortLineToPoint       |',
    '|  buldData                    |       |  getPortLineTo            |',
    '|                              |       |  getPortLine              |',
    '|  <Import Data (未実装)>      |       |                           |',
    '|  import2Data                 |       |<Cross Point of two lines> |',
    '+------------------------------+       |  isCorss                  |',
    '                                       |  getCrossPointCore        |',
    '                                       |  getCrossPoint            |',
    '                                       +---------------------------+',
];
