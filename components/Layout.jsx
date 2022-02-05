import {Fragment} from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Script from 'next/script'

const Layout = ({children}) => {
	return(
		<Fragment>
			<Head>
				<title>File Delivery</title>
				<link rel="preconnect" href="https://fonts.googleapis.com"/>
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
				<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet"/>
				<link rel="preconnect" href="https://fonts.googleapis.com"/>
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
				<link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap" rel="stylesheet"/>
			</Head>
			<Header/>
			<div className="">
				<div className="container mx-auto">
					<main className="p-5 font-poppins">
						{children}
					</main>
				</div>
			</div>
			<Script
				src="https://kit.fontawesome.com/e323a62359.js"
			/>
		</Fragment>
	)
}

export default Layout
