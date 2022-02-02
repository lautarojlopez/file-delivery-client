import types from '../../types'

export default (state, action) => {
	switch (action.type) {
		case types.USUARIO_AUTENTICADO:
			return{
				...state,
				usuario: action.payload,
				mensaje: null
			}
		case types.REGISTRO_EXITOSO:
			return{
				...state,
				mensaje: action.payload
			}
		case types.USUARIO_AUTENTICADO_ERROR:
		case types.LOGIN_ERROR:
			return{
				...state,
				mensaje: action.payload,
			}
		case types.LOGIN_SUCCESS:
			//Guardar token en local storage
			localStorage.setItem('token', action.payload)
			return{
				...state,
				token: action.payload,
				autenticado: true,
				mensaje: null
			}
		case types.CERRAR_SESION:
			localStorage.removeItem('token')
			return{
				...state,
				usuario: null,
				autenticado: null,
				mensaje: null
			}

		default:
			return state
	}
}
