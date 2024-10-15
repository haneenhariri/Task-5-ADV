import './Search.css';

interface SearchProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  searchIcon: string
}
export default function Search({ setSearch , searchIcon} : SearchProps) {
  return (
    <div className='search'>
      <input 
        className='search-input' 
        onChange={(e) => setSearch(e.target.value)} 
        placeholder='Search product by name' 
        type="text" 
      />
      <img src={searchIcon} alt="search icon" />
    </div>
  );
}
