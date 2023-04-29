import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Navbar,
  Typography,
  Button,
  Avatar,
  Popover,
  PopoverHandler,
  PopoverContent,
} from '@material-tailwind/react';
import { PowerIcon } from '@heroicons/react/24/outline';

import { useAuthStore } from '../store';
import { getUserList } from '../utlis/getUserList';
import { useQuery } from 'react-query';

function CurrentUserProfile() {
  const signedInUser = useAuthStore((state) => state.signedInUser);

  return (
    <div
      key={signedInUser?.id}
      className="flex flex-col gap-3 capitalize items-center mb-5"
    >
      <img
        src={signedInUser?.profilepicture}
        alt={signedInUser?.name}
        className="h-36 w-36 rounded-full object-cover object-center"
      />

      <Typography className=" text-gray-900 m-0 leading-none">
        {signedInUser?.name}
      </Typography>
      <Typography className=" text-gray-700 m-0 leading-none">
        {signedInUser?.username}
      </Typography>
    </div>
  );
}

function OtherUserPorfileList() {
  const {
    isLoading,
    isError,
    data: userList,
  } = useQuery({
    queryKey: ['user list'],
    queryFn: getUserList,
  });

  const signIn = useAuthStore((state) => state.signIn);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const otherUserList = userList?.filter(
    (user) => user.id !== useAuthStore.getState().signedInUser?.id,
  );

  return (
    <div className="max-h-40 overflow-y-scroll">
      {Array.isArray(otherUserList) ? (
        otherUserList?.map((user) => (
          <div key={user.id}>
            <hr className="w-11/12 mx-auto border-blue-gray-100" />
            <Button
              variant="text"
              fullWidth
              key={user.id}
              onClick={() => {
                signIn(user);
              }}
              className="flex gap-3 capitalize items-center  rounded-none "
            >
              <img
                src={user.profilepicture}
                alt={user.name}
                className="h-8 w-8 rounded-full object-cover object-center"
              />

              <Typography color="blue-gray" variant="small">
                {user.username}
              </Typography>
            </Button>
          </div>
        ))
      ) : (
        <div>no other user</div>
      )}
    </div>
  );
}

function ProfileMenu() {
  const signedInUser = useAuthStore((state) => state.signedInUser);
  const navigate = useNavigate();
  const signOut = useAuthStore((state) => state.signOut);
  return (
    <Popover placement="bottom">
      <PopoverHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-3 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="candice wu"
            className="border border-blue-500 p-0.5"
            src={signedInUser?.profilepicture}
          />
          <Typography
            as="span"
            color="blue-gray"
            variant="h5"
            className="font-normal capitalize"
          >
            {signedInUser?.name}
          </Typography>
        </Button>
      </PopoverHandler>
      <PopoverContent className="p-2 w-80 rounded-3xl ">
        <CurrentUserProfile />

        <OtherUserPorfileList />
        <div className="flex justify-center mt-3">
          <Button
            key={'sign-out'}
            onClick={() => {
              signOut();
              navigate('/');
            }}
            color="red"
            variant="gradient"
            className={`flex items-center capitalize justify-center gap-2 rounded-3xl hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10`}
          >
            {React.createElement(PowerIcon, {
              className: `h-4 w-4 text-white`,
              strokeWidth: 2,
            })}
            <Typography
              as="span"
              variant="small"
              className="font-normal"
              color="white"
            >
              {'Sign out'}
            </Typography>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
export function DashboardNavbar() {
  const { pathname } = useLocation();

  const currPage = pathname.split('/')[1] || 'Profile';
  const fixedNavbar = true;
  return (
    <Navbar
      color={fixedNavbar ? 'white' : 'transparent'}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? 'sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5'
          : 'px-0 py-1'
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Typography variant="h2" className="font-normal  text-black text-2xl">
            {currPage}
          </Typography>
        </div>
        <div className="flex items-center">
          <ProfileMenu />
        </div>
      </div>
    </Navbar>
  );
}

export default DashboardNavbar;
