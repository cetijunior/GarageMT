import { Link } from "react-router-dom";

function NotFoundPage() {
	return (
		<div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
			<h1 className="text-6xl font-bold mb-4">404</h1>
			<p className="text-2xl mb-6">Oops! Page not found.</p>
			<Link
				to="/"
				className="bg-primary text-white px-6 py-3 rounded-full hover:bg-secondary"
			>
				Go Home
			</Link>
		</div>
	);
}

export default NotFoundPage;
