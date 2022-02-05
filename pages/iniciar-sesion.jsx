import {useContext, useEffect} from 'react'
import Layout from '../components/Layout'
import Error from '../components/Error'
import { useFormik } from 'formik'
import * as yup from 'yup'
import authContext from '../context/auth/authContext'
import router from 'next/router'

const IniciarSesion = () => {

	//Context
	const AuthContext = useContext(authContext)
	const {usuarioAutenticado, iniciarSesion, mensaje, autenticado} = AuthContext

	useEffect(() => {
		if(autenticado){
			router.push('/')
		}
	}, [autenticado])

	const form = useFormik({
		initialValues:{
			email: '',
			password: ''
		},
		validationSchema: yup.object({
			email: yup.string().required('Escribe tu e-mail'),
			password: yup.string().required('Escribe tu contraseña')
		}),
		onSubmit: (valores) => {
			iniciarSesion(valores)
		}
	})

	return(
		<Layout>
			<div className="w-11/12 md:w-8/12 lg:w-6/12 xl:w-4/12 mx-auto">
				<h2 className="text-center mb-5 titulo">Iniciar Sesión</h2>
				<form onSubmit={form.handleSubmit} className="flex flex-col">

					{mensaje ? <Error mensaje={mensaje}/> : null}

					<label className="label mt-3">E-mail</label>
					<input className="input" value={form.values.email} onChange={form.handleChange} type="email" name="email" placeholder="Tu e-mail"/>
					{form.errors.email && form.touched.email ? <Error mensaje={form.errors.email}/> : null}

					<label className="label mt-3">Contraseña</label>
					<input className="input" value={form.values.password} onChange={form.handleChange} type="password" name="password" placeholder="Tu Contraseña"/>
					{form.errors.password && form.touched.password ? <Error mensaje={form.errors.password}/> : null}

					<button type="submit" className="w-full boton mt-5 text-xl">Ingresar</button>
				</form>
			</div>
		</Layout>
	)
}

export default IniciarSesion
