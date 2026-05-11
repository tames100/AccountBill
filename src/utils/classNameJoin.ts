export const ClassNameJoin = <T, K>(classNamePre: T, value?: K) => value !== undefined ? `${ classNamePre }-${ value }` : ""

export const ClassNameJoinPX = <T, K>(classNamePre: T, value?: K) => value !== undefined ? `${ classNamePre }-[${ value }px]` : ""