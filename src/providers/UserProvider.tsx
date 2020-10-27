import React, { createContext, useEffect, useState } from "react";
import { auth } from "./../services/Firebase";

export const UserContext = createContext({ user: null });

const UserProvider: React.FC<{ children: any }> = ({ children }) => {
	const [user, setUser] = useState<any>();

	useEffect(() => {
		auth.onAuthStateChanged((userAuth) => {
			setUser(userAuth);
		});
	}, [user]);

	return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
