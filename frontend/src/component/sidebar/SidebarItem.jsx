import PropTypes from 'prop-types';
// import { UserIcon, CheckIcon } from '@heroicons/react/outline'; 
const SidebarItem = ({ icon, label, onClick }) => {
    return (
        <li onClick={onClick}>
            <a
                className="flex items-center p-2 cursor-pointer text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
                {icon}
                <span className="ms-3">{label}</span>
            </a>
        </li>
    );
};

SidebarItem.propTypes = {
    icon: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default SidebarItem;
