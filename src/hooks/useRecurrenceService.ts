import { useMemo } from "react";
import { useAuthContext } from "../context/AuthContext";
import RecurrenceService from "../services/RecurrenceService";

function useRecurrenceService() {
	const { auth } = useAuthContext();

	const recurrenceService = useMemo(
		() => new RecurrenceService(auth?.accessToken ?? ''),
		[auth?.accessToken]
	);

	return recurrenceService;
}

export default useRecurrenceService;