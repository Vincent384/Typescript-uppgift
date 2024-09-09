type ThreadCategory = "THREAD" | "QNA";

type User = {
  userId: number;
}

interface Thread {
	id: string;
	category: ThreadCategory;
	title: string;
	description: string;
	creationDate: Date;
	creator?: User;
	comments?: ThreadComment[];
	locked?:boolean
}

type QNAThread =  Thread & { //Type extension
	category: "QNA";
	isAnswered: boolean;
	commentAnswerId?: number;
}

type ThreadComment = {
	id: User;
	thread: Thread;
	content: string;
	creator: "GUEST";
}

type SubmitForm = {
	title:string,
	description:string
}

type ErrorForm = SubmitForm & {
	selection:string
}

type LoginForm = {
	email:string,
	password:string
}

type RegisterForm = {
	userName:string,
	email:string,
	password:string
}

type CreateNewUser = RegisterForm &{
	userId:string,
	userName:string,
	email:string,
	password:string
}
