'use client';
 
import { HiOutlineSearch } from "react-icons/hi";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { TextInput, FloatingLabel } from "flowbite-react";
 
export default function Search({ label, helperText }: { label: string, helperText?: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    // const params = new URLSearchParams(searchParams);
    const params = new URLSearchParams();
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }
 
  return (
    <FloatingLabel variant="outlined" label={label} defaultValue={searchParams.get('query')?.toString()} helperText={helperText}
        onChange={(e) => {
        handleSearch(e.target.value);
    }} />
  );
}