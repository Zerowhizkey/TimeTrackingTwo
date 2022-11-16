import { useProjects } from "../context/ProjectContext";
import { v4 as uuid } from "uuid";
import { useState } from "react";

const Users = () => {
	const [name, setName] = useState("");
	const { users, addUser, deleteUser, dispatchCurrent, current } =
		useProjects();

	const handleAddUser = async () => {
		const userData = {
			id: uuid(),
			name: name,
		};
		await addUser(userData);
	};

	const handleUser = (e) => {
		dispatchCurrent({ id: e.target.value, type: "user" });
	};

	return (
		<div>
			<h4>Users</h4>
			{users ? (
				users.map((user) => (
					<ul key={user.id}>
						<li>
							<input
								type="radio"
								value={user.id}
								onChange={handleUser}
								checked={user.id === current.user}
							/>
							{user.name}
							<button onClick={() => deleteUser(user.id)}>X</button>
						</li>
					</ul>
				))
			) : (
				<div>
					<p>No users found</p>
				</div>
			)}

			<div>
				<p>Create a user</p>
				<input type="text" onChange={(e) => setName(e.target.value)} />
				<button onClick={handleAddUser}>Create</button>
			</div>
		</div>
	);
};

export default Users;
