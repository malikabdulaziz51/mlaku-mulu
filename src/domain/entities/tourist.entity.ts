export interface TouristProps {
  id?: number;
  name: string;
  phone: string;
  nationality: string;
  passportNumber: string;
}

export class Tourist {
  private _id: number;
  private _name: string;
  private _phone: string;
  private _nationality: string;
  private _passportNumber: string;
  constructor(props: TouristProps) {
    this._id = props.id || 0;
    this._name = props.name;
    this._phone = props.phone;
    this._nationality = props.nationality;
    this._passportNumber = props.passportNumber;
  }

  public getId(): number {
    return this._id;
  }

  public getName(): string {
    return this._name;
  }
  public getPhone(): string {
    return this._phone;
  }

  public getNationality(): string {
    return this._nationality;
  }

  public getPassportNumber(): string {
    return this._passportNumber;
  }

  public setName(name: string): void {
    this._name = name;
  }

  public setPhone(phone: string): void {
    this._phone = phone;
  }

  public setNationality(nationality: string): void {
    this._nationality = nationality;
  }

  public setPassportNumber(passportNumber: string): void {
    this._passportNumber = passportNumber;
  }

  public static create(props: TouristProps): Tourist {
    return new Tourist(props);
  }
}
