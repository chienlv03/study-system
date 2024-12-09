// ToggleIcon.js
import PropTypes from 'prop-types';

const ToggleIcon = ({ isIconActive, toggleIcon }) => (
  <div className="items-center" onClick={toggleIcon}>
    {isIconActive ? (
      <svg
        className="h-6 w-6 text-red-500 cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ) : (
      <svg
        className="h-6 w-6 text-green-400 cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    )}
  </div>
);

ToggleIcon.propTypes = {
  isIconActive: PropTypes.bool.isRequired, // Determines the icon state (active or not)
  toggleIcon: PropTypes.func.isRequired,  // Function to handle toggle action
};

export default ToggleIcon;
