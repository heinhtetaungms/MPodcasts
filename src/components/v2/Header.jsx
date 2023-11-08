import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MPodcasts_logo from '../../assets/img/MPodcasts_logo.png';


const Header = ({ heading, paragraph, linkName, linkUrl = "#" }) => {
    return (
        <div className="mb-10">
            <div className="flex justify-center">
                <img
                    alt="logo"
                    className="h-[10rem] w-[10rem]"
                    src={MPodcasts_logo}
                />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                {heading}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 mt-5">
                {paragraph} {' '}
                <Link to={linkUrl} className="font-medium text-purple-600 hover:text-purple-500">
                    {linkName}
                </Link>
            </p>
        </div>
    );
}

Header.propTypes = {
    heading: PropTypes.string.isRequired,
    paragraph: PropTypes.string.isRequired,
    linkName: PropTypes.string.isRequired,
    linkUrl: PropTypes.string,
};

export default Header;
