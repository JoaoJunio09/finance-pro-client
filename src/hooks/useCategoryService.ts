import { useMemo } from "react";
import { useAuthContext } from "../context/AuthContext";
import CategoryService from "../services/CategoryService";

function useCategoryService() {
	const { auth } = useAuthContext();

	const categoryService = useMemo(
		() => new CategoryService(auth?.accessToken ?? ''),
		[auth?.accessToken]
	);

	return categoryService;
}

export default useCategoryService;