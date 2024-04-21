export const validateEmail = (email: string) => {
	return email.match(
		// eslint-disable-next-line no-useless-escape
		/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
	);
};
