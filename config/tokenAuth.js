import axiosClient from './axios'

const tokenAuth = (token) => {
	if(token){
		axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
	}
	else{
		axiosClient.defaults.headers.common['Authorization']
	}
}

export default tokenAuth
