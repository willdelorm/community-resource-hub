import Image from "next/image";

interface Profile {
  name: string;
  pronouns: string;
  position: string;
  description: string;
  photo: string;
}

const PeopleBio = ({ profile }: { profile: Profile }) => {
  const { name, pronouns, position, description, photo } = profile;
  return (
    <div className="flex flex-col mb-12 p-2 gap-6 md:flex-row ">
      <Image
        src={photo}
        width={300}
        height={300}
        alt="profile photo from unsplash"
        className="w-full sm:w-80 md:max-w-xs mx-auto object-cover"
      />
      <div className="px-2 py-5 ">
        <h3 className="font-semibold text-lg">
          {name} <span className="font-normal italic">{pronouns}</span>
        </h3>
        <p className="mb-3">{position}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default PeopleBio;
