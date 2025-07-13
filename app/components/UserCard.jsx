import Image from "next/image";
import React from "react";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUniversity,
  FaCreditCard,
  FaBuilding,
  FaBirthdayCake,
  FaVenusMars,
  FaTint,
  FaEye,
  FaWeight,
  FaRulerVertical,
  FaBitcoin,
  FaLaptop,
} from "react-icons/fa";

const UserCard = ({ data }) => {
  if (!data) return null;

  return (
    <div className="flex flex-col md:flex-row w-full mx-auto bg-white text-gray-800 shadow-xl rounded-2xl overflow-hidden border border-gray-200">
      {/* Avatar */}
      <div className="flex justify-center items-center md:w-1/3 bg-gray-100 p-6">
        <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-gray-300">
          <Image
            src={data?.image?.startsWith("http") ? data.image : "/avatar.png"}
            alt={`${data.firstName} ${data.lastName}`}
            fill
            sizes="160px"
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Info Section */}
      <div className="md:w-2/3 p-6 space-y-4 text-sm overflow-y-auto">
        <div>
          <h2 className="text-2xl font-bold mb-1">
            {data.firstName} {data.lastName}
          </h2>
          <p className="text-sm text-gray-500">{data.company?.title}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Personal Info */}
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <FaUser /> Personal
            </h3>
            <p>
              <strong>Username:</strong> {data.username}
            </p>
            <p>
              <FaVenusMars className="inline mr-1" /> {data.gender}
            </p>
            <p>
              <FaBirthdayCake className="inline mr-1" /> {data.birthDate} (Age{" "}
              {data.age})
            </p>
            <p>
              <FaTint className="inline mr-1" /> Blood Group: {data.bloodGroup}
            </p>
            <p>
              <FaRulerVertical className="inline mr-1" /> {data.height} cm
            </p>
            <p>
              <FaWeight className="inline mr-1" /> {data.weight} kg
            </p>
            <p>
              <FaEye className="inline mr-1" /> Eye Color: {data.eyeColor}
            </p>
            <p>
              Hair: {data.hair?.color}, {data.hair?.type}
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <FaPhone /> Contact
            </h3>
            <p>
              <FaEnvelope className="inline mr-1" /> {data.email}
            </p>
            <p>
              <FaPhone className="inline mr-1" /> {data.phone}
            </p>
            <p>IP: {data.ip}</p>
            <p>MAC: {data.macAddress}</p>
          </div>

          {/* Address Info */}
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <FaMapMarkerAlt /> Address
            </h3>
            <p>
              {data.address?.city}, {data.address?.state} -{" "}
              {data.address?.postalCode}
            </p>
            <p>{data.address?.country}</p>
            <p>Lat: {data.address?.coordinates?.lat}</p>
            <p>Lng: {data.address?.coordinates?.lng}</p>
          </div>

          {/* Company Info */}
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <FaBuilding /> Company
            </h3>
            <p>
              <strong>Name:</strong> {data.company?.name}
            </p>
            <p>
              <strong>Dept:</strong> {data.company?.department}
            </p>
            <p>
              <strong>Title:</strong> {data.company?.title}
            </p>
          </div>

          {/* Bank Info */}
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <FaCreditCard /> Bank
            </h3>
            <p>Card: {data.bank?.cardNumber}</p>
            <p>Expire: {data.bank?.cardExpire}</p>
            <p>Type: {data.bank?.cardType}</p>
            <p>Currency: {data.bank?.currency}</p>
            <p>IBAN: {data.bank?.iban}</p>
          </div>

          {/* Education & Crypto */}
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <FaUniversity /> Education
            </h3>
            <p>{data.university}</p>
            <h3 className="font-semibold mt-4 mb-2 flex items-center gap-2">
              <FaBitcoin /> Crypto
            </h3>
            <p>Coin: {data.crypto?.coin}</p>
            <p>Network: {data.crypto?.network}</p>
            <p className="truncate">Wallet: {data.crypto?.wallet}</p>
          </div>

          {/* Device Info */}
          <div className="md:col-span-2">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <FaLaptop /> Device Info
            </h3>
            <p className="truncate">{data.userAgent}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
