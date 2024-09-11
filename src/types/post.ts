type ThreadCategory = "THREAD" | "QNA";


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
	creator: string;
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

type User = RegisterForm &{
	userId:string,
}

type UserComment = {
    content: string;
    creator: string;
    isAnswer?: boolean
}

type Data = {
    id: string;
    category: string;
    title: string;
    description: string;
    creationDate: string;
    comments: UserComment[];
  };
