import PropTypes from "prop-types";
const SidebarIcon = ({ Icon, label, onClick }) => {
    return (
        <li onClick={onClick}>
            <a className="flex items-center p-2 cursor-pointer text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <Icon className="h-6 w-6 text-gray-300" />
                <span className="ms-3">{label}</span>
            </a>
        </li>
    );
};

SidebarIcon.propTypes = {
    Icon: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default SidebarIcon;
