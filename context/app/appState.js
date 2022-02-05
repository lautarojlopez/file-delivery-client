import React, {useReducer, useContext} from 'react'
import types from '../../types'
import appContext from './appContext'
import appReducer from './appReducer'
import axiosClient from '../../config/axios'

const AppState = ({children}) => {

	const initialState = {
		mensaje_archivo: '',
		nombre: '',
		nombre_original: '',
		cargando: null,
		descargas: 1,
		password: '',
		autor: null,
		url: ''
	}

	const [state, dispatch] = useReducer(appReducer, initialState)

	const mostrarAlerta = (msg) => {
		dispatch({
			type: types.MOSTRAR_ERROR,
			payload: msg
		})
	}

	const borrarAlerta = () => {
		dispatch({
			type: types.BORRAR_ERROR
		})
	}

	const subirArchivo = async (formData, nombreArchivo) => {

		dispatch({
			type: types.SUBIR_ARCHIVO
		})

		try {
			const response = await axiosClient.post('/api/archivos', formData)
			dispatch({
				type: types.SUBIR_ARCHIVO_SUCCESS,
				payload: {
					nombre:response.data.archivo,
					nombre_original: nombreArchivo
				}
			})

		} catch (e) {
			console.log(e.response)
			dispatch({
				type: types.SUBIR_ARCHIVO_ERROR,
				payload: e.response.data.msg
			})
		}
	}

	const crearEnlace = async () => {

		const data = {
			nombre: state.nombre,
			nombre_original: state.nombre_original,
			descargas: state.descargas,
			password: state.password,
			autor: state.autor
		}

		try {
			const response = await axiosClient.post('/api/enlaces', data)
			dispatch({
				type: types.CREAR_ENLACE_SUCCESS,
				payload: response.data.msg
			})
		} catch (e) {
			console.log(e)
		}

	}

	const resetState = () => {
		dispatch({
			type:types.RESET_STATE
		})
	}

	const addPassword = (password) => {
		dispatch({
			type: types.ADD_PASSWORD,
			payload: password
		})
	}

	const addNumeroDescargas = (descargas) => {
		const intDescargas = Number(descargas)
		dispatch({
			type: types.ADD_NUMERO_DESCARGAS,
			payload: intDescargas
		})
	}

	return(
		<appContext.Provider
			value={{
				mensaje_archivo: state.mensaje_archivo,
				nombre_original: state.nombre_original,
				descargas: state.descargas,
				cargando: state.cargando,
				password: state.password,
				nombre: state.nombre,
				autor: state.autor,
				url: state.url,
				addNumeroDescargas,
				mostrarAlerta,
				borrarAlerta,
				subirArchivo,
				addPassword,
				crearEnlace,
				resetState,
			}}
		>
			{children}
		</appContext.Provider>
	)

}

export default AppState
