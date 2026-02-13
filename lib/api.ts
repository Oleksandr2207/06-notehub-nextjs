import { Note, NoteTag } from '@/types/note';
import axios from 'axios';

const BASE_URL = 'https://notehub-public.goit.study/api';
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN

// if (!TOKEN) {
//   throw new Error('NOTEHUB TOKEN missing');
// }

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9zcG9ub21hcmVua28wOUBnbWFpbC5jb20iLCJpYXQiOjE3NzAwNDUzODJ9.u1iRGj5YlnyVdJjWF1MquJLfqnEdaqBz3087h_HhJSY`;



export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

export const fetchNotes = async ({
  page,
  perPage,
  search = '',
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const { data } = await axios.get<FetchNotesResponse>('/notes', {
    params: { page, perPage, search },
  });
  return data;
};

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

export const createNote = async (
  payload: CreateNotePayload
): Promise<Note> => {
  const { data } = await axios.post<Note>('/notes', payload);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await axios.delete<Note>(`/notes/${id}`);
  return data;
};



export async function fetchNoteById(id: string) {
  const { data } = await axios.get(`/notes/${id}`);
  return data;
}