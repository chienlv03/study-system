import PropTypes from 'prop-types';
const DropdownMenu = ({ isOpen, toggleDropdown, menuItems }) => {
    return (
        <li>
            <button
                onClick={toggleDropdown}
                className="flex w-full justify-between p-2 items-center cursor-pointer rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
                <div className="flex">
                    <svg
                        className="h-6 w-6 text-gray-300"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                        <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                        <line x1="3" y1="6" x2="3" y2="19" />
                        <line x1="12" y1="6" x2="12" y2="19" />
                        <line x1="21" y1="6" x2="21" y2="19" />
                    </svg>
                    <span className="ms-3">Assignment</span>
                </div>
                <div className="mt-1">
                    {isOpen ? (
                        <svg
                            className="h-5 w-5 text-gray-200"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <path d="M18 15l-6-6l-6 6h12" />
                        </svg>
                    ) : (
                        <svg
                            className="h-5 w-5 text-gray-200"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <path d="M18 15l-6-6l-6 6h12" transform="rotate(180 12 12)" />
                        </svg>
                    )}
                </div>
            </button>
            {isOpen && (
                <ul className="py-2 space-y-2 cursor-pointer">
                    {menuItems.map(
                        (item, index) =>
                            (item.condition === undefined || item.condition) && (
                                <li key={index} onClick={item.onClick}>
                                    <a
                                        className="flex items-center w-full p-1 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            )
                    )}
                </ul>
            )}
        </li>
    );
};

DropdownMenu.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleDropdown: PropTypes.func.isRequired,
    menuItems: PropTypes.array.isRequired,
};

export default DropdownMenu;
