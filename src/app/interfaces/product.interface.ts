export interface ProductInterface {
  id: string;
  data: {
    title:	string;
    category:	string;
    price:	number;
    employee:	string;
    description?:	string;
  };
}
