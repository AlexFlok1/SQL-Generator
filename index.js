class Query_Components {

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

    
    joinBuild = ( query1, query2, type = 'LEFT JOIN', on = 'datetime' ) => ``

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

class ReadData extends Query_Components {

    #sql_query = `SELECT `

    constructor( fields = [] ) {
        super()
        this.#addSqlQueryComponent( this.readFields( fields, 'read' ) )

    }

    //this method editing query components to the main string
    #addSqlQueryComponent = ( component ) => {

        try{
            //check if error
            if( component.includes( 'please' ) ){
                throw new Error( component )
            }

            this.#sql_query += component

        }
        catch ( e ) {
            component = undefined
            this.#sql_query += component
            console.error( e )
        }

    }

    //this method editing query component "where data are coming from"
    from = ( db = null ) => {
        this.#addSqlQueryComponent( ( db === null ) ? 'please fill the database name' : `from ${db} ` )
        return this
    }

    //this method editing component "where" as a filter
    where = ( field, value, operation = '=' ) => {
        this.#addSqlQueryComponent( this.whereBuild( field, value, operation ) )
        return this
    }
    //this method editing component "and" as a filter
    and = ( field, value, operation = '=' ) => {
        this.#addSqlQueryComponent( this.andBuild( field, value, operation ) )
        return this
    }

    //this method editing component "or" as a filter
    or = ( field, value, operation = '=' ) => {
        this.#addSqlQueryComponent( this.orBuild( field, value, operation ) )
        return this
    }

    group = ( fields = [] ) => {
        this.#addSqlQueryComponent( ( fields.length > 0 ) ? this.groupBuild( fields ) : 'please add at least one field to the group method' )
        return this
    }

    //this method return final query
    build_query = () => this.#sql_query


}

console.log( new ReadData( ['field1', 'field2'] ).from('tbl1').where( 'field1', '%1%', 'like' ).and(  'field2', '1'  ).group( [ 'field1', 'field2' ] ).build_query() )