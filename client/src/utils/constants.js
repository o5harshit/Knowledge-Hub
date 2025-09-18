export const HOST = import.meta.env.VITE_SERVER_URL

// Auth Routes - 

export const AUTH_ROUTES = `${HOST}/api/auth`
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`
export const GET_USER_INFO = `${AUTH_ROUTES}/user-info`
export const LOGOUT_USER  = `${AUTH_ROUTES}/logout`


// Document Routes - 

export const DOCUMENT_ROUTES = `${HOST}/api/doc`
export const ADD_DOCUMENT = `${DOCUMENT_ROUTES}/AddDocument`
export const GET_USER_DOCUMENT = `${DOCUMENT_ROUTES}/GetUserdoc`
export const GET_ALL_DOC = `${DOCUMENT_ROUTES}/GetDocument`
export const  DELETE_DOCUMENT =  `${DOCUMENT_ROUTES}/DeleteDocument`
export const UPDATE_DOCUMENT = `${DOCUMENT_ROUTES}/UpdateDocument`


// Gemini Routes - 

export const GEMINI_ROUTES = `${HOST}/api/gemini`
export const GEMINI_SUMMARY = `${GEMINI_ROUTES}/summarize`
export const GEMINI_TAGS = `${GEMINI_ROUTES}/tags`
export const GEMINI_ANS = `${GEMINI_ROUTES}/generateAns`