import { useContext } from 'react'
import appContext from '../context/app/appContext'


const FormularioDescarga = ({autenticado}) => {

	const AppContext = useContext(appContext)
	const {addPassword, addNumeroDescargas} = AppContext

	return(
		<div className="w-11/12">
			<form action="" className="w-full">
				<fieldset disabled={!autenticado ? 'disabled' : ''} className={autenticado ? 'text-red-600' : 'text-neutral-400'}>
					<label htmlFor="">Descargas</label>
					<select onChange={e => addNumeroDescargas(e.target.value)} name="" id="" className="appereance-none my-3 focus:outline-none border-2 border-red-400 rounded w-full p-2 bg-white">
						<option value="1" defaultselected="true">1</option>
						<option value="5">5</option>
						<option value="10">10</option>
						<option value="15">15</option>
						<option value="20">20</option>
					</select>
					<label htmlFor="">Contraseña (Opcional)</label>
					<input onChange={e => addPassword(e.target.value)} type="password" className="appereance-none my-3 focus:outline-none border-2 border-red-400 rounded w-full p-1 bg-white" placeholder="Contraseña del enlace"/>
					{
						autenticado ? null : <p className="text-sm uppercase text-red-600 font-bold mb-3">Crea una cuenta para desbloquear estas opciones</p>
					}
				</fieldset>
			</form>
		</div>
	)
}

export default FormularioDescarga
