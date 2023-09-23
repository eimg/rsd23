export default function ProfilePage({ params }) {
	return (
		<>
			<h1 className="text-2xl">Profile Page</h1>
			<p className="text-lg">{params.name}</p>
		</>
	);
}
