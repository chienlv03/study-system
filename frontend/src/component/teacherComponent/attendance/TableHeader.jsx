import PropTypes from 'prop-types';

const TableHeader = ({ attendanceTimes }) => (
    <thead className="text-xs text-gray-700 text-left uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr className='h-10'>
            <th scope="col" className="px- pl-5">STT</th>
            <th scope="col whitespace-nowrap" className="">Họ Và Tên</th>
            <th scope="col" className="">Ngày sinh</th>
            <th scope="col" className="">Email</th>
            <th scope="col" className="">Số lần vắng</th>
            {attendanceTimes.map((time, index) => (
                <th key={index} scope="col" className="w-6">{time}</th>
            ))}
        </tr>
    </thead>
);

TableHeader.propTypes = {
    attendanceTimes: PropTypes.array.isRequired,
};

export default TableHeader;
