import PropTypes from 'prop-types';

const SearchBar = ({ searchItem, handleInputChange }) => (
  <div className='absolute w-1/4 right-7 top-8'>
    <input
      type="search"
      id="default-search"
      className="block w-full py-3 ps-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
      placeholder="Type to search"
      required
      autoComplete='off'
      value={searchItem}
      onChange={handleInputChange}
    />
  </div>
)
SearchBar.propTypes = {
  searchItem: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default SearchBar;

