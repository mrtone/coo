define( [ 'Base', 'Mat4', 'Display' ], function( Base, Mat4, Display ) {

    var Projector = Base.extend( {

        initialize: function( ){

            this.projectionMatrix = new Mat4( );
            this.cameraViewMatrix = new Mat4( );

            this.objects            = [ ];
            this.transparentObjects = [ ];
            this.opaqueObjects      = [ ];
            this.lights             = [ ];

        },

        projectScene: function( scene, camera ){

            camera.parent || scene.add( camera );

            scene.updateWorldMatrix( );

            this.projectionMatrix = camera.projectionMatrix;
            this.cameraViewMatrix.invert( camera.worldMatrix );
            
            var objects             = this.objects              = [ ];
            var transparentObjects  = this.transparentObjects   = [ ];
            var opaqueObjects       = this.opaqueObjects        = [ ];
            var lights              = this.lights               = [ ];

            ( function( node ){

                if( node instanceof Display ) {

                    if( !!node.visible ) {

                    // if( object3D.material.alpha !== 1 ) {

                        // transparentObjects.push( object3D );

                    // } else {

                        opaqueObjects.push( node );
                    
                    // }
                    }

                }

                // if( object3D.__type__ === D3.objectTypes.LIGHT ) {

                //  lights.push( object3D );

                // }
                
                objects.push( node );

                if( !!node.children.length ) {

                    var c = node.children.length;
                    while( c-- ) {
                        arguments.callee( node.children[ c ] );
                    }

                }

            } )( scene );

            return this;

        }

    } );

    return Projector;

	// Projector.prototype.projectVector = function( vector, camera ){

	// 	__m4_1.val( camera.matrixWorld ).invert( );
	// 	__m4_2.multiply( camera.projectionMatrix, __m4_1 );
	// 	return vector.applyProjection( __m4_2 );

	// };

	// Projector.prototype.unprojectVector = function( vector, camera ){

	// 	__m4_1.invert( camera.projectionMatrix );
	// 	__m4_2.multiply( camera.matrixWorld, __m4_1 );
	// 	return vector.applyProjection( __m4_2 );

	// };

	// var __m4_1 = new Mat4( );
	// var __m4_2 = new Mat4( );

} );