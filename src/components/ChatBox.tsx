import React, { FormEvent, SetStateAction } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  IconButton,
  CardFooter,
  Input,
} from '@material-tailwind/react';
import { ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline';
import { User, getUserList } from '../utlis/getUserList';
import { useQuery } from 'react-query';
import {
  ChevronDownIcon,
  PaperAirplaneIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import { useAuthStore } from '../store';

const fakeMessages = [
  {
    id: 1,
    message: 'Hello',
    sender: 'user',
  },
  {
    id: 2,
    message: 'Hi',
    sender: 'other',
  },
  {
    id: 3,
    message: 'How are you?',
    sender: 'user',
  },
];

const IndividualChat = (props: {
  selectedChatUser: User;
  setShowIndividualChat: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const { profilepicture, name } = props.selectedChatUser;
  const { setShowIndividualChat } = props;
  const [individualChatOpen, setIndividualChatOpen] = React.useState(false);

  const [messages, setMessages] = React.useState(fakeMessages);
  const [inputMessage, setInputMessage] = React.useState('');
  // ref to  the latest message
  const bottomRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [messages]);

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (inputMessage === '') return;
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        message: inputMessage,
        sender: 'user',
      },
    ]);
    setInputMessage('');
  };

  return (
    <Card
      variant="gradient"
      className={`w-full max-w-[17rem]
        overflow-hidden
        fixed  right-[24rem] z-50
        transition-all duration-200
        ease-in-out
        ${individualChatOpen ? '-bottom-[16rem]' : '-bottom-0'}
        `}
    >
      <CardHeader
        floated={false}
        shadow={false}
        className="m-0  rounded-none bg-[#3360c8] py-3 px-4 pt-4 flex gap-2 items-center"
      >
        <img src={profilepicture} alt={name} className="w-8 h-8 rounded-full" />

        <Typography variant="small" color="white" className="font-normal ">
          {name}
        </Typography>
        <IconButton
          className="ml-auto rounded-full w-5 h-5 bg-transparent shadow-none"
          onClick={() => setIndividualChatOpen((prev) => !prev)}
        >
          <ChevronDownIcon
            className={`text-white w-5 h-5
            transform transition-transform duration-200
            ${individualChatOpen ? 'rotate-180' : ''}
            `}
          />
        </IconButton>
        <IconButton
          className=" rounded-full w-5 h-5 bg-transparent shadow-none"
          onClick={() => setShowIndividualChat(false)}
        >
          <XMarkIcon
            className={`text-white w-5 h-5
            transform transition-transform duration-200
            ${individualChatOpen ? 'rotate-180' : ''}
            `}
          />
        </IconButton>
      </CardHeader>
      <CardBody className="py-1 px-2 h-[13rem] overflow-y-scroll ">
        <Typography
          variant="small"
          color="gray"
          className={`text-xs font-normal text-center`}
        >
          12:00 PM
        </Typography>
        <div className="flex flex-col gap-2 p-2 text-xs">
          {/* messges */}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex flex-col gap-1 ${
                message.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`p-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-blue-gray-100 text-blue-gray-900 rounded-bl-none'
                }`}
              >
                {message.message}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </CardBody>
      <CardFooter className="p-0">
        <div className="relative flex w-full max-w-[24rem]">
          <form onSubmit={handleSendMessage}>
            <Input
              type="text"
              label="Enter message"
              name="message"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="pr-14 rounded-none border-none border-t border-t-blue-gray-200  "
              containerProps={{
                className: 'min-w-0 rounded-none ',
              }}
            />
            <IconButton
              type="submit"
              size="sm"
              className="!absolute right-1 top-1  rounded bg-transparent shadow-none hover:shadow-none"
            >
              <PaperAirplaneIcon className="w-5 h-5 text-[#3360c8]" />
            </IconButton>
          </form>
        </div>
      </CardFooter>
    </Card>
  );
};

const ChatBox = () => {
  const [chatListOpen, setChatListOpen] = React.useState(false);

  const [selectedChatUser, setSelectedChatUser] = React.useState<User | null>(
    null,
  );
  const [showIndividualChat, setShowIndividualChat] = React.useState(false);

  const {
    isLoading,
    isError,
    data: userList,
  } = useQuery({
    queryKey: ['user list'],
    queryFn: getUserList,
  });

  const signedInUser = useAuthStore((state) => state.signedInUser);

  // closing the open chats on switching user
  React.useEffect(() => {
    setChatListOpen(false);
    setShowIndividualChat(false);
  }, [signedInUser]);

  // filtering out the signed in user from the user list
  const otherUserList =
    userList?.filter((user) => user.id !== signedInUser?.id) ?? [];

  const handleChatUserSelect = (user: User) => {
    setSelectedChatUser(user);
    setShowIndividualChat(true);
  };

  return (
    <React.Fragment>
      <Card
        variant="gradient"
        className={`w-full max-w-[17rem]
        overflow-hidden
        fixed  right-14 z-50
        transition-all duration-200
        ease-in-out
        ${chatListOpen ? '-bottom-0' : '-bottom-[18.5rem]'}
        `}
      >
        <CardHeader
          floated={false}
          shadow={false}
          className="m-0 bg-[#3360c8]  rounded-none border-b border-white/10 py-3 px-4 flex gap-1 items-center"
        >
          <ChatBubbleBottomCenterIcon className="text-white w-7 h-7" />
          <Typography variant="h6" color="white" className="font-normal ">
            Chats
          </Typography>
          <IconButton
            className="ml-auto rounded-full w-6 h-6 bg-transparent shadow-none"
            onClick={() => setChatListOpen((prev) => !prev)}
          >
            <ChevronDownIcon
              className={`text-white w-5 h-5
            transform transition-transform duration-200
            ${chatListOpen ? '' : 'rotate-180'}
            `}
            />
          </IconButton>
        </CardHeader>
        <CardBody className="p-0 h-[18.3rem] overflow-y-scroll ">
          {
            // is loading
            isLoading ? (
              <div>Loading...</div>
            ) : // is error
            isError ? (
              <div>Error</div>
            ) : // is success
            otherUserList?.length === 0 ? (
              <div>No other user </div>
            ) : (
              // is success and has users
              <div className="flex flex-col gap-2 p-2">
                {otherUserList?.map((user) => (
                  <Button
                    key={user.id}
                    color="light-blue"
                    fullWidth
                    variant="text"
                    className="flex items-center gap-2 p-1 px-2 m-0 rounded-none"
                    onClick={() => handleChatUserSelect(user)}
                  >
                    <img
                      src={user.profilepicture}
                      alt={user.name}
                      className="h-8 w-8 rounded-full object-cover object-center"
                    />
                    <Typography
                      className="text-gray-900 m-0 leading-none capitalize"
                      variant="small"
                    >
                      {user.name}
                    </Typography>
                    <div className="grid items-center ml-auto">
                      <div className="w-2 h-2 bg-blue-gray-200 rounded-full"></div>
                    </div>
                  </Button>
                ))}
              </div>
            )
          }
        </CardBody>
      </Card>
      {showIndividualChat && selectedChatUser && (
        <IndividualChat
          selectedChatUser={selectedChatUser}
          setShowIndividualChat={setShowIndividualChat}
        />
      )}
    </React.Fragment>
  );
};

export default ChatBox;
