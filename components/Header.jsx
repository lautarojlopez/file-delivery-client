import Link from 'next/link'
import authContext from '../context/auth/authContext'
import appContext from '../context/app/appContext'
import {useContext} from 'react'
import {useRouter} from 'next/router'

const Header = () => {

	const AuthContext = useContext(authContext)
	const {usuario, cerrarSesion} = AuthContext
	const AppContext = useContext(appContext)
	const {resetState} = AppContext
	const router = useRouter()

	const redirect = () => {
		resetState()
		router.push('/')
	}

	return(
		<header className="font-poppins flex flex-col md:flex-row items-center justify-between md:px-20 py-5 shadow">
				<h1 onClick={() => redirect()} className="cursor-pointer text-4xl font-bold font-poppins"><i className="text-red-500 fas fa-file-download"></i> File Delivery</h1>
			{usuario ?
				<div className="flex flex-col md:flex-row mt-3 md:mt-0 items-center mt-3 md:mt-0">
					<p className="text-xl mb-3 md:mb-0">Hola, <span className="font-bold text-red-600 mr-3">{usuario.nombre}</span></p>
					<button onClick={cerrarSesion} className="boton-hollow mr-3">Cerrar Sesión</button>
				</div>
			:
			<div className="flex flex-col md:flex-row mt-3 md:mt-0">
				<Link href="/iniciar-sesion"><a className="boton-hollow md:mr-3">Iniciar Sesión</a></Link>
				<Link href="/crear-cuenta"><a className="boton mt-3 md:mt-0">Crear Cuenta</a></Link>
			</div>
			}
		</header>
	)

}

export default Header
