import LeafletMap from '../../components/LeafletMap';
import { useAuthStore } from '../../store';
import { Typography } from '@material-tailwind/react';

const InfoCard = ({
  title,
  value,
  isAddress = false,
}: {
  title: string;
  value: string;
  isAddress?: boolean;
}) => {
  return (
    <div
      className={`grid  gap-5 mt-3 justify-center
      ${isAddress ? 'grid-cols-[10ch_4px_2fr]' : 'grid-cols-[1fr_4px_2fr]'}
    `}
    >
      <Typography
        variant="h5"
        className="font-medium  text-right text-gray-800"
      >
        {title}
      </Typography>
      <Typography variant="h5" className="font-semibold  ">
        :
      </Typography>

      <Typography variant="h5" className="font-semibold text-gray-900">
        {value}
      </Typography>
    </div>
  );
};

const Profile = () => {
  const signedInUser = useAuthStore((state) => state.signedInUser);

  return (
    <div className="grid grid-cols-5 gap-3  isolate">
      <div className="col-span-2 border-r border-r-blue-gray-100 px-5">
        <img
          src={signedInUser?.profilepicture}
          alt="avatar"
          className="rounded-full h-56 w-56 object-cover object-center mx-auto"
        />
        <Typography variant="h5" className="text-center text-gray-900 mt-3">
          {signedInUser?.name}
        </Typography>

        <InfoCard title="Username" value={signedInUser?.username ?? ''} />
        <InfoCard title="Email" value={signedInUser?.email ?? ''} />
        <InfoCard title="Phone" value={signedInUser?.phone ?? ''} />
        <InfoCard title="Website" value={signedInUser?.website ?? ''} />
        <hr className="my-2 border-blue-gray-100 w-4/5 mx-auto mt-4" />
        <Typography
          variant="h5"
          className="font-normal text-center text-gray-900 mt-3"
        >
          Company
        </Typography>
        <InfoCard title="Name" value={signedInUser?.company.name ?? ''} />
        <InfoCard
          title="Catch Phrase"
          value={signedInUser?.company.catchPhrase ?? ''}
        />
        <InfoCard title="BS" value={signedInUser?.company.bs ?? ''} />
      </div>
      <div className="col-span-3 px-5">
        <Typography variant="h5" className="font-normal text-gray-800">
          Address
        </Typography>
        <InfoCard
          isAddress={true}
          title="Street"
          value={signedInUser?.address.street ?? ''}
        />
        <InfoCard
          isAddress={true}
          title="Suite"
          value={signedInUser?.address.suite ?? ''}
        />
        <InfoCard
          isAddress={true}
          title="City"
          value={signedInUser?.address.city ?? ''}
        />
        <InfoCard
          isAddress={true}
          title="Zipcode"
          value={signedInUser?.address.zipcode ?? ''}
        />
        <div className="p-5 py-3 h-96 mt-3">
          <LeafletMap
            lat={Number(signedInUser?.address.geo.lat)}
            lng={Number(signedInUser?.address.geo.lng)}
          />
          <div className="flex  gap-1 p-1">
            <Typography
              variant="small"
              className="ml-auto text-gray-800 font-semibold"
            >
              Lat:
            </Typography>
            <Typography variant="small" className=" text-gray-900">
              {signedInUser?.address.geo.lat}
            </Typography>
            <Typography
              variant="small"
              className="  text-gray-800 font-semibold"
            >
              Long:
            </Typography>
            <Typography variant="small" className="  text-gray-900">
              {signedInUser?.address.geo.lng}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
