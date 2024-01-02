export interface ResponseGoogle {
  sub: string;
  picture: string;
  name: string;
}

export interface Iuser {
  image: string;
  userName: string;
  _id: string;
  _createdAt?: Date;
  _updatedAt?: Date;
}

// destination
// :
// "https://github.com/eddaoudi-mohamed"
// image
// :
// {asset: {…}}
// postedBy
// :
// {_id: '101158030602996295513', userName: 'Mohamed Daoudi', image: 'https://lh3.googleusercontent.com/a/ACg8ocJstWjVmC7knwy6XnXv3suFIMD8OK8MvFTv2Ko_T1jk=s96-c'}
// save
// :
// null
// _id
// :

export interface Isave {
  _key: string;
  postedBy: Iuser;
}
export interface IPins {
  destination: string;
  image: {
    asset: {
      url: string;
    };
  };
  postedBy: Iuser;
  _id: string;
  save: Isave[];
  category?: string;
  comments?: Icommnet[];
  title?: string;
  about?: string;
}

interface Icommnet {
  postedBy: Iuser;
  comment: string;
}

export interface Inewpin {
  title: string;
  about: string;
  destination: string;
  category: string;
  imageAssets?: any;
}

export interface Iinput {
  name: keyof Inewpin;
  type: string;
  placeholder: string;
  id: string;
}
