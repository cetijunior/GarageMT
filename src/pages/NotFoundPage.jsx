import { Link } from "react-router-dom";

function NotFoundPage() {
	return (
		<div className="flex -mt-36 flex-col items-center justify-center h-screen bg-gradient-to-br from-red-700 to-red-900 text-white">
			<h1 className="text-8xl md:text-9xl font-extrabold mb-4 drop-shadow-lg">
				404
			</h1>
			<p className="text-lg md:text-2xl font-semibold mb-6 drop-shadow-md">
				Oops! The page you're looking for doesn't exist.
			</p>
			<Link
				to="/"
				className="bg-white text-red-700 px-8 py-3 rounded-full font-bold shadow-lg hover:bg-gray-200 transition duration-200"
			>
				Go Back Home
			</Link>
		</div>
	);
}

export default NotFoundPage;
