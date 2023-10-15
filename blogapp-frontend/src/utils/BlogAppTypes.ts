import { ReactNode } from "react";

export type User=
{
    name?: string,
    _id?: string,
    email?:string
}

export type LoadingContextType=
{
    handleLoading: (value: boolean)=>void,
    loading: boolean
}

export interface DisplayChildrenProps {
    children: ReactNode;
}


export interface SignOutResponse
{
    result: boolean,
    error?: string
}

export interface SignInResponse extends SignOutResponse
{
    token?:string,
    userId?: string,
    message?: string
}

export interface SignInReqBody
{
    email: string,
    password: string
}

export interface BlogHeaderType
{
    title: string,
    createdAt: Date,
    updatedAt: Date,
    userId: User | string,
    imageUrl: string,
    _id: string
}


export interface Blog extends BlogHeaderType
{
    paragraphs: string[],
}


export interface AllBlogsResponse
{
    result: boolean,
    blogs?: Blog[],
    message?: string
}


export interface AllUserBlogsResponse extends SignOutResponse
{
    blogs?: BlogHeaderType[],
    message?: string
}

export type BlogViewType=
{
    blog: BlogHeaderType | Blog,
    self: boolean
}

export type ContentEditorPropType=
{
    paragraphs: string[],
    handleParagraphChange: (index:number, value:string) => void,
    handleKeyDown:  (e: React.KeyboardEvent, index: number) => void,
    textareaRefs: React.MutableRefObject<Map<number, HTMLTextAreaElement | null>>
}

export interface UploadImageResponse
{
    result: boolean,
    message?: string,
    imageUrl?: string
}

