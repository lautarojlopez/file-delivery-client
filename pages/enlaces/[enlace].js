import {useState, useContext} from 'react'
import Layout from '../../components/Layout'
import axiosClient from '../../config/axios'
import appContext from '../../context/app/appContext'
import Error from '../../components/Error'
import {useRouter} from 'next/router'

export async function getStaticProps({params}){
	const {enlace} = params
	const response = await axiosClient.get(`/api/enlaces/${enlace}`)
	return{
		props:{
			enlace: response.data
		}
	}
}

export async function getStaticPaths(){
	const response = await axiosClient.get('/api/enlaces')
	return{
		paths: response.data.enlaces.map((enlace) => ({
			params:{
				enlace: enlace.url
			}
		})),
		fallback: false
	}
}

export default ({enlace}) => {

	const AppContex = useContext(appContext)
	const {mostrarAlerta, borrarAlerta, mensaje_archivo} = AppContex
	const [isProtected, setIsProtected] = useState(enlace.password ? true : false)
	const router = useRouter()

	const verificarPassword = async (e) => {
		e.preventDefault()
		try {
			const response = await axiosClient.post(`/api/enlaces/${enlace.url}`, {password: e.target[0].value})
			if(response.data){
				setIsProtected(false)
				borrarAlerta()
			}
		} catch (e) {
			mostrarAlerta(e.response.data.msg)
		}

	}

	return(
		<Layout>
			{
				mensaje_archivo ? <div className="md:w-4/5 xl:w-3/5 m-auto"><Error mensaje={mensaje_archivo}/></div> : null
			}
			{
				isProtected ? (
					<div className="md:w-4/5 xl:w-3/5 m-auto">
						<form onSubmit={verificarPassword} className="w-full flex flex-col border border-opacity-25 md:shadow p-5 rounded py-10">
							<h2 className="text-center text-2xl text-red-600 font-bold"><i className="fas fa-lock"></i> Este archivo está protegido</h2>
							<p className="text-center">Ingresa la contraseña para acceder a la descarga</p>
							<div className="w-6/12 flex flex-col m-auto">
								<input type="password" className="input mt-3" placeholder="Contraseña"/>
								<button type="submit" className="boton mt-5"><i className="fas fa-key"></i> Acceder</button>
							</div>
						</form>
					</div>
				)
				: (
					<div className="md:w-4/5 xl:w-3/5 m-auto">
						<div className="flex flex-col border border-opacity-25 md:shadow p-5 rounded py-10">
							<h2 className="text-2xl text-center my-3">Descargar <span className="text-red-600">{enlace.nombre}</span></h2>
							<p  className="text-lg text-center mb-3">Descargas restantes: <span className="text-red-600">{enlace.descargas}</span></p>
							<div className="flex justify-center items-center">
								<a href={`${process.env.backendURL}/api/archivos/${enlace.archivo}`} target="_blank" className="boton"><i className="mr-1 fas fa-download"></i> Descargar</a>
							</div>
						</div>
					</div>
				)
			}
		</Layout>
	)

}
