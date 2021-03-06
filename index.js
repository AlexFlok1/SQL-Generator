import Query_Components from './lib/queryParts.js'

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

    join = ( tbl1 = '', tbl2 = '', key = '', foreginKey = '', joinType = 'left' ) => {
 
        this.#sql_query = this.joinBuild( tbl1, tbl2, key, foreginKey, joinType )
        return this

    }
 
    //this method return final query
    build_query = () => this.#sql_query


}

class InsertData extends Query_Components{

    #sql_query = `INSERT INTO `

    constructor( fields = [], db = '' ) {
        super()
        this.#into( db )
        this.#addSqlQueryComponent( this.readFields( fields, 'write' ) )

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
    #into = ( db = null ) => {
        this.#addSqlQueryComponent( ( db === null ) ? 'please fill the database name' : `${db} ` )
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
    //this method return final query
    build_query = () => this.#sql_query
}

console.log( new InsertData( [ { field: 'f1', val: 1 }, { field: 'f2', val: 2 } ], 'table' ).build_query() )