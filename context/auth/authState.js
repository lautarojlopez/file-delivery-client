import React, {useReducer} from 'react';
import authContext from './authContext'
import authReducer from './authReducer'
import types from '../../types'
import axiosClient from '../../config/axios'
import tokenAuth from '../../config/tokenAuth'
import Swal from 'sweetalert2'
import router from 'next/router'

const AuthState = ({children}) => {

	//Estado inicial
	const initialState = {
		token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
		autenticado: null,
		usuario: null,
		mensaje: null
	}

	//Reducer
	const [state, dispatch] = useReducer(authReducer, initialState)

	//Registrar usuario
	const registrarUsuario = async (datos) => {
		try {
			const response = await axiosClient.post('/api/usuarios', datos)
			Swal.fire(response.data.msg, '', 'success').then(() => {
				router.push('/iniciar-sesion')
			})
		} catch (e) {
			dispatch({
				type: types.USUARIO_AUTENTICADO_ERROR,
				payload: e.response.data.msg
			})
		}
	}

	//Iniciar sesión
	const iniciarSesion = async (datos) => {
		try {
			const response = await axiosClient.post('/api/auth', datos)
			dispatch({
				type: types.LOGIN_SUCCESS,
				payload: response.data.token
			})
			router.push('/')
		} catch (e) {
			dispatch({
				type: types.LOGIN_ERROR,
				payload: e.response.data.msg
			})
		}
	}

	//Usuario autenticado
	const usuarioAutenticado = async () => {
		const token = localStorage.getItem('token')
		if(token){
			tokenAuth(token)
		}

		try {
			const response = await axiosClient.get('/api/auth')
			if(response.data.usuario){
				dispatch({
					type: types.USUARIO_AUTENTICADO,
					payload: response.data.usuario
				})
			}
		} catch (e) {
			dispatch({
				type: types.LOGIN_ERROR,
				payload: e.response.data.usuario
			})
		}
	}
	//Cerrar sesión
	const cerrarSesion = () => {
		dispatch({
			type: types.CERRAR_SESION
		})
		router.reload()
	}

	return(
		<authContext.Provider
			value={{
				token: state.token,
				autenticado: state.autenticado,
				usuario: state.usuario,
				mensaje: state.mensaje,
				usuarioAutenticado,
				registrarUsuario,
				iniciarSesion,
				usuarioAutenticado,
				cerrarSesion
			}}
		>
			{children}
		</authContext.Provider>
	)

}

export default AuthState
