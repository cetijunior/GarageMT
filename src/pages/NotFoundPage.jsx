import { Link } from "react-router-dom";

function NotFoundPage() {
	return (
		<div className="flex flex-col mt-4 items-center justify-center h-screen text-center bg-white">
			<h1 className="text-6xl font-bold mb-4">404</h1>
			<p className="text-2xl mb-6">Oops! Page not found.</p>
			<Link
				to="/"
				className="bg-red-500 text-black px-6 py-3 rounded-full hover:bg-red-600"
			>
				<span className="text-white font-bold">Go Home</span>
			</Link>
		</div>
	);
}

export default NotFoundPage;
