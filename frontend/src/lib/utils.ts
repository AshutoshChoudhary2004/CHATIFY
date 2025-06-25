import { useChatStore } from "@/stores/useChatStore";
import { User } from "@/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const sortUsersByOnlineStatus = (firstUser : User, secondUser : User) => {
	const onlineUsers = useChatStore.getState().onlineUsers;
	const firstUserIsOnline = onlineUsers.has(firstUser.clerkId);
	const secondUserIsOnline = onlineUsers.has(secondUser.clerkId);
	if (firstUserIsOnline && !secondUserIsOnline) return -1;
	if (!firstUserIsOnline && secondUserIsOnline) return 1;
	return firstUser.fullName.localeCompare(secondUser.fullName);	
}