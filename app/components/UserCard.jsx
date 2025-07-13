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
    <div className="flex flex-col md:flex-row w-full mx-auto bg-white text-gray-800 shadow-lg rounded-xl overflow-hidden border border-gray-100">
      {/* Avatar */}
      <div className="flex justify-center items-center md:w-1/3 bg-gray-50 p-8">
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200">
          <Image
            src={data?.image?.startsWith("http") ? data.image : "/avatar.png"}
            alt={`${data.firstName} ${data.lastName}`}
            fill
            sizes="128px"
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Info Section */}
      <div className="md:w-2/3 p-6 space-y-6 overflow-y-auto">
        <div className="pb-4 border-b border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-1">
            {data.firstName} {data.lastName}
          </h2>
          <p className="text-gray-600">{data.company?.title}</p>
          <p className="text-sm text-gray-500">@{data.username}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Personal Info */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900 flex items-center gap-2">
              <FaUser className="text-gray-600" />
              Personal
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <FaVenusMars className="text-gray-400" />
                {data.gender}
              </div>
              <div className="flex items-center gap-2">
                <FaBirthdayCake className="text-gray-400" />
                {data.birthDate} (Age {data.age})
              </div>
              <div className="flex items-center gap-2">
                <FaTint className="text-gray-400" />
                {data.bloodGroup}
              </div>
              <div className="flex items-center gap-2">
                <FaRulerVertical className="text-gray-400" />
                {data.height} cm
              </div>
              <div className="flex items-center gap-2">
                <FaWeight className="text-gray-400" />
                {data.weight} kg
              </div>
              <div className="flex items-center gap-2">
                <FaEye className="text-gray-400" />
                {data.eyeColor}
              </div>
              <div>Hair: {data.hair?.color}, {data.hair?.type}</div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900 flex items-center gap-2">
              <FaPhone className="text-gray-600" />
              Contact
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-gray-400" />
                {data.email}
              </div>
              <div className="flex items-center gap-2">
                <FaPhone className="text-gray-400" />
                {data.phone}
              </div>
              <div>IP: {data.ip}</div>
              <div>MAC: {data.macAddress}</div>
            </div>
          </div>

          {/* Address Info */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900 flex items-center gap-2">
              <FaMapMarkerAlt className="text-gray-600" />
              Address
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div>
                {data.address?.city}, {data.address?.state}
              </div>
              <div>{data.address?.postalCode}</div>
              <div>{data.address?.country}</div>
              <div>Lat: {data.address?.coordinates?.lat}</div>
              <div>Lng: {data.address?.coordinates?.lng}</div>
            </div>
          </div>

          {/* Company Info */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900 flex items-center gap-2">
              <FaBuilding className="text-gray-600" />
              Company
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div><strong>Name:</strong> {data.company?.name}</div>
              <div><strong>Dept:</strong> {data.company?.department}</div>
              <div><strong>Title:</strong> {data.company?.title}</div>
            </div>
          </div>

          {/* Bank Info */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900 flex items-center gap-2">
              <FaCreditCard className="text-gray-600" />
              Bank
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div>Card: {data.bank?.cardNumber}</div>
              <div>Expire: {data.bank?.cardExpire}</div>
              <div>Type: {data.bank?.cardType}</div>
              <div>Currency: {data.bank?.currency}</div>
              <div>IBAN: {data.bank?.iban}</div>
            </div>
          </div>

          {/* Education & Crypto */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900 flex items-center gap-2">
              <FaUniversity className="text-gray-600" />
              Education
            </h3>
            <div className="text-sm text-gray-700 mb-4">
              {data.university}
            </div>
            
            <h3 className="font-medium text-gray-900 flex items-center gap-2">
              <FaBitcoin className="text-gray-600" />
              Crypto
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div>Coin: {data.crypto?.coin}</div>
              <div>Network: {data.crypto?.network}</div>
              <div className="break-all">Wallet: {data.crypto?.wallet}</div>
            </div>
          </div>

          {/* Device Info */}
          <div className="md:col-span-2 lg:col-span-3 space-y-3">
            <h3 className="font-medium text-gray-900 flex items-center gap-2">
              <FaLaptop className="text-gray-600" />
              Device Info
            </h3>
            <div className="text-sm text-gray-700 break-all bg-gray-50 p-3 rounded">
              {data.userAgent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;