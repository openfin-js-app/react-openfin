export const PREFIX:string = 'REACT_OPENFIN';
export const REQ_PREFIX:string = `${PREFIX}_REQ`;
export const RES_PREFIX:string = `${PREFIX}_RES`;
export const DELIMITER:string = '::';

export const isReactOpenfinAct = (actType:string) => (actType.indexOf(PREFIX)!==-1)
export const isReqAct = (actType:string) => (actType.indexOf(REQ_PREFIX)!==-1)
export const isResAct = (actType:string) => (actType.indexOf(RES_PREFIX)!==-1)

export const makeReqType  = (type:string)=> `${REQ_PREFIX}${DELIMITER}${type}`
export const makeResType  = (type:string)=> `${RES_PREFIX}${DELIMITER}${type}`

export default (type:string) => `${PREFIX}${DELIMITER}${type}`;
