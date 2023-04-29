import { useQuery } from 'react-query';
import { getUserList } from '../utlis/getUserList';
import { useAuthStore } from '../store';
import { Button, Typography } from '@material-tailwind/react';
import bgsvg from '../assets/bgsvg.svg';
const SignIn = () => {
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
  return (
    <div className=" min-h-screen flex items-center justify-center">
      <img src={bgsvg} alt="" className="absolute inset-0 -z-10 " />
      <div
        className="max-w-lg w-full bg-white  rounded-3xl overflow-hidden shadow-xl
      "
      >
        <Typography
          variant="h5"
          className="text-center py-8 font-semibold bg-blue-gray-100/30 text-blue-gray-800 "
        >
          Select an account
        </Typography>

        <div className="  flex flex-col gap-3 max-h-96 overflow-y-scroll">
          {userList?.map((user) => (
            <Button
              fullWidth
              variant="text"
              color="blue-gray"
              key={user.id}
              className=" flex gap-3 capitalize items-center"
              ripple={false}
              onClick={() => {
                signIn(user);
              }}
            >
              <img
                src={user.profilepicture}
                alt={user.name}
                className="h-10 w-10 rounded-full object-cover object-center"
              />

              <Typography color="blue-gray">{user.name}</Typography>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
