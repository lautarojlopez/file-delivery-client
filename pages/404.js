import Layout from '../components/Layout'

export default function Custom404(){
	return(
		<Layout>
			<div className="flex flex-col justify-center items-center h-full w-full">
				<h2 className="flex-1 text-center text-6xl text-red-600">Error 404</h2>
				<p className="mt-3 text-red-600 text-2xl">El enlace no existe o ha expirado</p>
			</div>
		</Layout>
	)
}
