import React, { useEffect } from "react";
import Link from 'next/link'
import { useRouter } from "next/router";

export default function Home() {
	const router = useRouter()
	 
	useEffect(() => {
		router.push('/0')
	}, []);
	
	return (
		<Link href="/"></Link>
	)
}