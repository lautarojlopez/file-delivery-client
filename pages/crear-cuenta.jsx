import {useContext} from 'react'
import Layout from '../components/Layout'
import Error from '../components/Error'
import { useFormik } from 'formik'
import * as yup from 'yup'
import authContext from '../context/auth/authContext'

const crearCuenta = () => {

	//Acceder al statede auth
	const AuthContext = useContext(authContext)
	const {registrarUsuario, mensaje} = AuthContext

	const form = useFormik({
		initialValues:{
			nombre: '',
			email: '',
			password: ''
		},
		validationSchema: yup.object({
			nombre: yup.string().required('Escribe tu nombre'),
			email: yup.string().email('El e-mail no es válido').required('Escribe tu e-mail'),
			password: yup.string().required('Escribe tu contraseña').min(6, 'La contraseña debe contener al menos 6 caracteres')
		}),
		onSubmit: (valores) => {
			registrarUsuario(valores)
		}
	})

	return(
		<Layout>
			<div className="w-4/12 mx-auto">
				<h2 className="text-center mb-5 titulo">Crear Cuenta</h2>
				<form onSubmit={form.handleSubmit} className="flex flex-col">

					{mensaje ? <Error mensaje={mensaje}/> : null}

					<label>Nombre</label>
					<input value={form.values.nombre} onChange={form.handleChange} type="text" name="nombre" placeholder="Tu Nombre"/>
					{form.errors.nombre && form.touched.nombre ? <Error mensaje={form.errors.nombre}/> : null}

					<label className="mt-3">E-mail</label>
					<input value={form.values.email} onChange={form.handleChange} type="email" name="email" placeholder="Tu e-mail"/>
					{form.errors.email && form.touched.email ? <Error mensaje={form.errors.email}/> : null}

					<label className="mt-3">Contraseña</label>
					<input value={form.values.password} onChange={form.handleChange} type="password" name="password" placeholder="Tu Contraseña"/>
					{form.errors.password && form.touched.password ? <Error mensaje={form.errors.password}/> : null}

					<button type="submit" className="w-full boton mt-5 text-xl">Registrarme</button>
				</form>
			</div>
		</Layout>
	)

}

export default crearCuenta
