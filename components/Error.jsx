const Error = ({mensaje}) => {

	return(
		<div className="w-full p-3 my-3 border-l-4 border-red-600 bg-red-200 text-red-600 font-bold">
			<p className="flex items-center"><i className="mr-2 text-2xl fas fa-exclamation-circle"></i> {mensaje}</p>
		</div>
	)

}

export default Error
