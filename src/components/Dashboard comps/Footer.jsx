

import React from 'react'	
import logo from '../../assets/asd.png'
import { FaInstagram, FaLinkedin, FaTwitch, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { FaFacebook } from 'react-icons/fa6'

const Footer = () => {
	return (
		<div style={{ background: 'linear-gradient(to right, #121212, #313131)' }}>
			<div className=' max-w-[1300px]  mx-auto pt-10 text-white' >
			<div className=' grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-center gap-10 pb-5'>
				{/* fisrt */}
				<div className=' flex flex-col justify-center items-center gap-2'>
					<h1 className=' py-2 text-white text-xl'>CyberCore</h1>
					<img src={logo} className='w-[100px]'/>
				</div>

				{/* second */}
				<div>
					<div><h1 className='py-2 text-white text-xl'>Quick Links</h1></div>
					<div className=' flex flex-col justify-center items-center gap-2'>
						
						<a className=' text-sm text-gray-400' href='https://rog.asus.com/' target='_blank'> ASUS </a>
						<a className=' text-sm text-gray-400' href='https://store.acer.com/en-in/?utm_campaign=Estore-Gaming&utm_source=google-Search&utm_medium=groupm&utm_term=link-()-()-()-()&gad_source=1' target='_blank'> ACER </a>
				
						<a className=' text-sm text-gray-400' href='https://www.dell.com/en-in/shop/computer-monitors/ar/8605?gacd=10415953-9018-5761040-285934065-0&dgc=PLA&gacd=10415953-9018-5761040-285934065-0&dgc=PLA&&gad_source=1&gclid=CjwKCAiA2cu9BhBhEiwAft6IxENl6VCFyGNUVOZHQr-dfZTyGZh3oXVkVL4zt58-dq4Mv_dPS2zCPxoCYh0QAvD_BwE&gclsrc=aw.ds' target='_blank'>DELL</a>
						<a className=' text-sm text-gray-400' href='https://www.lenovo.com/in/en/d/deals/?orgRef=https%253A%252F%A.google.com%252F&gclid=CjwKCAiA2cu9BhBhEiwAft6IxFSVW0vzwQJLKx5K09jMRG5TjE9lEuiNpvz6YS-gpg1wIP509HXM_hoCKmsQAvD_BwE&sortBy=priceUp&visibleDatas=4353%3ALaptops%3B4376%3ALOQ%2CLegion%2CIdeaPad%2CYoga&cid=in:sem:3vtp7d&gad_source=1&s_kwcid=AL!8093!3!731289379643!e!!g!!lenovo&ef_id=Z62g0QAAAFYTsANW:20250217135706:s' target='_blank'>LENEVO</a>
						
					</div>
				</div>

				{/* third */}
				<div>
					<div><h1 className=' py-2 text-white text-xl'>DESCRIPTION</h1></div>
					<p>Kaustubh Kaustubh viraj Piyush Vict Kaustubh Kaustubh Kaustubh viraj Piyush Vict Kaustubh Kaustubh Piyush Vict Kaustubh Kaustubh Kaustubh viraj Piyush Vict Kaustubh</p>
				</div>

				{/* fourth */}
				<div>
					<div><h1 className=' py-2 text-white text-xl'>Social Media</h1></div>
					<div className=' flex justify-center gap-3'>
						<a href='https://www.instagram.com/_kaustubhh.7?igsh=MWdvbXRld2puc2s3aQ==' target='_blank'><FaInstagram size={25}/></a>
						<a href='https://www.facebook.com/share/1BrC8sTECX/' target='_blank'><FaFacebook size={25}/></a>
						<a href='www.linkedin.com/in/kaustubh-g-3889212b9' target='_blank'><FaLinkedin size={25}/></a>
						
					</div>
				</div>

			</div>
			<hr className=' pt-2'/>
			<div className=' py-2 text-center'>
			</div>
		</div>
		</div>
	)
}

export default Footer