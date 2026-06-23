class InvalidClientError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'InvalidClientError';
		Object.setPrototypeOf(this, InvalidClientError.prototype);
	}
}

export default InvalidClientError;