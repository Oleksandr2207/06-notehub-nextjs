'use client';

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import NoteForm from "@/components/NoteForm/NoteForm";
import Modal from "@/components/Modal/Modal";
import css from "./App.module.css"

const PER_PAGE = 12;

export default function NotesClient() {
  const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const debouncedSearch = useDebouncedCallback((value: string) => {
      setSearch(value);
      setPage(1);
    }, 500);
  
    const { data, isPending, isError } = useQuery({
      queryKey: ['notes', page, search],
      queryFn: () => fetchNotes({ page, perPage: PER_PAGE, search }),
      placeholderData: (prev) => prev, 
    });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
  <SearchBox onSearch={(value) => debouncedSearch(value)} />
  {data && data.totalPages > 1 && (
    <Pagination
  pageCount={data.totalPages}
  currentPage={page}   
  onPageChange={setPage}
/>
  )}
  <button className={css.button} onClick={() => setIsModalOpen(true)}>
    Create note +
  </button>
</header>

      {isPending && <p>Loading...</p>}
      {isError && <p>Error loading notes</p>}

      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onSuccess={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
