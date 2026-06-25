import React, { useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import AuthenticationError from "../../../exceptions/AuthenticationError";
import InternalServerError from "../../../exceptions/InternalServerError";
import type { AccountCredentials } from "../../../models/auth/AccountCredentials";


interface Form {
	username: string,
	password: string
}

function useSignIn() {
	const [form, setForm] = useState<Form>({
		username: '',
		password: ''
	});
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const { signIn } = useAuthContext();

	function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setForm((prev) => ({
			...prev,
			[name]: value
		}));
	}

	async function login() {
		setLoading(true);

		if (!form.username) {
			setError('Informe o usuário');
			setLoading(false);
			return;
		}
		if (!form.password) {
			setError('Informe a senha');
			setLoading(false);
			return;
		}

		const credentials: AccountCredentials = {
			username: form.username,
			password: form.password
		}

		try {
			await signIn(credentials);
			setLoading(false);
		}
		catch (err) {
			if (err instanceof AuthenticationError) {
				setError(err.message);
			} else if (err instanceof InternalServerError) {
				setError(err.message);
			} else {
				setError('Erro inesperado. Tente novamente.');
			}
		}
		finally {
			setLoading(false);
		}
	}

	return {
		form,
		handleOnChange,
		error,
		loading,
		signIn: login
	}
}

export default useSignIn;