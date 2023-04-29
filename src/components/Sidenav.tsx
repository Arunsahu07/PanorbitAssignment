import { NavLink } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Button, Typography } from '@material-tailwind/react';
import { UserCircleIcon, BellIcon } from '@heroicons/react/24/solid';

const icon = {
  className: 'w-5 h-5 text-inherit',
};

const routes = [
  {
    icon: <UserCircleIcon {...icon} />,

    name: 'Profile',
    path: '/',
  },
  {
    icon: <UserCircleIcon {...icon} />,
    name: 'posts',
    path: '/posts',
  },

  {
    icon: <BellIcon {...icon} />,
    name: 'gallery',
    path: '/gallery',
  },
  {
    icon: <BellIcon {...icon} />,
    name: 'todos',
    path: '/todos',
  },
];

function Sidenav() {
  return (
    <aside
      className="fixed inset-0 z-50 shadow-inner my-4 ml-4 h-[calc(100vh-32px)] w-64 rounded-3xl 
        grid items-center
        bg-gradient-to-b to-[#6733C8] from-[#3360c8]
        "
    >
      <div className="m-0 ">
        <ul className="mb-3 flex flex-col gap-4 ">
          {routes.map(({ name, path }, index) => (
            <li key={name}>
              <NavLink to={`${path}`}>
                {({ isActive }) => (
                  <Button
                    variant={'text'}
                    color={isActive ? 'white' : 'gray'}
                    className="flex items-center gap-4 p-0 pl-8 rounded-none capitalize "
                    fullWidth
                  >
                    <Typography
                      color="inherit"
                      className="font-medium capitalize text-lg py-2"
                    >
                      {name}
                    </Typography>
                    {isActive && (
                      <div className="  ml-auto  bg-white rounded-s-full inverted-curve">
                        <ChevronRightIcon
                          strokeWidth={3}
                          className="w-8 h-8 text-gray-500 p-2   "
                        />
                      </div>
                    )}
                  </Button>
                )}
              </NavLink>
              {index !== routes.length - 1 && (
                <hr className="mt-3 border-blue-gray-100 w-4/5 mx-auto" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default Sidenav;
