import Layout from '../../components/Layout'
import axiosClient from '../../config/axios'

export async function getServerSideProps({params}){
	const {enlace} = params
	const response = await axiosClient.get(`/api/enlaces/${enlace}`)
	return{
		props:{
			enlace: response.data
		}
	}
}

export async function getServerSidePaths(){
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
	console.log(enlace)
	return(
		<Layout>
			<div className="flex flex-col justify-center items-center">
				<a href={`${process.env.backendURL}/api/archivos/${enlace.archivo}`} className="boton"><i className="mr-1 fas fa-download"></i> Descargar</a>
			</div>
		</Layout>
	)

}
