export const useAPI = (relativeUrl: string) => {
	if (process.env.NODE_ENV === "development") {
		return `http://localhost:3001/api${relativeUrl}`;
	} else if (process.env.VERCEL_URL) {
		return `https://${process.env.VERCEL_URL}/api${relativeUrl}`;
	} else {
		throw new Error("Environment not correctly defined");
	}
};
