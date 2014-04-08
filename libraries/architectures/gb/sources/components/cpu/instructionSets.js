/*global define*/

define( [

], function ( ) {

    // The functions in this file are reenginered by the CPU component to fit its parameters.
    // They are able to access the following variables :

    // - Virtjs     : contains the Virtjs instance from the CPU
    // - engine     : contains the reference towards the main emulation engine
    // - parameters : contains an array of the specialization parameters

    var Virtjs, engine, parameters;

    return {

        unprefixed : {

            // ex: ADC b, 0x12
            ADC_r_n : {

                command : function ADC_r_n( ) {

                    var rBefore = parameters[ 0 ][ 0 ];
                    parameters[ 0 ][ 0 ] += this.readUint8( );
                    var rAfter = parameters[ 0 ][ 0 ];
                    parameters[ 0 ][ 0 ] += engine.environment.cpuCarry;
                    var rAfterCarry = parameters[ 0 ][ 0 ];

                    engine.environment.cpuBCD = false;

                    engine.environment.cpuZero = rAfterCarry === 0;

                    engine.environment.cpuHalf =
                        ( rAfter      & 0x0F ) < ( rBefore & 0x0F ) ||
                        ( rAfterCarry & 0x0F ) < ( rAfter  & 0x0F ) ;

                    engine.environment.cpuCarry =
                        ( rAfter      ) < ( rBefore ) ||
                        ( rAfterCarry ) < ( rAfter  ) ;

                    return 2;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'adc ' + [
                            parameters[ 0 ].xRegister,
                            Virtjs.FormatUtil.hexadecimal( engine.mmu.readUint8( address ), 8 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: ADC b, b
            ADC_r_r : {

                command : function ADC_r_r( ) {

                    var rBefore = parameters[ 0 ][ 0 ];
                    parameters[ 0 ][ 0 ] += parameters[ 1 ][ 0 ];
                    var rAfter = parameters[ 0 ][ 0 ];
                    parameters[ 0 ][ 0 ] += engine.environment.cpuCarry;
                    var rAfterCarry = parameters[ 0 ][ 0 ];

                    engine.environment.cpuBCD = false;

                    engine.environment.cpuZero = rAfterCarry === 0;

                    engine.environment.cpuHalf =
                        ( rAfter      & 0x0F ) < ( rBefore & 0x0F ) ||
                        ( rAfterCarry & 0x0F ) < ( rAfter  & 0x0F ) ;

                    engine.environment.cpuCarry =
                        ( rAfter      ) < ( rBefore ) ||
                        ( rAfterCarry ) < ( rAfter  ) ;

                    return 1;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'adc ' + [
                            parameters[ 0 ].xRegister,
                            parameters[ 1 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: ADC b, (de)
            ADC_r_rrm : {

                command : function ADC_r_rrm( ) {

                    var rBefore = parameters[ 0 ][ 0 ];
                    parameters[ 0 ][ 0 ] += engine.mmu.readUint8( parameters[ 1 ][ 0 ] );
                    var rAfter = parameters[ 0 ][ 0 ];
                    parameters[ 0 ][ 0 ] += engine.environment.cpuCarry;
                    var rAfterCarry = parameters[ 0 ][ 0 ];

                    engine.environment.cpuBCD = false;

                    engine.environment.cpuZero = rAfterCarry === 0;

                    engine.environment.cpuHalf =
                        ( rAfter      & 0x0F ) < ( rBefore & 0x0F ) ||
                        ( rAfterCarry & 0x0F ) < ( rAfter  & 0x0F ) ;

                    engine.environment.cpuCarry =
                        ( rAfter      ) < ( rBefore ) ||
                        ( rAfterCarry ) < ( rAfter  ) ;

                    return 2;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'adc ' + [
                            parameters[ 0 ].xRegister,
                            '(' + parameters[ 1 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: ADD b, 0x12
            ADD_r_n : {

                command : function ADD_r_n( ) {

                    var rBefore = parameters[ 0 ][ 0 ];
                    parameters[ 0 ][ 0 ] += this.readUint8( );
                    var rAfter = parameters[ 0 ][ 0 ];

                    engine.environment.cpuBCD = false;

                    engine.environment.cpuZero = rAfter === 0;

                    engine.environment.cpuHalf =
                        ( rAfter & 0x0F ) < ( rBefore & 0x0F );

                    engine.environment.cpuCarry =
                        ( rAfter ) < ( rBefore );

                    return 2;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'add ' + [
                            parameters[ 0 ].xRegister,
                            Virtjs.FormatUtil.hexadecimal( engine.mmu.readUint8( address ), 8 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: ADD b, b
            ADD_r_r : {

                command : function ADD_r_r( ) {

                    var rBefore = parameters[ 0 ][ 0 ];
                    parameters[ 0 ][ 0 ] += parameters[ 1 ][ 0 ];
                    var rAfter = parameters[ 0 ][ 0 ];

                    engine.environment.cpuBCD = false;

                    engine.environment.cpuZero = rAfter === 0;

                    engine.environment.cpuHalf =
                        ( rAfter & 0x0F ) < ( rBefore & 0x0F );

                    engine.environment.cpuCarry =
                        ( rAfter ) < ( rBefore );

                    return 1;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'add ' + [
                            parameters[ 0 ].xRegister,
                            parameters[ 1 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: ADD b, (de)
            ADD_r_rrm : {

                command : function ADD_r_rrm( ) {

                    var rBefore = parameters[ 0 ][ 0 ];
                    parameters[ 0 ][ 0 ] += engine.mmu.readUint8( parameters[ 1 ][ 0 ] );
                    var rAfter = parameters[ 0 ][ 0 ];

                    engine.environment.cpuBCD = false;

                    engine.environment.cpuZero = rAfter === 0;

                    engine.environment.cpuHalf =
                        ( rAfter & 0x0F ) < ( rBefore & 0x0F );

                    engine.environment.cpuCarry =
                        ( rAfter ) < ( rBefore );

                    return 2;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'add ' + [
                            parameters[ 0 ].xRegister,
                            '(' + parameters[ 1 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: ADD de, de
            ADD_rr_rr : {

                command : function ADD_rr_rr( ) {

                    var rrBefore = parameters[ 0 ][ 0 ];
                    parameters[ 0 ][ 0 ] += parameters[ 1 ][ 0 ];
                    var rrAfter = parameters[ 0 ][ 0 ];

                    engine.environment.cpuBCD = false;

                    engine.environment.cpuHalf =
                        ( rrBefore & 0x0FFF ) > ( rrAfter & 0x0FFF );

                    engine.environment.cpuCarry =
                        ( rrBefore ) > ( rrAfter );

                    return 2;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'add ' + [
                            parameters[ 0 ].xRegister,
                            parameters[ 1 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: ADD sp, +10
            ADD_rr_sn : {

                command : function ADD_rr_sn( ) {

                    var rrBefore = parameters[ 0 ][ 0 ];
                    parameters[ 0 ][ 0 ] += this.readInt8( );
                    var rrAfter = parameters[ 0 ][ 0 ];

                    engine.environment.cpuBCD = false;

                    engine.environment.cpuZero = false;

                    engine.environment.cpuHalf =
                        ( rrBefore & 0x000F ) > ( rrAfter & 0x000F );

                    engine.environment.cpuCarry =
                        ( rrBefore & 0x00FF ) > ( rrAfter & 0x00FF );

                    return 4;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'add ' + [
                            parameters[ 0 ].xRegister,
                            Virtjs.FormatUtil.decimal( engine.mmu.readInt8( address ) )
                        ].join( ', ' )
                    };

                }

            },

            // ex: AND 0x12
            AND_n : {

                command : function AND_n( ) {

                    engine.environment.a[ 0 ] &= this.readUint8( );

                    engine.environment.cpuBCD = false;

                    engine.environment.cpuZero = engine.environment.a[ 0 ] === 0;

                    engine.environment.cpuHalf = true;

                    engine.environment.cpuCarry = false;

                    return 2;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'and ' + [
                            Virtjs.FormatUtil.hexadecimal( engine.mmu.readUint8( address ), 8 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: AND b
            AND_r : {

                command : function AND_r( ) {

                    engine.environment.a[ 0 ] &= parameters[ 0 ][ 0 ];

                    engine.environment.cpuBCD   = false;

                    engine.environment.cpuZero  = engine.environment.a[ 0 ] === 0;

                    engine.environment.cpuHalf  = true;

                    engine.environment.cpuCarry = false;

                    return 1;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'and ' + [
                            parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: AND (de)
            AND_rrm : {

                command : function AND_rrm( ) {

                    engine.environment.a[ 0 ] &= engine.mmu.readUint16( parameters[ 0 ][ 0 ] );

                    engine.environment.cpuBCD = false;

                    engine.environment.cpuZero = engine.environment.a[ 0 ] === 0;

                    engine.environment.cpuHalf = true;

                    engine.environment.cpuCarry = false;

                    return 2;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'and ' + [
                            '(' + parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: CALL C, 0x1234
            CALL_C_nn : {

                command : function CALL_C_nn( ) {

                    var target = this.readUint16( );

                    if ( ! engine.environment.cpuCarry )
                        return 3;

                    this.push( engine.environment.pc[ 0 ] );
                    engine.environment.pc[ 0 ] = target;

                    return 6;

                },

                debug : function ( address ) {

                    return {
                        size : 3,
                        label : 'call c ' + [
                            Virtjs.FormatUtil.address( engine.mmu.readUint16( address ), 16 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: CALL NC, 0x1234
            CALL_NC_nn : {

                command : function CALL_NC_nn( ) {

                    var target = this.readUint16( );

                    if ( engine.environment.cpuCarry )
                        return 3;

                    this.push( engine.environment.pc[ 0 ] );
                    engine.environment.pc[ 0 ] = target;

                    return 6;

                },

                debug : function ( address ) {

                    return {
                        size : 3,
                        label : 'call nc ' + [
                            Virtjs.FormatUtil.address( engine.mmu.readUint16( address ), 16 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: CALL NZ, 0x1234
            CALL_NZ_nn : {

                command : function CALL_NZ_nn( ) {

                    var target = this.readUint16( );

                    if ( engine.environment.cpuZero )
                        return 3;

                    this.push( engine.environment.pc[ 0 ] );
                    engine.environment.pc[ 0 ] = target;

                    return 6;

                },

                debug : function ( address ) {

                    return {
                        size : 3,
                        label : 'call nz ' + [
                            Virtjs.FormatUtil.address( engine.mmu.readUint16( address ), 16 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: CALL Z, 0x1234
            CALL_Z_nn : {

                command : function CALL_Z_nn( ) {

                    var target = this.readUint16( );

                    if ( ! engine.environment.cpuZero )
                        return 3;

                    this.push( engine.environment.pc[ 0 ] );
                    engine.environment.pc[ 0 ] = target;

                    return 6;

                },

                debug : function ( address ) {

                    return {
                        size : 3,
                        label : 'call z ' + [
                            Virtjs.FormatUtil.address( engine.mmu.readUint16( address ), 16 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: CALL 0x1234
            CALL_nn : {

                command : function CALL_nn( ) {

                    var target = this.readUint16( );

                    this.push( engine.environment.pc[ 0 ] );
                    engine.environment.pc[ 0 ] = target;

                    return 6;

                },

                debug : function ( address ) {

                    return {
                        size : 3,
                        label : 'call ' + [
                            Virtjs.FormatUtil.address( engine.mmu.readUint16( address ), 16 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: CCF
            CCF : {

                command : function CCF( ) {

                    engine.environment.cpuBCD = false;

                    engine.environment.cpuHalf = false;

                    engine.environment.cpuCarry = ! engine.environment.cpuCarry;

                    return 1;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'ccf'
                    };

                }

            },

            // ex: CPL
            CPL : {

                command : function CPL( ) {

                    engine.environment.a[ 0 ] = ~ engine.environment.a[ 0 ];

                    engine.environment.cpuBCD = true;

                    engine.environment.cpuHalf = true;

                    return 1;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'cpl'
                    };

                }

            },

            // ex: CP 0x12
            CP_n : {

                command : function CP_n( ) {

                    var a = engine.environment.a[ 0 ];
                    var n = this.readUint8( );

                    var cmp = ( a - n ) & 0xFF;

                    engine.environment.cpuBCD = true;

                    engine.environment.cpuZero = cmp === 0;

                    engine.environment.cpuHalf =
                        ( cmp & 0x0F ) > ( a & 0x0F );

                    engine.environment.cpuCarry =
                        ( cmp ) > ( a );

                    return 2;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'cp ' + [
                            Virtjs.FormatUtil.hexadecimal( engine.mmu.readUint8( address ), 8 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: CP b
            CP_r : {

                command : function CP_r( ) {

                    var a = engine.environment.a[ 0 ];
                    var r = parameters[ 0 ][ 0 ];

                    var cmp = ( a - r ) & 0xFF;

                    engine.environment.cpuBCD = true;

                    engine.environment.cpuZero = cmp === 0;

                    engine.environment.cpuHalf =
                        ( cmp & 0x0F ) > ( a & 0x0F );

                    engine.environment.cpuCarry =
                        ( cmp ) > ( a );

                    return 1;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'cp ' + [
                            parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: CP (de)
            CP_rrm : {

                command : function CP_rrm( ) {

                    var a = engine.environment.a[ 0 ];
                    var r = engine.mmu.readUint8( parameters[ 0 ][ 0 ] );

                    var cmp = ( a - r ) & 0xFF;

                    engine.environment.cpuBCD = true;

                    engine.environment.cpuZero = cmp === 0;

                    engine.environment.cpuHalf =
                        ( cmp & 0x0F ) > ( a & 0x0F );

                    engine.environment.cpuCarry =
                        ( cmp ) > ( a );

                    return 2;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'cp ' + [
                            '(' + parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: DAA
            DAA : {

                command : function DAA( ) {

                    var correction = 0;

                    correction |= engine.environment.cpuHalf ? 0x06 : 0x00;
                    correction |= engine.environment.cpuCarry ? 0x60 : 0x00;

                    if ( engine.environment.cpuBCD ) {

                        engine.environment.a[ 0 ] -= correction;

                    } else {

                        correction |= ( engine.environment.a[ 0 ] & 0x0F ) > 0x09 ? 0x06 : 0x00;
                        correction |= ( engine.environment.a[ 0 ] & 0xFF ) > 0x99 ? 0x60 : 0x00;

                        engine.environment.a[ 0 ] += correction;

                    }

                    engine.environment.cpuZero = engine.environment.a[ 0 ] === 0;

                    engine.environment.cpuHalf = false;

                    engine.environment.cpuCarry =
                        ( correction & 0x60 ) === 0x60;

                    return 1;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'daa'
                    };

                }

            },

            // ex: DEC b
            DEC_r : {

                command : function DEC_r( ) {

                    var rBefore = parameters[ 0 ][ 0 ];
                    parameters[ 0 ][ 0 ] -= 1;
                    var rAfter = parameters[ 0 ][ 0 ];

                    engine.environment.cpuBCD = true;

                    engine.environment.cpuZero = rAfter === 0;

                    engine.environment.cpuHalf =
                        ( rAfter & 0x0F ) === 0x0F;

                    return 1;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'dec ' + [
                            parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: DEC de
            DEC_rr : {

                command : function DEC_rr( ) {

                    parameters[ 0 ][ 0 ] -= 1;

                    return 2;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'dec ' + [
                            parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: DEC (de)
            DEC_rrm : {

                command : function DEC_rrm( ) {

                    var rrmBefore = engine.mmu.readUint8( parameters[ 0 ][ 0 ] );
                    engine.mmu.writeUint8( parameters[ 0 ][ 0 ], rrmBefore - 1 );
                    var rrmAfter = engine.mmu.readUint8( parameters[ 0 ][ 0 ] );

                    engine.environment.cpuBCD = true;

                    engine.environment.cpuZero = rrmAfter === 0;

                    engine.environment.cpuHalf =
                        ( rrmAfter & 0x0F ) === 0x0F;

                    return 3;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'dec ' + [
                            '(' + parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: DI
            DI : {

                command : function DI( ) {

                    engine.environment.cpuInterruptFeature = false;

                    return 1;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'di'
                    };

                }

            },

            // ex: EI
            EI : {

                command : function EI( ) {

                    engine.environment.cpuInterruptFeature = true;

                    return 1;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'ei'
                    };

                }

            },

            // ex: HALT
            HALT : {

                command : function HALT( ) {

                    engine.environment.cpuHalt = true;

                    return 1;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'halt'
                    };

                }

            },

            // ex: INC b
            INC_r : {

                command : function INC_r( ) {

                    var rBefore = parameters[ 0 ][ 0 ];
                    parameters[ 0 ][ 0 ] += 1;
                    var rAfter = parameters[ 0 ][ 0 ];

                    engine.environment.cpuBCD = false;

                    engine.environment.cpuZero = rAfter === 0;

                    engine.environment.cpuHalf =
                        ( rAfter & 0x0F ) === 0x00;

                    return 1;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'inc ' + [
                            parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: INC de
            INC_rr : {

                command : function INC_rr( ) {

                    parameters[ 0 ][ 0 ] += 1;

                    return 2;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'inc ' + [
                            parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: INC (de)
            INC_rrm : {

                command : function INC_rrm( ) {

                    var rrmBefore = engine.mmu.readUint8( parameters[ 0 ][ 0 ] );
                    engine.mmu.writeUint8( parameters[ 0 ][ 0 ], rrmBefore + 1 );
                    var rrmAfter = engine.mmu.readUint8( parameters[ 0 ][ 0 ] );

                    engine.environment.cpuBCD = false;

                    engine.environment.cpuZero = rrmAfter === 0;

                    engine.environment.cpuHalf =
                        ( rrmAfter & 0x0F ) === 0x00;

                    return 3;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'inc ' + [
                            '(' + parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: JP C, 0x1234
            JP_C_nn : {

                command : function JP_C_nn( ) {

                    var target = this.readUint16( );

                    if ( ! engine.environment.cpuCarry )
                        return 3;

                    engine.environment.pc[ 0 ] = target;

                    return 4;


                },

                debug : function ( address ) {

                    return {
                        size : 3,
                        label : 'jp c ' + [
                            Virtjs.FormatUtil.hexadecimal( engine.mmu.readUint16( address ), 16 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: JP NC, 0x1234
            JP_NC_nn : {

                command : function JP_NC_nn( ) {

                    var target = this.readUint16( );

                    if ( engine.environment.cpuCarry )
                        return 3;

                    engine.environment.pc[ 0 ] = target;

                    return 4;

                },

                debug : function ( address ) {

                    return {
                        size : 3,
                        label : 'jp nc ' + [
                            Virtjs.FormatUtil.hexadecimal( engine.mmu.readUint16( address ), 16 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: JP NZ, 0x1234
            JP_NZ_nn : {

                command : function JP_NZ_nn( ) {

                    var target = this.readUint16( );

                    if ( engine.environment.cpuZero )
                        return 3;

                    engine.environment.pc[ 0 ] = target;

                    return 4;

                },

                debug : function ( address ) {

                    return {
                        size : 3,
                        label : 'jp nz ' + [
                            Virtjs.FormatUtil.hexadecimal( engine.mmu.readUint16( address ), 16 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: JP Z, 0x1234
            JP_Z_nn : {

                command : function JP_Z_nn( ) {

                    var target = this.readUint16( );

                    if ( ! engine.environment.cpuZero )
                        return 3;

                    engine.environment.pc[ 0 ] = target;

                    return 4;

                },

                debug : function ( address ) {

                    return {
                        size : 3,
                        label : 'jp z ' + [
                            Virtjs.FormatUtil.hexadecimal( engine.mmu.readUint16( address ), 16 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: JP 0x1234
            JP_nn : {

                command : function JP_nn( ) {

                    var target = this.readUint16( );

                    engine.environment.pc[ 0 ] = target;

                    return 4;

                },

                debug : function ( address ) {

                    return {
                        size : 3,
                        label : 'jp ' + [
                            Virtjs.FormatUtil.hexadecimal( engine.mmu.readUint16( address ), 16 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: JP de
            JP_rr : {

                command : function JP_rr( ) {

                    engine.environment.pc[ 0 ] = parameters[ 0 ][ 0 ];

                    return 1;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'jp ' + [
                            parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: JR b, +10
            JR_C_sn : {

                command : function JR_C_sn( ) {

                    var relativeOffset = this.readInt8( );

                    if ( ! engine.environment.cpuCarry )
                        return 2;

                    engine.environment.pc[ 0 ] += relativeOffset;

                    return 3;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'jr c ' + [
                            Virtjs.FormatUtil.address( address + engine.mmu.readInt8( address ) + 1, 16 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: JR NC, +10
            JR_NC_sn : {

                command : function JR_NC_sn( ) {

                    var relativeOffset = this.readInt8( );

                    if ( engine.environment.cpuCarry )
                        return 2;

                    engine.environment.pc[ 0 ] += relativeOffset;

                    return 3;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'jr nc ' + [
                            Virtjs.FormatUtil.address( address + engine.mmu.readInt8( address ) + 1, 16 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: JR NZ, +10
            JR_NZ_sn : {

                command : function JR_NZ_sn( ) {

                    var relativeOffset = this.readInt8( );

                    if ( engine.environment.cpuZero )
                        return 2;

                    engine.environment.pc[ 0 ] += relativeOffset;

                    return 3;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'jr nz ' + [
                            Virtjs.FormatUtil.address( address + engine.mmu.readInt8( address ) + 1, 16 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: JR Z, +10
            JR_Z_sn : {

                command : function JR_Z_sn( ) {

                    var relativeOffset = this.readInt8( );

                    if ( ! engine.environment.cpuZero )
                        return 2;

                    engine.environment.pc[ 0 ] += relativeOffset;

                    return 3;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'jr z ' + [
                            Virtjs.FormatUtil.address( address + engine.mmu.readInt8( address ) + 1, 16 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: JR +10
            JR_sn : {

                command : function JR_sn( ) {

                    var relativeOffset = this.readInt8( );

                    engine.environment.pc[ 0 ] += relativeOffset;

                    return 3;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'jr ' + [
                            Virtjs.FormatUtil.address( address + engine.mmu.readInt8( address ) + 1, 16 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: LDD b, (de)
            LDD_r_rrm : {

                command : function LDD_r_rrm( ) {

                    parameters[ 0 ][ 0 ] = engine.mmu.readUint8( parameters[ 1 ][ 0 ] );

                    parameters[ 1 ][ 0 ] -= 1;

                    return 2;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'ldd ' + [
                            parameters[ 0 ].xRegister,
                            '(' + parameters[ 1 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: LDD (de), b
            LDD_rrm_r : {

                command : function LDD_rrm_r( ) {

                    engine.mmu.writeUint8( parameters[ 0 ][ 0 ], parameters[ 1 ][ 0 ] );

                    parameters[ 0 ][ 0 ] -= 1;

                    return 2;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'ldd ' + [
                            '(' + parameters[ 0 ].xRegister + ')',
                            parameters[ 1 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: LDHL de, +10
            LDHL_rr_n : {

                command : function LDHL_rr_sn( ) {

                    engine.environment.hl[ 0 ] = parameters[ 0 ][ 0 ];

                    var hlBefore = engine.environment.hl[ 0 ];
                    engine.environment.hl[ 0 ] += this.readInt8( );
                    var hlAfter = engine.environment.hl[ 0 ];

                    engine.environment.cpuBCD = false;

                    engine.environment.cpuZero = false;

                    engine.environment.cpuHalf =
                        ( hlBefore & 0x0F ) > ( hlAfter & 0x0F );

                    engine.environment.cpuCarry =
                        ( hlBefore & 0xFF ) > ( hlAfter & 0xFF );

                    return 3;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'ldhl ' + [
                            parameters[ 0 ].xRegister,
                            Virtjs.FormatUtil.decimal( engine.mmu.readInt8( address ) )
                        ].join( ', ' )
                    };

                }

            },

            // ex: LDH (0x10), b
            LDH_nm_r : {

                command : function LDH_nm_r( ) {

                    engine.mmu.writeUint8( 0xFF00 + this.readUint8( ), parameters[ 0 ][ 0 ] );

                    return 3;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'ldh ' + [
                            '(' + Virtjs.FormatUtil.relativeAddress( 0xFF00, engine.mmu.readUint8( address ), 16, 8 ) + ')',
                            parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: LDH b, (0x10)
            LDH_r_nm : {

                command : function LDH_r_nm( ) {

                    parameters[ 0 ][ 0 ] = engine.mmu.readUint8( 0xFF00 + this.readUint8( ) );

                    return 3;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'ldh ' + [
                            parameters[ 0 ].xRegister,
                            '(' + Virtjs.FormatUtil.relativeAddress( 0xFF00, engine.mmu.readUint8( address ), 16, 8 ) + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: LDI b, (de)
            LDI_r_rrm : {

                command : function LDI_r_rrm( ) {

                    parameters[ 0 ][ 0 ] = engine.mmu.readUint8( parameters[ 1 ][ 0 ] );

                    parameters[ 1 ][ 0 ] += 1;

                    return 2;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'ldi ' + [
                            parameters[ 0 ].xRegister,
                            '(' + parameters[ 1 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: LDI (de), b
            LDI_rrm_r : {

                command : function LDI_rrm_r( ) {

                    engine.mmu.writeUint8( parameters[ 0 ][ 0 ], parameters[ 1 ][ 0 ] );

                    parameters[ 0 ][ 0 ] += 1;

                    return 2;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'ldi ' + [
                            '(' + parameters[ 0 ].xRegister + ')',
                            parameters[ 1 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: LD (0xFF10), b
            LD_nnm_r : {

                command : function LD_nnm_r( ) {

                    engine.mmu.writeUint8( this.readUint16( ), parameters[ 0 ][ 0 ] );

                    return 4;

                },

                debug : function ( address ) {

                    return {
                        size : 3,
                        label : 'ld ' + [
                            Virtjs.FormatUtil.address( engine.mmu.readUint16( address ), 16 ),
                            parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: LD (0xFF10), de
            LD_nnm_rr : {

                command : function LD_nnm_rr( ) {

                    engine.mmu.writeUint16( this.readUint16( ), parameters[ 0 ][ 0 ] );

                    return 5;

                },

                debug : function ( address ) {

                    return {
                        size : 3,
                        label : 'ld ' + [
                            Virtjs.FormatUtil.address( engine.mmu.readUint16( address ), 16 ),
                            parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: LD b, 0x12
            LD_r_n : {

                command : function LD_r_n( ) {

                    parameters[ 0 ][ 0 ] = this.readUint8( );

                    return 2;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'ld ' + [
                            parameters[ 0 ].xRegister,
                            Virtjs.FormatUtil.hexadecimal( engine.mmu.readUint8( address ), 8 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: LD b, (0xFF10)
            LD_r_nnm : {

                command : function LD_r_nnm( ) {

                    parameters[ 0 ][ 0 ] = engine.mmu.readUint8( this.readUint16( ) );

                    return 4;

                },

                debug : function ( address ) {

                    return {
                        size : 3,
                        label : 'ld ' + [
                            parameters[ 0 ].xRegister,
                            Virtjs.FormatUtil.address( engine.mmu.readUint16( address ), 16 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: LD b, b
            LD_r_r : {

                command : function LD_r_r( ) {

                    parameters[ 0 ][ 0 ] = parameters[ 1 ][ 0 ];

                    return 1;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'ld ' + [
                            parameters[ 0 ].xRegister,
                            parameters[ 1 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: LD b, (b)
            LD_r_rm : {

                command : function LD_r_rm( ) {

                    parameters[ 0 ][ 0 ] = engine.mmu.readUint8( 0xFF00 + parameters[ 1 ][ 0 ] );

                    return 2;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'ld ' + [
                            parameters[ 0 ].xRegister,
                            '(' + Virtjs.FormatUtil.relativeAddress( 0xFF00, parameters[ 1 ].xRegister, 16, 8 ) + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: LD b, (de)
            LD_r_rrm : {

                command : function LD_r_rrm( ) {

                    parameters[ 0 ][ 0 ] = engine.mmu.readUint8( parameters[ 1 ][ 0 ] );

                    return 2;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'ld ' + [
                            parameters[ 0 ].xRegister,
                            '(' + parameters[ 1 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: LD (b), b
            LD_rm_r : {

                command : function LD_rm_r( ) {

                    engine.mmu.writeUint8( 0xFF00 + parameters[ 0 ][ 0 ], parameters[ 1 ][ 0 ] );

                    return 2;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'ld ' + [
                            '(' + Virtjs.FormatUtil.relativeAddress( 0xFF00, parameters[ 0 ].xRegister, 16, 8 ) + ')',
                            parameters[ 1 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: LD de, 0x1234
            LD_rr_nn : {

                command : function LD_rr_nn( ) {

                    parameters[ 0 ][ 0 ] = this.readUint16( );

                    return 3;

                },

                debug : function ( address ) {

                    return {
                        size : 3,
                        label : 'ld ' + [
                            parameters[ 0 ].xRegister,
                            Virtjs.FormatUtil.hexadecimal( engine.mmu.readUint16( address ), 16 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: LD de, de
            LD_rr_rr : {

                command : function LD_rr_rr( ) {

                    parameters[ 0 ][ 0 ] = parameters[ 1 ][ 0 ];

                    return 2;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'ld ' + [
                            parameters[ 0 ].xRegister,
                            parameters[ 1 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: LD (de), 0x12
            LD_rrm_n : {

                command : function LD_rrm_n( ) {

                    engine.mmu.writeUint8( parameters[ 0 ][ 0 ], this.readUint8( ) );

                    return 3;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'ld ' + [
                            '(' + parameters[ 0 ].xRegister + ')',
                            Virtjs.FormatUtil.hexadecimal( engine.mmu.readUint8( address ), 8 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: LD (de), b
            LD_rrm_r : {

                command : function LD_rrm_r( ) {

                    engine.mmu.writeUint8( parameters[ 0 ][ 0 ], parameters[ 1 ][ 0 ] );

                    return 2;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'ld ' + [
                            '(' + parameters[ 0 ].xRegister + ')',
                            parameters[ 1 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: NOP
            NOP : {

                command : function NOP( ) {

                    return 1;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'nop'
                    };

                }

            },

            // ex: OR 0x12
            OR_n : {

                command : function OR_n( ) {

                    engine.environment.a[ 0 ] |= engine.mmu.readUint8( engine.environment.pc[ 0 ] );
                    engine.environment.pc[ 0 ] += 1;

                    engine.environment.cpuBCD = false;

                    engine.environment.cpuZero = engine.environment.a[ 0 ] === 0;

                    engine.environment.cpuHalf = false;

                    engine.environment.cpuCarry = false;

                    return 2;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'or ' + [
                            Virtjs.FormatUtil.hexadecimal( engine.mmu.readUint8( address ), 8 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: OR b
            OR_r : {

                command : function OR_r( ) {


                    engine.environment.a[ 0 ] |= parameters[ 0 ][ 0 ];

                    engine.environment.cpuBCD = false;

                    engine.environment.cpuZero = engine.environment.a[ 0 ] === 0;

                    engine.environment.cpuHalf = false;

                    engine.environment.cpuCarry = false;

                    return 1;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'or ' + [
                            parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: OR (de)
            OR_rrm : {

                command : function OR_rrm( ) {

                    engine.environment.a[ 0 ] |= engine.mmu.readUint8( parameters[ 0 ][ 0 ] );

                    engine.environment.cpuBCD = false;

                    engine.environment.cpuZero = engine.environment.a[ 0 ] === 0;

                    engine.environment.cpuHalf = false;

                    engine.environment.cpuCarry = false;

                    return 2;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'or ' + [
                            '(' + parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: POP de
            POP_rr : {

                command : function POP_rr( ) {

                    parameters[ 0 ][ 0 ] = this.pop( );

                    return 3;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'pop ' + [
                            parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: POP af
            POP_AF : {

                command : function POP_AF( ) {

                    engine.environment.af[ 0 ] = this.pop( );

                    return 3;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'pop af'
                    };

                }

            },

            // ex: PREFIX CB
            PREFIX_CB : {

                command : function PREFIX_CB( ) {

                    var opcode = this.readUint8( );

                    return this._opcodeMaps.cbprefixed[ opcode ]( );

                },

                debug : function ( address ) {

                    var opcode = engine.mmu.readUint8( address );
                    var instruction = this._opcodeMaps.cbprefixed[ opcode ];

                    return {
                        size : 2,
                        label : instruction.xDefinition.debug.call( this, address + 1 ).label
                    };

                }

            },

            // ex: PUSH de
            PUSH_rr : {

                command : function PUSH_rr( ) {

                    this.push( parameters[ 0 ][ 0 ] );

                    return 4;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'push ' + [
                            parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: RET
            RET : {

                command : function RET( ) {

                    engine.environment.pc[ 0 ] = this.pop( );

                    return 4;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'ret'
                    };

                }

            },

            // ex: RETI
            RETI : {

                command : function RETI( ) {

                    engine.environment.pc[ 0 ] = this.pop( );

                    engine.environment.cpuInterruptFeature = true;

                    return 4;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'reti'
                    };

                }

            },

            // ex: RET NC
            RET_NC : {

                command : function RET_NC( ) {

                    if ( engine.environment.cpuCarry )
                        return 2;

                    engine.environment.pc[ 0 ] = this.pop( );

                    return 5;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'ret nc'
                    };

                }

            },

            // ex: RET NZ
            RET_NZ : {

                command : function RET_NZ( ) {

                    if ( engine.environment.cpuZero )
                        return 2;

                    engine.environment.pc[ 0 ] = this.pop( );

                    return 5;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'ret nz'
                    };

                }

            },

            // ex: RET Z
            RET_Z : {

                command : function RET_Z( ) {

                    if ( ! engine.environment.cpuZero )
                        return 2;

                    engine.environment.pc[ 0 ] = this.pop( );

                    return 5;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'ret z'
                    };

                }

            },

            // ex: RET b
            RET_C : {

                command : function RET_C( ) {

                    if ( ! engine.environment.cpuCarry )
                        return 2;

                    engine.environment.pc[ 0 ] = this.pop( );

                    return 5;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'ret c'
                    };

                }

            },

            // ex: RLA
            RLA : {

                command : function RLA( ) {

                    var carry = engine.environment.cpuCarry ? 1 : 0;
                    var leftMostBit = engine.environment.a[ 0 ] & 0x80 ? 1 : 0;

                    engine.environment.a[ 0 ] <<= 1;
                    engine.environment.a[ 0 ] |= carry << 0;

                    engine.environment.cpuBCD = false;

                    engine.environment.cpuZero = false;

                    engine.environment.cpuHalf = false;

                    engine.environment.cpuCarry = leftMostBit === 1;

                    return 1;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'rla'
                    };

                }

            },

            // ex: RLCA
            RLCA : {

                command : function RLCA( ) {

                    var leftMostBit = engine.environment.a[ 0 ] & 0x80 ? 1 : 0;

                    engine.environment.a[ 0 ] <<= 1;
                    engine.environment.a[ 0 ] |= leftMostBit << 0;

                    engine.environment.cpuBCD = false;

                    engine.environment.cpuZero = false;

                    engine.environment.cpuHalf = false;

                    engine.environment.cpuCarry = leftMostBit === 1;

                    return 1;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'rlca'
                    };

                }

            },

            // ex: RRA
            RRA : {

                command : function RRA( ) {

                    var carry = engine.environment.cpuCarry ? 1 : 0;
                    var rightMostBit = engine.environment.a[ 0 ] & 0x01 ? 1 : 0;

                    engine.environment.a[ 0 ] >>= 1;
                    engine.environment.a[ 0 ] |= carry << 7;

                    engine.environment.cpuBCD = false;

                    engine.environment.cpuZero = false;

                    engine.environment.cpuHalf = false;

                    engine.environment.cpuCarry = rightMostBit === 1;

                    return 1;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'rra'
                    };

                }

            },

            // ex: RRCA
            RRCA : {

                command : function RRCA( ) {

                    var rightMostBit = engine.environment.a[ 0 ] & 0x01 ? 1 : 0;

                    engine.environment.a[ 0 ] >>= 1;
                    engine.environment.a[ 0 ] |= rightMostBit << 7;

                    engine.environment.cpuBCD = false;

                    engine.environment.cpuZero = false;

                    engine.environment.cpuHalf = false;

                    engine.environment.cpuCarry = rightMostBit === 1;

                    return 1;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'rrca'
                    };

                }

            },

            // ex: RST 0x00
            RST_n : {

                command : function RST_n( ) {

                    this.push( engine.environment.pc[ 0 ] );

                    engine.environment.pc[ 0 ] = parameters[ 0 ];

                    return 4;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'rst ' + [
                            Virtjs.FormatUtil.hexadecimal( parameters[ 0 ], 8 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: SBC b, 0x12
            SBC_r_n : {

                command : function SBC_r_n( ) {

                    var carryIn = engine.environment.cpuCarry ? 1 : 0;

                    var rBefore = parameters[ 0 ][ 0 ];
                    parameters[ 0 ][ 0 ] -= this.readUint8( );
                    var rAfter = parameters[ 0 ][ 0 ];
                    parameters[ 0 ][ 0 ] -= carryIn;
                    var rAfterCarry = parameters[ 0 ][ 0 ];

                    engine.environment.cpuBCD = true;

                    engine.environment.cpuZero = rAfterCarry === 0;

                    engine.environment.cpuHalf =
                        ( rAfter      & 0x0F ) > ( rBefore & 0x0F ) ||
                        ( rAfterCarry & 0x0F ) > ( rAfter  & 0x0F );

                    engine.environment.cpuCarry =
                        ( rAfter      ) > ( rBefore ) ||
                        ( rAfterCarry ) > ( rAfter  );

                    return 2;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'sbc ' + [
                            parameters[ 0 ].xRegister,
                            Virtjs.FormatUtil.hexadecimal( engine.mmu.readUint8( address ), 8 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: SBC b, b
            SBC_r_r : {

                command : function SBC_r_r( ) {

                    var carryIn = engine.environment.cpuCarry ? 1 : 0;

                    var rBefore = parameters[ 0 ][ 0 ];
                    parameters[ 0 ][ 0 ] -= parameters[ 1 ][ 0 ];
                    var rAfter = parameters[ 0 ][ 0 ];
                    parameters[ 0 ][ 0 ] -= carryIn;
                    var rAfterCarry = parameters[ 0 ][ 0 ];

                    engine.environment.cpuBCD = true;

                    engine.environment.cpuZero = rAfterCarry === 0;

                    engine.environment.cpuHalf =
                        ( rAfter      & 0x0F ) > ( rBefore & 0x0F ) ||
                        ( rAfterCarry & 0x0F ) > ( rAfter  & 0x0F );

                    engine.environment.cpuCarry =
                        ( rAfter      ) > ( rBefore ) ||
                        ( rAfterCarry ) > ( rAfter  );

                    return 1;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'sbc ' + [
                            parameters[ 0 ].xRegister,
                            parameters[ 1 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: SBC b, (de)
            SBC_r_rrm : {

                command : function SBC_r_rrm( ) {

                    var carryIn = engine.environment.cpuCarry ? 1 : 0;

                    var rBefore = parameters[ 0 ][ 0 ];
                    parameters[ 0 ][ 0 ] -= engine.mmu.readUint8( parameters[ 1 ][ 0 ] );
                    var rAfter = parameters[ 0 ][ 0 ];
                    parameters[ 0 ][ 0 ] -= carryIn;
                    var rAfterCarry = parameters[ 0 ][ 0 ];

                    engine.environment.cpuBCD = true;

                    engine.environment.cpuZero = rAfterCarry === 0;

                    engine.environment.cpuHalf =
                        ( rAfter      & 0x0F ) > ( rBefore & 0x0F ) ||
                        ( rAfterCarry & 0x0F ) > ( rAfter  & 0x0F );

                    engine.environment.cpuCarry =
                        ( rAfter      ) > ( rBefore ) ||
                        ( rAfterCarry ) > ( rAfter  );

                    return 2;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'sbc ' + [
                            parameters[ 0 ].xRegister,
                            '(' + parameters[ 1 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: SCF
            SCF : {

                command : function SCF( ) {

                    engine.environment.cpuBCD = false;

                    engine.environment.cpuHalf = false;

                    engine.environment.cpuCarry = true;

                    return 1;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'scf'
                    };

                }

            },

            // ex: STOP 0
            STOP_0 : {

                command : function STOP_0( ) {

                    // engine.environment.cpuStop = true;

                    engine.environment.pc[ 0 ] += 1;

                    return 1;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'stop 0'
                    };

                }

            },

            // ex: SUB 0x12
            SUB_n : {

                command : function SUB_n( ) {

                    var aBefore = engine.environment.a[ 0 ];
                    engine.environment.a[ 0 ] -= this.readUint8( );
                    var aAfter = engine.environment.a[ 0 ];

                    engine.environment.cpuBCD = true;

                    engine.environment.cpuZero = aAfter === 0;

                    engine.environment.cpuHalf =
                        ( aAfter & 0x0F ) > ( aBefore & 0x0F );

                    engine.environment.cpuCarry =
                        ( aAfter ) > ( aBefore );

                    return 2;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'sub ' + [
                            Virtjs.FormatUtil.hexadecimal( engine.mmu.readUint8( address ), 8 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: SUB b
            SUB_r : {

                command : function SUB_r( ) {

                    var aBefore = engine.environment.a[ 0 ];
                    engine.environment.a[ 0 ] -= parameters[ 0 ][ 0 ];
                    var aAfter = engine.environment.a[ 0 ];

                    engine.environment.cpuBCD = true;

                    engine.environment.cpuZero = aAfter === 0;

                    engine.environment.cpuHalf =
                        ( aAfter & 0x0F ) > ( aBefore & 0x0F );

                    engine.environment.cpuCarry =
                        ( aAfter ) > ( aBefore );

                    return 1;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'sub ' + [
                            parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: SUB (de)
            SUB_rrm : {

                command : function SUB_rrm( ) {

                    var aBefore = engine.environment.a[ 0 ];
                    engine.environment.a[ 0 ] -= engine.mmu.readUint8( parameters[ 0 ][ 0 ] );
                    var aAfter = engine.environment.a[ 0 ];

                    engine.environment.cpuBCD = true;

                    engine.environment.cpuZero = aAfter === 0;

                    engine.environment.cpuHalf =
                        ( aAfter & 0x0F ) > ( aBefore & 0x0F );

                    engine.environment.cpuCarry =
                        ( aAfter ) > ( aBefore );

                    return 2;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'sub ' + [
                            '(' + parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: XOR 0x12
            XOR_n : {

                command : function XOR_n( ) {

                    engine.environment.a[ 0 ] ^= this.readUint8( );

                    engine.environment.cpuBCD = false;

                    engine.environment.cpuZero = engine.environment.a[ 0 ] === 0;

                    engine.environment.cpuHalf = false;

                    engine.environment.cpuCarry = false;

                    return 2;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'xor ' + [
                            Virtjs.FormatUtil.hexadecimal( engine.mmu.readUint8( address ), 8 )
                        ].join( ', ' )
                    };

                }

            },

            // ex: XOR b
            XOR_r : {

                command : function XOR_r( ) {

                    engine.environment.a[ 0 ] ^= parameters[ 0 ][ 0 ];

                    engine.environment.cpuBCD = false;

                    engine.environment.cpuZero = engine.environment.a[ 0 ] === 0;

                    engine.environment.cpuHalf = false;

                    engine.environment.cpuCarry = false;

                    return 1;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'xor ' + [
                            parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: XOR (de)
            XOR_rrm : {

                command : function XOR_rrm( ) {

                    engine.environment.a[ 0 ] ^= engine.mmu.readUint8( parameters[ 0 ][ 0 ] );

                    engine.environment.cpuBCD = false;

                    engine.environment.cpuZero = engine.environment.a[ 0 ] === 0;

                    engine.environment.cpuHalf = false;

                    engine.environment.cpuCarry = false;

                    return 2;

                },

                debug : function ( address ) {

                    return {
                        size : 1,
                        label : 'xor ' + [
                            '(' + parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            }

        },

        cbprefixed : {

            // ex: BIT 0, b
            BIT_n_r : {

                command : function BIT_n_r( ) {

                    var test = ( parameters[ 1 ][ 0 ] & ( 1 << parameters[ 0 ] ) ) === 0;

                    engine.environment.cpuBCD = false;

                    engine.environment.cpuZero = test;

                    engine.environment.cpuHalf = true;

                    return 2;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'bit ' + [
                            parameters[ 0 ],
                            parameters[ 1 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: BIT 0, (de)
            BIT_n_rrm : {

                command : function BIT_n_rrm( ) {

                    var value = engine.mmu.readUint8( parameters[ 1 ][ 0 ] );
                    var test = ( value & ( 1 << parameters[ 0 ] ) ) === 0;

                    engine.environment.cpuBCD = false;

                    engine.environment.cpuZero = test;

                    engine.environment.cpuHalf = true;

                    return 3;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'bit ' + [
                            parameters[ 0 ],
                            '(' + parameters[ 1 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: RES 0, b
            RES_n_r : {

                command : function RES_n_r( ) {

                    parameters[ 1 ][ 0 ] &= ~ ( 1 << parameters[ 0 ] );

                    return 2;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'res ' + [
                            parameters[ 0 ],
                            parameters[ 1 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: RES 0, (de)
            RES_n_rrm : {

                command : function RES_n_rrm( ) {

                    var newValue = engine.mmu.readUint8( parameters[ 1 ][ 0 ] ) & ~ ( 1 << parameters[ 0 ] );
                    engine.mmu.writeUint8( parameters[ 1 ][ 0 ], newValue );

                    return 4;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'res ' + [
                            parameters[ 0 ],
                            '(' + parameters[ 1 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: RLC b
            RLC_r : {

                command : function RLC_r( ) {

                    var rBefore = parameters[ 0 ][ 0 ], leftMostBit = rBefore & 0x80 ? 1 : 0;
                    parameters[ 0 ][ 0 ] = ( rBefore << 1 ) | ( leftMostBit << 0 );
                    var rAfter = parameters[ 0 ][ 0 ];

                    engine.environment.cpuBCD = false;

                    engine.environment.cpuZero = rAfter === 0;

                    engine.environment.cpuHalf = false;

                    engine.environment.cpuCarry = leftMostBit === 1;

                    return 2;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'rlc ' + [
                            parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: RLC (de)
            RLC_rrm : {

                command : function RLC_rrm( ) {

                    var rrmBefore = engine.mmu.readUint8( parameters[ 0 ][ 0 ] ), leftMostBit = rrmBefore & 0x80 ? 1 : 0;
                    engine.mmu.writeUint8( parameters[ 0 ][ 0 ], ( rrmBefore << 1 ) | ( leftMostBit << 0 ) );
                    var rrmAfter = engine.mmu.readUint8( parameters[ 0 ][ 0 ] );

                    engine.environment.cpuBCD = false;

                    engine.environment.cpuZero = rrmAfter === 0;

                    engine.environment.cpuHalf = false;

                    engine.environment.cpuCarry = leftMostBit === 1;

                    return 4;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'rlc ' + [
                            '(' + parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: RL b
            RL_r : {

                command : function RL_r( ) {

                    var carry = engine.environment.cpuCarry ? 1 : 0;

                    var rBefore = parameters[ 0 ][ 0 ];
                    parameters[ 0 ][ 0 ] = ( rBefore << 1 ) | ( carry << 0 );
                    var rAfter = parameters[ 0 ][ 0 ];

                    engine.environment.cpuBCD = false;

                    engine.environment.cpuZero = rAfter === 0;

                    engine.environment.cpuHalf = false;

                    engine.environment.cpuCarry =
                        ( rBefore & 0x80 ) === 0x80;

                    return 2;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'rl ' + [
                            parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: RL (de)
            RL_rrm : {

                command : function RL_rrm( ) {

                    var carry = engine.environment.cpuCarry ? 1 : 0;

                    var rrmBefore = engine.mmu.readUint8( parameters[ 0 ][ 0 ] );
                    engine.mmu.writeUint8( parameters[ 0 ][ 0 ], ( rrmBefore << 1 ) | ( carry << 0 ) );
                    var rrmAfter = engine.mmu.readUint8( parameters[ 0 ][ 0 ] );

                    engine.environment.cpuBCD = false;

                    engine.environment.cpuZero = rrmAfter === 0;

                    engine.environment.cpuHalf = false;

                    engine.environment.cpuCarry =
                        ( rrmBefore & 0x80 ) === 0x80;

                    return 4;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'rl ' + [
                            '(' + parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: RRC b
            RRC_r : {

                command : function RRC_r( ) {

                    var rBefore = parameters[ 0 ][ 0 ], rightMostBit = rBefore & 0x01 ? 1 : 0;
                    parameters[ 0 ][ 0 ] = ( rBefore >> 1 ) | ( rightMostBit << 7 );
                    var rAfter = parameters[ 0 ][ 0 ];

                    engine.environment.cpuBCD = false;

                    engine.environment.cpuZero = rAfter === 0;

                    engine.environment.cpuHalf = false;

                    engine.environment.cpuCarry = rightMostBit === 1;

                    return 2;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'rrc ' + [
                            parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: RRC (de)
            RRC_rrm : {

                command : function RRC_rrm( ) {

                    var rrmBefore = engine.mmu.readUint8( parameters[ 0 ][ 0 ] ), rightMostBit = rrmBefore & 0x01 ? 1 : 0;
                    engine.mmu.writeUint8( parameters[ 0 ][ 0 ], ( rrmBefore >> 1 ) | ( rightMostBit << 7 ) );
                    var rrmAfter = engine.mmu.readUint8( parameters[ 0 ][ 0 ] );

                    engine.environment.cpuBCD = false;

                    engine.environment.cpuZero = rrmAfter === 0;

                    engine.environment.cpuHalf = false;

                    engine.environment.cpuCarry = rightMostBit === 1;

                    return 4;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'rrc ' + [
                            '(' + parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: RR b
            RR_r : {

                command : function RR_r( ) {

                    var carry = engine.environment.cpuCarry ? 1 : 0;

                    var rBefore = parameters[ 0 ][ 0 ];
                    parameters[ 0 ][ 0 ] = ( carry << 7 ) | ( rBefore >> 1 );
                    var rAfter = parameters[ 0 ][ 0 ];

                    engine.environment.cpuBCD = false;

                    engine.environment.cpuZero = rAfter === 0;

                    engine.environment.cpuHalf = false;

                    engine.environment.cpuCarry =
                        ( rBefore & 0x01 ) === 0x01;

                    return 2;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'rr ' + [
                            parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: RR (de)
            RR_rrm : {

                command : function RR_rrm( ) {

                    var carry = engine.environment.cpuCarry ? 1 : 0;

                    var rrmBefore = engine.mmu.readUint8( parameters[ 0 ][ 0 ] );
                    engine.mmu.writeUint8( parameters[ 0 ][ 0 ], ( carry << 7 ) | ( rrmBefore >> 1 ) );
                    var rrmAfter = engine.mmu.readUint8( parameters[ 0 ][ 0 ] );

                    engine.environment.cpuBCD = false;

                    engine.environment.cpuZero = rrmAfter === 0;

                    engine.environment.cpuHalf = false;

                    engine.environment.cpuCarry =
                        ( rrmBefore & 0x01 ) === 0x01;

                    return 4;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'rr ' + [
                            '(' + parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: SET 0, b
            SET_n_r : {

                command : function SET_n_r( ) {

                    parameters[ 1 ][ 0 ] |= 1 << parameters[ 0 ];

                    return 2;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'set ' + [
                            parameters[ 0 ],
                            parameters[ 1 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: SET 0, (de)
            SET_n_rrm : {

                command : function SET_n_rrm( ) {

                    var newValue = engine.mmu.readUint8( parameters[ 1 ][ 0 ] ) | ( 1 << parameters[ 0 ] );
                    engine.mmu.writeUint8( parameters[ 1 ][ 0 ], newValue );

                    return 4;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'set ' + [
                            parameters[ 0 ],
                            '(' + parameters[ 1 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: SLA b
            SLA_r : {

                command : function SLA_r( ) {

                    var rBefore = parameters[ 0 ][ 0 ];
                    parameters[ 0 ][ 0 ] <<= 1;
                    var rAfter = parameters[ 0 ][ 0 ];

                    engine.environment.cpuBCD = false;

                    engine.environment.cpuZero = rAfter === 0;

                    engine.environment.cpuHalf = false;

                    engine.environment.cpuCarry =
                        ( rBefore & 0x80 ) === 0x80;

                    return 2;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'sla ' + [
                            parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: SLA (de)
            SLA_rrm : {

                command : function SLA_rrm( ) {

                    var rrmBefore = engine.mmu.readUint8( parameters[ 0 ][ 0 ] );
                    engine.mmu.writeUint8( parameters[ 0 ][ 0 ], rrmBefore << 1 );
                    var rrmAfter = engine.mmu.readUint8( parameters[ 0 ][ 0 ] );

                    engine.environment.cpuBCD = false;

                    engine.environment.cpuZero = rrmAfter === 0;

                    engine.environment.cpuHalf = false;

                    engine.environment.cpuCarry =
                        ( rrmBefore & 0x80 ) === 0x80;

                    return 4;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'sla ' + [
                            '(' + parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: SRA b
            SRA_r : {

                command : function SRA_r( ) {

                    var rBefore = parameters[ 0 ][ 0 ];
                    parameters[ 0 ][ 0 ] = ( rBefore >> 1 ) | ( rBefore & 0x80 );
                    var rAfter = parameters[ 0 ][ 0 ];

                    engine.environment.cpuBCD = false;

                    engine.environment.cpuZero = rAfter === 0;

                    engine.environment.cpuHalf = false;

                    engine.environment.cpuCarry =
                        ( rBefore & 0x01 ) === 0x01;

                    return 2;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'sra ' + [
                            parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: SRA (de)
            SRA_rrm : {

                command : function SRA_rrm( ) {

                    var rrmBefore = engine.mmu.readUint8( parameters[ 0 ][ 0 ] );
                    engine.mmu.writeUint8( parameters[ 0 ][ 0 ], ( rrmBefore >> 1 ) | ( rrmBefore & 0x80 ) );
                    var rrmAfter = engine.mmu.readUint8( parameters[ 0 ][ 0 ] );

                    engine.environment.cpuBCD = false;

                    engine.environment.cpuZero = rrmAfter === 0;

                    engine.environment.cpuHalf = false;

                    engine.environment.cpuCarry =
                        ( rrmBefore & 0x01 ) === 0x01;

                    return 4;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'sra ' + [
                            '(' + parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: SRL b
            SRL_r : {

                command : function SRL_r( ) {

                    var rBefore = parameters[ 0 ][ 0 ];
                    parameters[ 0 ][ 0 ] >>= 1;
                    var rAfter = parameters[ 0 ][ 0 ];

                    engine.environment.cpuBCD = false;

                    engine.environment.cpuZero = rAfter === 0;

                    engine.environment.cpuHalf = false;

                    engine.environment.cpuCarry =
                        ( rBefore & 0x01 ) === 0x01;

                    return 2;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'srl ' + [
                            parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: SRL (de)
            SRL_rrm : {

                command : function SRL_rrm( ) {

                    var rrmBefore = engine.mmu.readUint8( parameters[ 0 ][ 0 ] );
                    engine.mmu.writeUint8( parameters[ 0 ][ 0 ], rrmBefore >> 1 );
                    var rrmAfter = engine.mmu.readUint8( parameters[ 0 ][ 0 ] );

                    engine.environment.cpuBCD = false;

                    engine.environment.cpuZero = rrmAfter === 0;

                    engine.environment.cpuHalf = false;

                    engine.environment.cpuCarry =
                        ( rrmBefore & 0x01 ) === 0x01;

                    return 4;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'srl ' + [
                            '(' + parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            },

            // ex: SWAP b
            SWAP_r : {

                command : function SWAP_r( ) {

                    var rBefore = parameters[ 0 ][ 0 ];
                    parameters[ 0 ][ 0 ] = ( rBefore << 4 ) | ( rBefore >> 4 );
                    var rAfter = parameters[ 0 ][ 0 ];

                    engine.environment.cpuBCD = false;

                    engine.environment.cpuZero = rAfter === 0;

                    engine.environment.cpuHalf = false;

                    engine.environment.cpuCarry = false;

                    return 2;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'swap ' + [
                            parameters[ 0 ].xRegister
                        ].join( ', ' )
                    };

                }

            },

            // ex: SWAP (de)
            SWAP_rrm : {

                command : function SWAP_rrm( ) {

                    var rrmBefore = engine.mmu.readUint8( parameters[ 0 ][ 0 ] );
                    engine.mmu.writeUint8( parameters[ 0 ][ 0 ], ( rrmBefore << 4 ) | ( rrmBefore >> 4 ) );
                    var rrmAfter = engine.mmu.readUint8( parameters[ 0 ][ 0 ] );

                    engine.environment.cpuBCD = false;

                    engine.environment.cpuZero = rrmAfter === 0;

                    engine.environment.cpuHalf = false;

                    engine.environment.cpuCarry = false;

                    return 4;

                },

                debug : function ( address ) {

                    return {
                        size : 2,
                        label : 'swap ' + [
                            '(' + parameters[ 0 ].xRegister + ')'
                        ].join( ', ' )
                    };

                }

            }

        }

    };

} );
