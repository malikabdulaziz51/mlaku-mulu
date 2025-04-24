import { UserRole } from '../enums/user-role.enum';

export interface UserProps {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  id?: number;
  touristId?: number;
}

export class User {
  private _id: number;
  private _name: string;
  private _email: string;
  private _password: string;
  private _role: string;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _isDeleted: boolean;
  private _touristId: number;
  constructor(props: UserProps) {
    this._id = props.id || 0;
    this._name = props.name;
    this._email = props.email;
    this._role = props.role;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
    this._isDeleted = props.isDeleted;
    this._touristId = props.touristId || 0;
  }

  public getId(): number {
    return this._id;
  }

  public getName(): string {
    return this._name;
  }

  public getEmail(): string {
    return this._email;
  }

  public getPassword(): string {
    return this._password;
  }

  public getRole(): string {
    return this._role;
  }

  public getTouristId(): number {
    return this._touristId;
  }

  public getCreatedAt(): Date {
    return this._createdAt;
  }

  public getUpdatedAt(): Date {
    return this._updatedAt;
  }

  public getIsDeleted(): boolean {
    return this._isDeleted;
  }

  public setName(name: string): void {
    this._name = name;
  }

  public setEmail(email: string): void {
    this._email = email;
  }

  public setPassword(password: string): void {
    this._password = password;
  }

  public setRole(role: string): void {
    this._role = role;
  }

  public setTouristId(touristId: number): void {
    this._touristId = touristId;
  }

  public setCreatedAt(createdAt: Date): void {
    this._createdAt = createdAt;
  }

  public setUpdatedAt(updatedAt: Date): void {
    this._updatedAt = updatedAt;
  }

  public setIsDeleted(isDeleted: boolean): void {
    this._isDeleted = isDeleted;
  }

  public static create(props: UserProps): User {
    return new User(props);
  }
}
