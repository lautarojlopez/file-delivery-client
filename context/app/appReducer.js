import types from '../../types'
export default (state, action) => {
	switch (action.type) {
		case types.MOSTRAR_ERROR:
			return{
				...state,
				mensaje_archivo: action.payload
			}
		case types.BORRAR_ERROR:
			return{
				...state,
				mensaje_archivo: null
			}
		case types.SUBIR_ARCHIVO_SUCCESS:
			return{
				...state,
				nombre: action.payload.nombre,
				nombre_original: action.payload.nombre_original,
				cargando: false
			}
		case types.SUBIR_ARCHIVO_ERROR:
			return{
				...state,
				mensaje_archivo: action.payload,
				cargando: false
			}
		case types.SUBIR_ARCHIVO:
			return{
				...state,
				cargando: true
			}
		case types.CREAR_ENLACE_SUCCESS:
			return{
				...state,
				url: action.payload
			}
		case types.RESET_STATE:
			return{
				...state,
				mensaje_archivo: '',
				nombre: '',
				nombre_original: '',
				cargando: null,
				descargas: 1,
				password: '',
				autor: null,
				url: ''
			}
		case types.ADD_PASSWORD:
			return{
				...state,
				password: action.payload
			}
		case types.ADD_NUMERO_DESCARGAS:
			return{
				...state,
				descargas: action.payload
			}
		default:
			return state
	}
}
