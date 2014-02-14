define( [

], function ( ) {

    console.log( 'loaded' );

    var Esprima, Escodegen;

    var findBranches = function ( node, callback ) {

        if ( node.type === 'IfStatement' ) {
            node = callback( node ) || {
                type : 'EmptyStatement'
            };
        }

        Object.keys( node ).forEach( function ( key ) {

            var property = node[ key ];

            if ( typeof property !== 'object' || property === null )
                return ;

            if ( ! Array.isArray( property ) ) {
                node[ key ] = findBranches( property, callback );
                return ;
            }

            property.forEach( function ( node, index ) {
                property[ index ] = findBranches( node, callback );
            } );

        } );

        return node;

    };

    var usesPreprocessVariable = function ( node ) {

        if ( node.type === 'Identifier' && node.name === 'preprocess' )
            return true;

        if ( node.type === 'MemberExpression' )
            return false;

        return Object.keys( node ).some( function ( key ) {

            var property = node[ key ];

            if ( typeof property !== 'object' || property === null )
                return false;

            if ( ! Array.isArray( property ) )
                return usesPreprocessVariable( property );

            return property.some( function ( node ) {
                return usesPreprocessVariable( node );
            } );

        } );

    };

    var usesUndeclaredVariables = function ( node, allowed ) {

        // This test should be implemented. It is not required strictly speaking, but would help preventing stupid mistakes.

        return false;

    };

    var isVariable = function ( name ) {
        return function ( node ) {
            return node.type === 'Identifier' && node.name === name; }; };

    var validatesWhitelist = function ( whitelist ) {
        return function ( node ) {
            return node.type !== 'Identifier' || whitelist.indexOf( node.name ) !== - 1; }; };

    return {

        setEsprima : function ( object ) {

            if ( ! object )
                throw new Error( 'Cannot set Esprima reference to a falsy value' );

            Esprima = object;

        },

        setEscodegen : function ( object ) {

            if ( ! object )
                throw new Error( 'Cannot set Escodegen reference to a falsy value' );

            Escodegen = object;

        },

        preprocessFunction : function ( instance, member, environment ) {

            if ( typeof Esprima === 'undefined' || typeof Escodegen === 'undefined' )
                return ;

            var ast = Esprima.parse( '(' + instance[ member ].toString( ) + ')' );

            if ( usesUndeclaredVariables( ast ) )
                throw new Error( 'Preprocessed functions cannot make use of non-local variables' );

            instance[ member ] = eval( Escodegen.generate( findBranches( ast, function ( node ) {

                if ( ! usesPreprocessVariable( node.test ) )
                    return node;

                if ( usesUndeclaredVariables( node.test, [ 'this', 'arguments', 'preprocess' ] ) )
                    throw new Error( 'Preprocessed branches cannot access other variables than `preprocess`' );

                var test = Escodegen.generate( node.test ), preprocess = environment;
                return eval( test ) ? node.consequent : node.alternate;

            } ) ) );

        }

    };

} );
