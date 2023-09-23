import List from "@/components/List";

async function fetchTasks() {
	const res = await fetch("http://localhost:8888/tasks");
	return await res.json();
}

export default async function RootPage() {
	const data = await fetchTasks();

	return (
		<>
 			<h1 className="text-2xl mb-4">Home Page</h1>
			<List data={data} />
		</>
	);
}
