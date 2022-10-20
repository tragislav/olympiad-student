export const _transformSpecialty = (item) => {
  return {
    value: item.id,
    label: item.name,
    id: item.id,
    name: item.name,
    code: item.code,
    subjectName: item.subjectName,
    seatsNumber: item.seatsNumber,
  };
};

export const _transformEducationEstablishments = (item) => {
  return {
    id: item.id,
    name: item.name,
    value: item.id,
    label: item.name,
  };
};

const _transformEducation = (item) => {
  return {
    name: item.name,
    id: item.id,
  };
};

const _transformRepresentative = (item) => {
  return {
    id: item.id,
    passport: _transformPassport(item.passport),
    person: _transformPerson(item.person),
  };
};

const _transformAddress = (item) => {
  return {
    id: item.id,
    address: {
      district: item.address.district,
      locality: item.address.locality,
      region: item.address.region,
    },
    flat: item.flat,
    frame: item.frame,
    house: item.house,
    street: item.street,
  };
};

const _transformPassport = (item) => {
  return {
    id: item.id,
    identificationNumber: item.identificationNumber,
    number: item.number,
    series: item.series,
  };
};

const _transformPerson = ({
  agreed = true,
  name,
  patronymic,
  phoneNumber,
  surname,
  id,
}) => {
  return {
    id,
    agreed,
    name,
    patronymic,
    phoneNumber,
    surname,
  };
};

export const _transformEnrollee = (item) => {
  return {
    birthday: item.birthday,
    educationalEstablishment: _transformEducation(
      item.educationalEstablishment
    ),
    legalRepresentative: _transformRepresentative(item.legalRepresentative),
    mainAddress: _transformAddress(item.mainAddress),
    passport: _transformPassport(item.passport),
    person: _transformPerson(item.person),
    specialities: item.specialities.map(_transformSpecialty),
    user: item.user,
    id: item.id,
  };
};
