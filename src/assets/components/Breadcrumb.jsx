import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BiHomeAlt2 } from "react-icons/bi";

const Breadcrumb = () => {
    const location = useLocation(); 
    const pathnames = location.pathname.split('/').filter((x) => x);

    const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
    //^Code from ChatGPT

    // Function to check if a segment is likely an ID / code from Claude AI
    const isId = (segment) => {
        /^\d+$/.test(segment) || 
           /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(segment) ||
           /@/.test(segment);
    };

    // Function to get display name for breadcrumb  / code from Claude AI
    const getDisplayName = (segment, index) => {
        // If it's an ID, use the previous segment + "Details"
        if (isId(segment)) {
            const previousSegment = pathnames[index - 1];
            if (previousSegment) {
                return `${capitalizeFirstLetter(previousSegment.replace(/-/g, ' '))} Details`;
            }
            return 'Details';
        }
        
        // Route mappings for better display names  / code from Claude AI
        const routeMap = {
            'events': 'Events',
            'venues': 'Venues',
            'orders': 'Orders',
            'profile': 'Profile',
            'AddEvent': 'Add Event',
            'AddVenue': 'Add Venue'
        };
        
        return routeMap[segment] || capitalizeFirstLetter(segment.replace(/-/g, ' '));
    };

    const currentPageTitle = pathnames.length > 0 
        ? getDisplayName(pathnames[pathnames.length - 1], pathnames.length - 1)
        : 'Dashboard';
        
        // ^Had help from Claude AI with getting a variable for the current page so I could use it in a h4. 
    return (
        <section>
            <div className="breadcrumb-container">
                <ul className='breadcrumb'>
                    <li ><Link to='/dashboard'>
                      <p>Dashboard</p>
                    </Link></li>
                    {
                        pathnames.map((value, index) => {
                            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                            

                            return (
                                <React.Fragment key={to}>

                                <li className="breadcrumb-separator">/</li>
                                <li className='breadcrumb-link' key={to}>
                                    { index === pathnames.length -1
                                        ? (<span className='active'>{capitalizeFirstLetter(value.replace(/-/g, ' '))}</span>)
                                        : (<Link to={to} > ` ${capitalizeFirstLetter(value.replace(/-/g, ' '))}`</Link>)} 
                                </li>
                                </React.Fragment>
                            );
                        })
                    }
                </ul>
            </div>
            <h4 className="current-page-title">{currentPageTitle}</h4>
        </section>
    );
};
    

export default Breadcrumb