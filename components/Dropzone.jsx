import { useCallback, useContext } from 'react'
import { useDropzone } from 'react-dropzone'
import appContext from '../context/app/appContext'
import authContext from '../context/auth/authContext'
import FormularioDescarga from './FormularioDescarga'

const Dropzone = () => {

	const AppContext = useContext(appContext)
	const {mostrarAlerta, subirArchivo, crearEnlace, cargando} = AppContext
	const AuthContext = useContext(authContext)
	const {usuario, autenticado} = AuthContext

	const onDropRejected = () => {
		mostrarAlerta("Debes estar registrado para subir archivos mayores a 1 MB")
	}

	const onDropAccepted = useCallback( async (acceptedFiles) => {

		const formData = new FormData()
		formData.append('archivo', acceptedFiles[0])
		subirArchivo(formData, acceptedFiles[0].path)

	}, [])

	//Dropzone
	const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({onDropAccepted, onDropRejected, maxSize: (usuario ? 1024*1024*10 : 1024*1024)})

	const archivos = acceptedFiles.map((archivo) => (
		<li key={archivo.lastModified} className="">
			<p><i className="fas fa-file mr-2"></i>{archivo.path} ({(archivo.size / Math.pow(1024, 2)).toFixed(2)} MB)</p>
		</li>
	))

	return(
		<div className="h-88 lg:h-auto flex-1 rounded flex flex-col justify-center items-center border-dashed border-2 border-red-600 bg-red-100 transition-all duration-200 ease-in-out mb-10 lg:mb-0 lg:mr-10">
			{acceptedFiles.length > 0 ?
				<div className="py-5 flex flex-col justify-center items-center">
					<ul className="px-3 w-11/12 shadow my-3 text-center bg-white bg-opacity-75 text-red-600 py-3">
						{archivos}
					</ul>
					{cargando ?
						<>
							<div className="spinner">
							  <div className="bounce1"></div>
							  <div className="bounce2"></div>
							  <div className="bounce3"></div>
							</div>
							<p className="text-center text-red-600 font-bold my-3">Subiendo...</p>
						</>

					:
					(
						<>
							<FormularioDescarga autenticado={autenticado}/>
							<button onClick={() => crearEnlace()} type="button" className="boton"><i className="fas fa-link"></i> Crear Enlace</button>
						</>
					)

					}
				</div>
			:
			<div {...getRootProps({ className: "dropzone focus:outline-none flex justify-center items-center w-full flex-1 cursor-pointer" })}>
				<input className="" {...getInputProps() }/>
				{
					isDragActive ?
					<p className="text-2xl font-bold text-red-600 p-5"><i className="fas fa-file-upload"></i> Suelta el archivo para subirlo</p>
					:
					<div className="text-center">
						<p className="text-2xl font-bold text-red-600 p-5"><i className="fas fa-file-import"></i> Arrastra tu archivo aquí</p>
					</div>
				}
			</div>
			}
		</div>
	)

}

export default Dropzone
