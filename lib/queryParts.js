export default class Query_Components {

    constructor(){}

    #readFields = ( fields = [] ) => ( fields.length === 0 ) ? '* ' : fields.join( ',' ) + ' '

    #updateFields = ( fields = [] ) => 
    ( fields?.length !== 0 && fields?.every( el => typeof el === 'object' ) ) 
    ? `SET ${ fields?.map( el => `${ el?.field }='${ el?.val }'` ) } ` 
    : 'please make sure that you sending array of objects [ { field, val } ]'

    #insertFields = ( fields = [] ) => 
    ( fields?.length !== 0 && fields?.every( el => typeof el === 'object' ) ) 
    ? `( ${ fields?.map( el => `${ el?.field }` ) } ) VALUES( ${ fields?.map( el => `${ el?.val }` ) } ) ` 
    : 'please make sure that you sending array of objects [ { field, val } ]'

    whereBuild = ( field, value, operation ) => `where [${field}] ${operation} '${value}'`

    andBuild = ( field, value, operation ) => ` and ${ this.whereBuild( field, value, operation ) }`

    orBuild = ( field, value, operation ) => ` or ${ this.whereBuild( field, value, operation ) }`

    groupBuild = ( fields ) => ` group By ${ fields.join( ',' ) }`

    orderBuild = () => {

    }

    
    //method to join to tables into one
    joinBuild = ( table_1 = '', table_2 = '', key = '', foreginKey = '', joinType = 'left' ) => {

        if( table_1 === '' || table_2 === '' )
            return { error: 'tables can not be empty' }
        else{
            return `SELECT * FROM ( SELECT * FROM ${table_1} ${joinType} join ${table_2} on ${table_1}.${key} = ${table_2}.${foreginKey} ) as resultTbl`
        }

    }

    readFields = ( fields, operation ) => {
        switch( operation ){
            case 'read':
                return  this.#readFields( fields )
            case 'write':
                return  this.#insertFields( fields )
            case 'update':
                return  this.#updateFields( fields )
        }
    }

}