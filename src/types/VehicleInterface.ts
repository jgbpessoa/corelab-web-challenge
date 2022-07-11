export interface VehicleInterface {
  id?: number;
  user_id?: number;
  user?: {
    id: number;
    name: string;
    email: string;
    create_at: Date;
    updated_at: Date;
  };
  brand: string;
  name: string;
  description: string;
  plate: string;
  year: number | "";
  color: string;
  price: number | "";
  created_at?: Date;
  updated_at?: Date;
}
