import {useEffect, useContext} from 'react'
import Layout from '../components/Layout'
import authContext from '../context/auth/authContext'
import appContext from '../context/app/appContext'
import Link from 'next/link'
import Dropzone from '../components/Dropzone'
import Error from '../components/Error'

const Home = () => {

	const AuthContext = useContext(authContext)
	const {usuarioAutenticado} = AuthContext
	const AppContext = useContext(appContext)
	const {mensaje_archivo, borrarAlerta, url} = AppContext

	useEffect(() => {
		const token = localStorage.getItem('token')
		if(token){
			usuarioAutenticado()
		}
		borrarAlerta()
	}, [])

	return (
	  <Layout>
		  <div className="md:w-4/5 xl:w-3/5 m-auto">
		  {
			  mensaje_archivo ? <Error mensaje={mensaje_archivo}/> : null
		  }
			<div className="lg:flex border border-opacity-25 md:shadow p-5 rounded py-10">
				{
					url ? (
						<div className="md:flex-1 rounded flex flex-col justify-center items-center transition-all duration-200 ease-in-out mb-10 lg:mb-0 lg:mr-10">
							<p className="text-xl text-center">Tu URL es:</p>
							<a href={`${process.env.frontendURL}/enlaces/${url}`} target="_blank" className="my-3 text-red-600 hover:text-red-500 transition-all ease-in-out duration-150">{`${process.env.frontendURL}/archivo/${url}`}</a>
							<button onClick={() => navigator.clipboard.writeText(`${process.env.frontendURL}/enlaces/${url}`)} type="button" className="boton"><i className="fas fa-copy mr-1"></i> Copiar Enlace</button>
						</div>
					)
					: <Dropzone/>
				}

				<div className="lg:w-6/12">
					<p className="font-black text-gray-800 pb-3 text-2xl">Sube archivos y compartelos de manera privada limitando las descargas</p>
					<p className="py-3"><span className="text-red-600 font-bold">File Delivery</span> te permite compartir archivos de manera privada cifrándolos con contraseñas y eliminandolos luego de un numero de descargas, asegurandote de que tus archivos no permanezcan en línea para siempre.</p>
					<p className="text-red-600 mb-5 font-semibold">Crea una cuenta ahora mismo para acceder a más opciones</p>
					<Link href="/crear-cuenta"><a className="boton block text-center mt-2">Crear Cuenta</a></Link>
				</div>
			</div>
		  </div>
	  </Layout>
	)
}

export default Home
