import Proptypes from 'prop-types';

const SearchResultList = ({ isTyping, filteredUsers, handleAddUser }) => (
    <div className="absolute w-1/4 right-7 rounded-lg overflow-hidden z-50 text-sm text-left rtl:text-right dark:text-gray-900" style={{ top: '82px' }}>
        <table className="w-full">
            <tbody>
                {filteredUsers.map(user => (
                    <tr key={user.id} className="bg-white border-b dark:border-gray-800">
                        <th className="px-6 py-3 font-bold whitespace-nowrap dark:text-black">{user.email}</th>
                        <th onClick={() => handleAddUser(user.id)} className="font-medium text-gray-900 whitespace-nowrap dark:text-white cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="12.142A2" className="w-6 h-6">
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                            </svg>
                        </th>
                    </tr>
                ))}
            </tbody>
        </table>
        {isTyping && filteredUsers.length === 0 && <p className='text-white ml-2 mt-2'>Không tìm thấy kết quả</p>}
    </div>
);

SearchResultList.propTypes = {
    isTyping: Proptypes.bool.isRequired,
    filteredUsers: Proptypes.array.isRequired,
    handleAddUser: Proptypes.func.isRequired,
};

export default SearchResultList;
